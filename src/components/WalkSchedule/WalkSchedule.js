import React from 'react';
import PropTypes from 'prop-types';
import walksData from '../../helpers/data/walksData';

import Walk from '../Walk/Walk';
import WalkForm from '../WalkForm/WalkForm';

import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';
import walkShape from '../../helpers/propz/walkShape';

class WalkSchedule extends React.Component {
  state = {
    editMode: false,
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
    getWalks: PropTypes.func,
    walks: PropTypes.arrayOf(walkShape.walkShape),
  }

  componentDidMount() {
    this.props.getWalks();
  }

  addWalk = (newWalk) => {
    walksData.saveWalk(newWalk)
      .then(() => {
        this.props.getWalks();
      })
      .catch((errFromAddWalk) => console.error(errFromAddWalk));
    this.cancelEditMode();
  }

  deleteWalk = (walkId) => {
    walksData.deleteWalkById(walkId)
      .then(() => {
        this.props.getWalks();
      })
      .catch((errFromDeleteWalk) => console.error(errFromDeleteWalk));
  }

  updateWalk = (walkId, updatedWalkObj) => {
    walksData.updateWalk(walkId, updatedWalkObj)
      .then(() => {
        this.props.getWalks();
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
    const { editMode } = this.state;
    const { walks, employees, dogs } = this.props;
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
                  employees={employees}
                  dogs={dogs}
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
            (editMode) && <WalkForm addWalk={this.addWalk} employees={employees} dogs={dogs}/>
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default WalkSchedule;
