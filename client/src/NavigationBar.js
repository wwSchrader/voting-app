import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { isLoggedIn, userIdFetchSuccess } from './actions/index';

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
            this.props.clearUserId();
            return this.props.determineLogIn(response.isLoggedIn);
        })
        .then(() => this.props.history.push("/login"));
  }



  render() {
    let loginNav = null;
    let myPollsNav = null;
    let newPollNav = null;
    let accountNav = null;

    if (this.props.userIsSignedIn) {
      loginNav =
        <LinkContainer to="/" isActive={() => false}><NavItem onClick={this.onLogOut}>Logout</NavItem></LinkContainer>;
      myPollsNav = <LinkContainer to="/mypolls"><NavItem>My Polls</NavItem></LinkContainer>;
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
              <LinkContainer to="/" exact={true}><NavItem>Home</NavItem></LinkContainer>
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
    return {
        determineLogIn: (bool) => dispatch(isLoggedIn(bool)),
        clearUserId: () => dispatch(userIdFetchSuccess(null))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (NavigationBar);