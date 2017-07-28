import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
              <NavItem>Home</NavItem>
              <NavItem>My Polls</NavItem>
              <NavItem>New Poll</NavItem>
              <NavItem>Account</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavigationBar;