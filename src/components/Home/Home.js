import React from 'react';

import firebase from 'firebase/app';

import firebaseConnection from '../../helpers/data/connection';
import Auth from '../Auth/Auth';
import Navbar from '../Navbar/Navbar';
import DogPen from '../DogPen/DogPen';
import StaffRoom from '../StaffRoom/StaffRoom';
import WalkSchedule from '../WalkSchedule/WalkSchedule';


firebaseConnection.firebaseApp();

class Home extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderView = () => {
    const { authed } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    return (
      <div>
        <DogPen />
        <StaffRoom />
        <WalkSchedule />
    </div>);
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="Home">
        <Navbar authed={authed} />
        {
          this.renderView()
        }
    </div>
    );
  }
}

export default Home;
