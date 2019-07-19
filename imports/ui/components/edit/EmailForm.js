import React from 'react';
import {connect} from "react-redux";
import {Form} from 'semantic-ui-react';
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {makeItineraryEmail} from "../../../api/ItineraryEmailTemplate";

class EmailForm extends React.Component {
    initSubjectValue = `Sharing Itinerary`;
    initMessageValue = 'Hi! I would like to share this itinerary with you!';

    state = {
        recipientEmail: '',
        subject: this.initSubjectValue,
        message: this.initMessageValue,
    };

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

    checkEmail = (email) => {
        return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    };

    // Read Nodemailer Documentation for formatting parameters
    emailItinerary = () => {
        // prevent empty values
        if (!this.state.recipientEmail || !this.state.subject || !this.state.message){
            alert(`emailItinerary(): Warning: At least One of the following "recipientEmail, subject, message" is empty`);
            return;
        }

        // prevent invalid email format
        if (!this.checkEmail(this.state.recipientEmail)){
            alert(`emailItinerary(): Warning: Recipient Email is not formatted correctly`);
            return;
        }

        let itinSummary = {
            userEmail: this.props.userEmail,
            userName: this.props.userName,
            date: this.props.date,
            items: this.props.items,
        };

        let from = `${this.props.userName} <${this.props.userEmail}>`;
        let to = this.state.recipientEmail; // TODO: move mailgun api to production so that unauthorized recipient can get email too
        let subject = this.state.subject;
        let html = makeItineraryEmail(itinSummary, this.state.message);

        Meteor.call('emailItinerary', from, to, subject, html, (err, res)=>{
            if (err){
                console.log(err);
                alert('Error in sending the email. Check console.');
                return;
            }
            alert("Your Itinerary has been sent");
        });
    };

    render = () => {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input onChange={this.handleRecipientEmailChange}
                                fluid
                                label='Recipient Email'
                                placeholder='only VanGo Developer Emails Allowed for now'/>
                    <Form.Input onChange={this.handleSubjectChange}
                                fluid
                                label='Subject'
                                defaultValue={this.initSubjectValue}/>
                </Form.Group>
                <Form.TextArea onChange={this.handleMessageChange}
                               label='Message'
                               defaultValue={this.initMessageValue}/>
                <Form.Button onClick={this.handleSubmit}
                             fluid>
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
