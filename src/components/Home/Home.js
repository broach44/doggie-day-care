import React from 'react';

import firebase from 'firebase/app';

import firebaseConnection from '../../helpers/data/connection';
import Auth from '../Auth/Auth';
import Navbar from '../Navbar/Navbar';
import DogPen from '../DogPen/DogPen';
import StaffRoom from '../StaffRoom/StaffRoom';
import WalkSchedule from '../WalkSchedule/WalkSchedule';
import employeesData from '../../helpers/data/employeesData';
import dogsData from '../../helpers/data/dogsData';
import walksData from '../../helpers/data/walksData';

firebaseConnection.firebaseApp();

class Home extends React.Component {
  state = {
    authed: false,
    employees: [],
    dogs: [],
    walks: [],
  }

  getEmployees = () => {
    employeesData.getAllEmployees()
      .then((employees) => {
        this.setState({ employees });
      })
      .catch((errFromGetEmployees) => console.error(errFromGetEmployees));
  }

  getDogs = () => {
    dogsData.getAllDogs()
      .then((dogs) => {
        this.setState({ dogs });
      })
      .catch((errFromGetDogs) => console.error(errFromGetDogs));
  }

  getWalks = () => {
    walksData.getWalksData()
      .then((walks) => {
        this.setState({ walks });
      })
      .catch((errFromGetWalks) => console.error(errFromGetWalks));
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
    this.getEmployees();
    this.getDogs();
    this.getWalks();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  renderView = () => {
    const {
      authed,
      employees,
      dogs,
      walks,
    } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    return (
      <div>
        <DogPen dogs={dogs}/>
        <StaffRoom employees={employees}/>
        <WalkSchedule employees={employees} dogs={dogs} getWalks={this.getWalks} walks={walks} />
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
