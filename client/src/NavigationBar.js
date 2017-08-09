import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { isLoggedIn } from './actions/index';

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
        .then((resp) => {
          console.log("response");
          console.log(resp);
          return resp.json()})
        .then((response) => {
            console.log(response.isLoggedIn);
            return this.props.determineLogIn(response.isLoggedIn);
        })
        .then(() => this.props.history.push("/login"));
  }



  render() {
    console.log(this.props.userIsSignedIn);
    let loginNav = null;
    let myPollsNav = null;
    let newPollNav = null;
    let accountNav = null;

    if (this.props.userIsSignedIn) {
      loginNav =
        <LinkContainer to="/"><NavItem onClick={this.onLogOut}>Logout</NavItem></LinkContainer>;
      myPollsNav = <NavItem>My Polls</NavItem>;
      newPollNav = <LinkContainer to="/newpoll"><NavItem>New Poll</NavItem></LinkContainer>;
      accountNav = <NavItem>Account</NavItem>;
    } else {
      loginNav =
        <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>;
    }

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
              {myPollsNav}
              {newPollNav}
              {accountNav}
              {loginNav}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        userIsSignedIn: state.userIsSignedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log(isLoggedIn);
    return {
        determineLogIn: (bool) => dispatch(isLoggedIn(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (NavigationBar);