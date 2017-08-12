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

  //check to see if user had signed in previously
  componentDidMount() {
    fetch("/api/auth/isloggedIn", {method: 'get', credentials: 'include'})
      .then(response => {
        if (response.status !== 200) {
          this.props.determineLogIn(false);
          this.props.clearUserId();
        } else {
          this.props.determineLogIn(true);
          return response.json();
        }
      })
      .then(resp => {
        this.props.userIdSet(resp.userId);
      })
      .catch(ex => {
        console.log("Not signed in");
      });
    }

  onLogOut(e) {
    e.preventDefault();

    fetch('/api/auth/logout', {
            method: 'get',
            credentials: 'include'
        })
        .then((resp) => {
          return resp.json()})
        .then((response) => {
            this.props.clearUserId();
            return this.props.determineLogIn(response.isLoggedIn);
        })
        .then(() => this.props.history.push("/login"));
  }

  render() {
    let loginNav = null;
    let myPollsNav = null;
    let newPollNav = null;

    if (this.props.userIsSignedIn) {
      loginNav =
        <LinkContainer to="/" isActive={() => false}><NavItem onClick={this.onLogOut}>Logout</NavItem></LinkContainer>;
      myPollsNav = <LinkContainer to="/mypolls"><NavItem>My Polls</NavItem></LinkContainer>;
      newPollNav = <LinkContainer to="/newpoll"><NavItem>New Poll</NavItem></LinkContainer>;
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
        clearUserId: () => dispatch(userIdFetchSuccess(null)),
        userIdSet: (userId) => dispatch(userIdFetchSuccess(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (NavigationBar);