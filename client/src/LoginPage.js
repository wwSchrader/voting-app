import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, Button, ControlLabel } from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
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
        .then((response) => {
            console.log(response);
        });

        e.preventDefault();
    }

    render() {
        return (
            <Form horizontal onSubmit={this.onFormSubmit}>
                <FormGroup controlId="formEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email" onChange={this.onEmailChange}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" onChange={this.onPasswordChange}/>
                    </Col>
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

export default LoginPage;