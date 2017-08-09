import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut(e) {
    e.preventDefault();

    fetch('/api/auth/logout', {
            method: 'get',
            credentials: 'include'
        })
        .then((response) => {
            console.log(response);
        });
  }
  render() {
    return (
        <Navbar collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              Voting App
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
              <NavItem>My Polls</NavItem>
              <LinkContainer to="/newpoll"><NavItem>New Poll</NavItem></LinkContainer>
              <NavItem>Account</NavItem>
              <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
              <LinkContainer to="/"><NavItem onClick={this.onLogOut}>Logout</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavigationBar;