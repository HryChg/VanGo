import React from 'react';
import {connect} from "react-redux";
import {Form} from 'semantic-ui-react';
import Mailgun from "../../../api/Mailgun";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

class EmailForm extends React.Component {
    state = {};
    handleRecipientEmailChange = (event, data) => {
        this.setState({recipientEmail: data.value});
    };

    handleSubjectChange = (event, data) => {
        this.setState({subject: data.value});
    };

    handleMessageChange = (event, data) => {
        this.setState({message: data.value});
    };

    handleSubmit = () => {
        this.emailItinerary();
    };


    emailItinerary = () => {
        console.log('sharing this itinerary...');
        let items = this.props.items;
        let userEmail = this.props.userEmail;
        let userName = this.props.userName;
        let date = this.props.date;
        let itinSummary = {
            userEmail,
            userName,
            date,
            items,
            message: this.message
        };
        let mailgun = new Mailgun();
        let from = `${userName} <${userEmail}>`;
        let to = 'vrjgik5@gmail.com'; // TODO Fix This
        let subject = this.state.subject;
        let text = JSON.stringify(itinSummary, null, 2); // space level 2, prettify the json string

        mailgun.setMailOptions(from, to, subject, text);
        console.log(mailgun.mailOptions);
        mailgun.sendMail();
        // TODO FIX Request header field authorization is not allowed by access-control-allow-headers in preflight response
        Meteor.call('sendItinerary');
    };

    render = () => {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input onChange={this.handleRecipientEmailChange} fluid label='Recipient Email' placeholder='JohnOliver@gmail.com'/>
                    <Form.Input onChange={this.handleSubjectChange} fluid label='Subject' placeholder='Enter your subject here...'/>
                </Form.Group>
                <Form.TextArea onChange={this.handleMessageChange} label='Message' placeholder='Hi! I would like to share this itinerary with you!'/>
                <Form.Button onClick={this.handleSubmit} fluid>
                    <Icon name="envelope outline"/>
                    Email
                </Form.Button>
            </Form>
        );
    }
}


const mapStateToProps = (state) => {
    return {};
};


export default connect(mapStateToProps, null)(EmailForm)
