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
    const dogs = dogsData.getAllDogs();
    this.setState({ dogs });
  }

  getEmployees = () => {
    const employees = employeesData.getAllEmployees();
    this.setState({ employees });
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
    const { authed } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    return (
      <div>
        <Navbar />
    </div>);
  }

  render() {
    const { dogs, employees } = this.state;

    return (
      <div className="Home">
        <h1>Doggie Daycare</h1>
        {
          this.renderView()
        }
      <DogPen dogs={dogs} />
      <StaffRoom employees={employees} />
    </div>
    );
  }
}

export default Home;
