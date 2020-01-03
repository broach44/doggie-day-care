import React from 'react';

import firebase from 'firebase/app';

import Auth from '../Auth/Auth';
import DogPen from '../DogPen/DogPen';
import Navbar from '../Navbar/Navbar';
import StaffRoom from '../StaffRoom/StaffRoom';
import WalkSchedule from '../WalkSchedule/WalkSchedule';

import dogsData from '../../helpers/data/dogsData';
import employeesData from '../../helpers/data/employeesData';
import firebaseConnection from '../../helpers/data/connection';
import walksData from '../../helpers/data/walksData';

firebaseConnection.firebaseApp();

class Home extends React.Component {
  state = {
    authed: false,
    employees: [],
    dogs: [],
    walks: [],
    view: 'Home',
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
        this.getEmployees();
        this.getDogs();
        this.getWalks();
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  navToDogView = (e) => {
    e.preventDefault();
    this.setState({ view: 'DogPen' });
  }

  navToStaffView = (e) => {
    e.preventDefault();
    this.setState({ view: 'StaffRoom' });
  }

  navToScheduleView = (e) => {
    e.preventDefault();
    this.setState({ view: 'WalkSchedule' });
  }

  setHomeView = () => {
    this.setState({ view: 'Home' });
  }

  renderView = () => {
    const {
      authed,
      employees,
      dogs,
      walks,
      view,
    } = this.state;
    if (!authed) {
      return (<Auth />);
    }
    if (view === 'DogPen') {
      return (
        <div>
            <div>
              <button className="btn btn-warning btn-lg m-2 active" id="DogPen">Dogs</button>
              <button className="btn btn-warning btn-lg m-2" onClick={this.navToStaffView} id="StaffRoom">Staff</button>
              <button className="btn btn-warning btn-lg m-2" onClick={this.navToScheduleView} id="WalkSchedule">Schedule</button>
            </div>
            <DogPen dogs={dogs}/>
        </div>
      );
    }
    if (view === 'StaffRoom') {
      return (
        <div>
          <div>
            <button className="btn btn-warning btn-lg m-2 " onClick={this.navToDogView} id="DogPen">Dogs</button>
            <button className="btn btn-warning btn-lg m-2 active" id="StaffRoom">Staff</button>
            <button className="btn btn-warning btn-lg m-2" onClick={this.navToScheduleView} id="WalkSchedule">Schedule</button>
          </div>
          <StaffRoom employees={employees}/>
        </div>
      );
    }
    if (view === 'WalkSchedule') {
      return (
        <div>
          <div>
            <button className="btn btn-warning btn-lg m-2" onClick={this.navToDogView} id="DogPen">Dogs</button>
            <button className="btn btn-warning btn-lg m-2" onClick={this.navToStaffView} id="StaffRoom">Staff</button>
            <button className="btn btn-warning btn-lg m-2 active" id="WalkSchedule">Schedule</button>
          </div>
          <WalkSchedule employees={employees} dogs={dogs} getWalks={this.getWalks} walks={walks} />
        </div>
      );
    }
    return (
      <div className="d-flex justify-content-between">
        <div className="nav-div m-2" onClick={this.navToDogView} id="DogPen"><h1>Dogs</h1></div>
        <div className="nav-div m-2" onClick={this.navToStaffView} id="StaffRoom"><h1>Staff</h1></div>
        <div className="nav-div m-2" onClick={this.navToScheduleView} id="WalkSchedule"><h1>Schedule</h1></div>
      </div>
    );
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="Home">
        <Navbar authed={authed} setHomeView={this.setHomeView} />
        {
          this.renderView()
        }
    </div>
    );
  }
}

export default Home;
