import React from 'react';
import firebase from 'firebase/app';

import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import DogPen from '../components/DogPen/DogPen';
import StaffRoom from '../components/StaffRoom/StaffRoom';

import dogsData from '../helpers/data/dogsData';
import employeesData from '../helpers/data/employeesData';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

firebaseConnection.firebaseApp();

class App extends React.Component {
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

  render() {
    const { dogs, employees } = this.state;

    return (
      <div className="App">
        <h1>Doggie Daycare</h1>
        <Auth />
      <DogPen dogs={dogs} />
      <StaffRoom employees={employees} />
    </div>
    );
  }
}

export default App;
