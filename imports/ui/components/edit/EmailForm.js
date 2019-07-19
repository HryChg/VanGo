import React from 'react';
import {connect} from "react-redux";
import {Form} from 'semantic-ui-react';

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
        alert('Work in Progress')
    };

    render = () => {
        console.log(this.state);


        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input onChange={this.handleRecipientEmailChange} fluid label='Recipient Email' placeholder='JohnOliver@gmail.com'/>
                    <Form.Input onChange={this.handleSubjectChange} fluid label='Subject' placeholder='Enter your subject here...'/>
                </Form.Group>
                <Form.TextArea onChange={this.handleMessageChange} label='Message' placeholder='Hi! I would like to share this itinerary with you!'/>
                <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
            </Form>
        );
    }
}


const mapStateToProps = (state) => {
    return state;
};


export default connect(mapStateToProps, null)(EmailForm)
