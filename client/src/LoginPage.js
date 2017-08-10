import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isLoggedIn, userIdFetchSuccess } from './actions/index';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loginButtonPressed: false,
            loginErrorMessage: null
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
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.setState({loginButtonPressed: true});

        if (this.state.email.length !== 0) {
            if (this.state.password.length !== 0) {
                fetch('/api/auth/login', {
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
                .then(resp => {
                    if(!resp.ok) {
                        resp.json().then(err => {this.setState({loginErrorMessage: err.authError})});
                        return new Error("Authentication Error");
                    }
                    return resp.json();
                })
                .then((response) => {
                    this.props.addUserId(response.userId);
                    return this.props.determineLogIn(response.isLoggedIn);
                })
                .then(() => this.props.history.push("/"))
                .catch(err => {
                    console.log("Authentication error!");
                });
            }
        }
    }

    validateEmail(e) {
        if (this.state.loginButtonPressed) {
            if (this.state.email.length === 0) {
                return 'error';
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    validatePassword(e) {
        if (this.state.loginButtonPressed) {
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
        let errorMessage = null;
        if (this.state.loginErrorMessage) {
            errorMessage =
                <Alert bsStyle="danger">
                    {this.state.loginErrorMessage}
                </Alert>;
        }

        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                {errorMessage}
                <FormGroup controlId="formEmail" validationState={this.validateEmail()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" onChange={this.onEmailChange} value={this.state.email} />
                    </Col>
                    {this.renderHelpBock(this.validateEmail())}
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="formPassword"  validationState={this.validatePassword()}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password}/>
                    </Col>
                    {this.renderHelpBock(this.validatePassword())}
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button bsStyle="primary" type="submit">
                            Sign in
                        </Button>
                        <Button onClick={() => this.props.history.push("/register")}>
                            Register
                        </Button>
                    </Col>
                </FormGroup>

            </Form>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        determineLogIn: (bool) => dispatch(isLoggedIn(bool)),
        addUserId: (userId) => dispatch(userIdFetchSuccess(userId))
    };
};

export default connect(null, mapDispatchToProps) (LoginPage);