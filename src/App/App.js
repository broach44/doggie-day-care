import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import Navbar from '../components/Navbar/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  };

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

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Navbar authed={authed} />
        {
          (!authed) ? <Auth /> : <Home setDogView={this.setDogView} />
        }
    </div>
    );
  }
}

export default App;
