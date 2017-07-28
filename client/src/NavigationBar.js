import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends Component {
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavigationBar;