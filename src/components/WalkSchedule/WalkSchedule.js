import React from 'react';
import PropTypes from 'prop-types';

import Walk from '../Walk/Walk';
import WalkForm from '../WalkForm/WalkForm';

import walksData from '../../helpers/data/walksData';
import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';

class WalkSchedule extends React.Component {
  state = {
    walks: [],
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
  }

  getWalks = () => {
    walksData.getWalksData()
      .then((walks) => {
        this.setState({ walks });
      })
      .catch((errFromGetWalks) => console.error(errFromGetWalks));
  }

  componentDidMount() {
    this.getWalks();
  }

  deleteWalk = (walkId) => {
    walksData.deleteWalkById(walkId)
      .then(() => {
        this.getWalks();
      })
      .catch((errFromDeleteWalk) => console.error(errFromDeleteWalk));
  }

  render() {
    const { walks } = this.state;
    const { employees, dogs } = this.props;
    return (
      <div>
        <h2 className="m-3">Walk Schedule Component</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Dog</th>
              <th scope="col">Employee</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              {
                walks.map((walk) => <Walk key={walk.id} walk={walk} deleteWalk={this.deleteWalk} />)
              }
          <tr>
            <td>Add New Walk</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <WalkForm employees={employees} dogs={dogs}/>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WalkSchedule;
