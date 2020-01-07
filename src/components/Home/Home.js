import React from 'react';
import { Link } from 'react-router-dom';

import DogPen from '../DogPen/DogPen';
import StaffRoom from '../StaffRoom/StaffRoom';
import WalkSchedule from '../WalkSchedule/WalkSchedule';

import dogsData from '../../helpers/data/dogsData';
import employeesData from '../../helpers/data/employeesData';
import walksData from '../../helpers/data/walksData';

import './Home.scss';


class Home extends React.Component {
  state = {
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
    this.getEmployees();
    this.getDogs();
    this.getWalks();
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

  renderView = () => {
    const {
      employees,
      dogs,
      walks,
      view,
    } = this.state;
    if (view === 'DogPen') {
      return (
        <div>
            <div>
              <button className="btn btn-primary btn-lg m-2 active" id="DogPen">Dogs</button>
              <button className="btn btn-primary btn-lg m-2" onClick={this.navToStaffView} id="StaffRoom">Staff</button>
              <button className="btn btn-primary btn-lg m-2" onClick={this.navToScheduleView} id="WalkSchedule">Schedule</button>
            </div>
            <DogPen dogs={dogs}/>
        </div>
      );
    }
    if (view === 'StaffRoom') {
      return (
        <div>
          <div>
            <button className="btn btn-primary btn-lg m-2 " onClick={this.navToDogView} id="DogPen">Dogs</button>
            <button className="btn btn-primary btn-lg m-2 active" id="StaffRoom">Staff</button>
            <button className="btn btn-primary btn-lg m-2" onClick={this.navToScheduleView} id="WalkSchedule">Schedule</button>
          </div>
          <StaffRoom employees={employees}/>
        </div>
      );
    }
    if (view === 'WalkSchedule') {
      return (
        <div>
          <div>
            <Link className="btn btn-primary btn-lg m-2" to="/DogPen" id="DogPen">Dogs</Link>
            <button className="btn btn-primary btn-lg m-2" onClick={this.navToStaffView} id="StaffRoom">Staff</button>
            <button className="btn btn-primary btn-lg m-2 active" id="WalkSchedule">Schedule</button>
          </div>
          <WalkSchedule employees={employees} dogs={dogs} getWalks={this.getWalks} walks={walks} />
        </div>
      );
    }
    return (
      <div className="nav-row row justify-content-around">
        <div className="nav-div card col-4 bg-dark text-white DogPenDiv" onClick={this.navToDogView}>
          <img
            src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1065,w_1900,x_0,y_112/f_auto,q_auto,w_1100/v1565050342/shape/mentalfloss/594059-heartsbonesrescue.jpg"
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay">
            <h1 className="card-title">Dog Pen</h1>
          </div>
        </div>
        <div className="nav-div card col-4 bg-dark text-white DogPenDiv" onClick={this.navToStaffView}>
          <img src="https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/86521966-careers-animals-job-632x475.jpg" className="card-img" alt="..." />
          <div className="card-img-overlay">
            <h1 className="card-title">Staff</h1>
          </div>
        </div>
        <div className="nav-div card col-4 bg-dark text-white DogPenDiv" onClick={this.navToScheduleView}>
          <img src="https://blog-assets.hootsuite.com/wp-content/uploads/2017/11/how-to-schedule-tweets-940x470.jpg" className="card-img" alt="..." />
          <div className="card-img-overlay">
            <h1 className="card-title">Walk Schedule</h1>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {
          this.renderView()
        }
    </div>
    );
  }
}

export default Home;
