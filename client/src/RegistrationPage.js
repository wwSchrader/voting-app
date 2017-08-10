import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitButtonPressed: false
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    onFormSubmit(e) {
        e.preventDefault();

        this.setState({submitButtonPressed: true});

        if (this.state.email.length !== 0 && this.state.password.length !==0) {
            fetch('/api/auth/register', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => this.props.history.push("/login"));
            }
    }

    validateEmail() {
        if (this.state.submitButtonPressed) {
            if (this.state.email.length === 0) {
                return 'error';
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    validatePassword() {
        if (this.state.submitButtonPressed) {
            if (this.state.password.length === 0) {
                return 'error';
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    renderHelpBock(validationStatus) {
        if (validationStatus === 'error') {
            return (<HelpBlock>Can't Be Empty!</HelpBlock>);
        }
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                <FormGroup controlId="formEmail" validationState={this.validateEmail()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" onChange={this.onEmailChange} value={this.state.email}/>
                        {this.renderHelpBock(this.validateEmail())}
                         <FormControl.Feedback />
                    </Col>

                </FormGroup>
                <FormGroup controlId="formPassword" validationState={this.validatePassword()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password}/>
                        {this.renderHelpBock(this.validateEmail())}
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" type="submit">
                            Sign up
                        </Button>
                    </Col>
                </FormGroup>

            </Form>
        );
    }

}

export default RegistrationPage;