var utcDate1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
// str: // expected output: Fri, 02 Feb 1996 03:04:05 GMT

var year = new Date().getFullYear();
var month = new Date().getMonth();
var date = 1;
var hr = 0;
var min = 0;
var sec = 0;

var utcDate = new Date(Date.UTC(year, month, date, hr, min, sec));
console.log(utcDate.toUTCString());

function daysInMonth(mth){
    switch (mth) {
        case 0:
            return 31;
        case 1:
            return 28;
        case 2:
            return 31;
        case 3:
            return 30;
        case 4:
            return 31;
        case 5:
            return 30;
        case 6:
            return 31;
        case 7:
            return 31;
        case 8:
            return 30;
        case 9:
            return 31;
        case 10:
            return 30;
        case 11:
            return 31;
    }
}

//https://coderwall.com/p/rbfl6g/how-to-get-the-correct-unix-timestamp-from-any-date-in-javascript
function getUnix(jsTime) {
    // Copy & Paste this
    Date.prototype.getUnixTime = function () { return this.getTime() / 1000 | 0 };
    if (!Date.now) Date.now = function () { return new Date(); }
    Date.time = function () { return Date.now().getUnixTime(); }

    // Get the current time as Unix time
    var currentUnixTime = Date.time();
    currentUnixTime = Date.now().getUnixTime(); // same as above

    // Parse a date and get it as Unix time
    var parsedUnixTime = new Date('Mon, 25 Dec 1995 13:30:00 GMT').getUnixTime();
    // parsedUnixTime==819898200
}
