import React from 'react';

import firebase from 'firebase/app';

import firebaseConnection from '../../helpers/data/connection';
import Auth from '../Auth/Auth';
import Navbar from '../Navbar/Navbar';
import DogPen from '../DogPen/DogPen';
import StaffRoom from '../StaffRoom/StaffRoom';

import dogsData from '../../helpers/data/dogsData';
import employeesData from '../../helpers/data/employeesData';


firebaseConnection.firebaseApp();

class Home extends React.Component {
  state = {
    authed: false,
    dogs: [],
    employees: [],
  }

  getDogs = () => {
    const dogs = dogsData.getAllDogs()
      .then(() => {
        this.setState({ dogs });
      })
      .catch((errFromGetDogs) => console.error(errFromGetDogs));
  }

  getEmployees = () => {
    const employees = employeesData.getAllEmployees()
      .then(() => {
        this.setState({ employees });
      })
      .catch((errFromGetEmployees) => console.error(errFromGetEmployees));
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
    this.getDogs();
    this.getEmployees();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderView = () => {
    const { authed, dogs, employees } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    return (
      <div>
        <DogPen dogs={dogs} />
        <StaffRoom employees={employees} />
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
