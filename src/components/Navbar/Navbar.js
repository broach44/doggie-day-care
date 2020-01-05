import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Navbar.scss';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    setHomeView: PropTypes.func,
  }

  logMeOUt = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  changeToHomeViewEvent = (e) => {
    e.preventDefault();
    this.props.setHomeView();
  }

  render() {
    const { authed } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
        <h1 className="navbar-brand" onClick={this.changeToHomeViewEvent}>Doggie Daycare</h1>
        {
          (authed) && <button className="btn logout-btn" onClick={this.logMeOUt}>Logout</button>
        }
        </nav>
      </div>
    );
  }
}

export default Navbar;
