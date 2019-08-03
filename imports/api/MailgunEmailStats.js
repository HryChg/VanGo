//Reference: https://www.youtube.com/watch?v=eNxuaTGq4Qk
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const MailgunEmailStats = new Mongo.Collection('MailgunEmailStats');
const MAX_EMAILS_PER_MONTH = 10000;

const getUserEmailStats = async () => {
    let userId = Meteor.userId();
    let stats = await MailgunEmailStats.findOne({userId: userId});
    if (!stats) {
        let stats = {userId: userId, emailCount: 0};
        let temp = await MailgunEmailStats.insert(stats);
        return await MailgunEmailStats.findOne({_id: temp})
    }
    return stats;
};

const getCurrentTotalSent = async () => {
    let arr = await MailgunEmailStats.find().fetch();
    let count = 0;
    for (let stats of arr){
        count += stats.emailCount;
    }
    return count;
};

Meteor.methods({
    getUserEmailStats: getUserEmailStats,

    addToUserEmailStats: async () => {
        let stats = await getUserEmailStats(Meteor.userId());
        stats.emailCount += 1;
        await MailgunEmailStats.update({userId: stats.userId}, stats);
        return true;
    },

    getCurrentTotalSent: getCurrentTotalSent,

    reachMax: async () => {
        let current = await getCurrentTotalSent();
        return current >= MAX_EMAILS_PER_MONTH;
    }
});


export default MailgunEmailStats;
