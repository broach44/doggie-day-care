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
    editMode: false,
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
  }

  componentDidMount() {
    this.getWalks();
  }

  getWalks = () => {
    walksData.getWalksData()
      .then((walks) => {
        this.setState({ walks });
      })
      .catch((errFromGetWalks) => console.error(errFromGetWalks));
  }

  addWalk = (newWalk) => {
    walksData.saveWalk(newWalk)
      .then(() => {
        this.getWalks();
      })
      .catch((errFromAddWalk) => console.error(errFromAddWalk));
    this.cancelEditMode();
  }

  deleteWalk = (walkId) => {
    walksData.deleteWalkById(walkId)
      .then(() => {
        this.getWalks();
      })
      .catch((errFromDeleteWalk) => console.error(errFromDeleteWalk));
  }

  updateWalk = (walkId, updatedWalk) => {
    walksData.updateWalk(walkId, updatedWalk)
      .then(() => {
        this.cancelEditMode();
        this.getWalks();
      })
      .catch((errFromUpdateWalk) => console.error(errFromUpdateWalk));
  }

  setEditMode = () => {
    this.setState({ editMode: true });
  }

  cancelEditMode = () => {
    this.setState({ editMode: false });
  }

  render() {
    const { walks, editMode } = this.state;
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
                walks.map((walk) => <Walk
                  key={walk.id}
                  walk={walk}
                  deleteWalk={this.deleteWalk}
                  setEditMode={this.setEditMode}
                  employees={employees}
                  dogs={dogs}
                  getWalks={this.getWalks}
                  updateWalk={this.updateWalk} />)
              }
          <tr>
            <td>
              {
                (!editMode) ? <button className="btn btn-success btn-sm" onClick={this.setEditMode}>Add New Walk</button>
                  : <button className="btn btn-danger btn-sm" onClick={this.cancelEditMode}>Cancel</button>
              }
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {
            (editMode) && <WalkForm addWalk={this.addWalk} cancelEditMode={this.cancelEditMode} employees={employees} dogs={dogs}/>
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default WalkSchedule;
