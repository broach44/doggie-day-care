import React from 'react';
import PropTypes from 'prop-types';

import './WalkForm.scss';
import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';
import walkShape from '../../helpers/propz/walkShape';

class WalkForm extends React.Component {
  state = {
    selectedEmployee: 'Someone',
    selectedDog: '',
    selectedDate: '',
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
    addWalk: PropTypes.func,
    updateWalk: PropTypes.func,
    editMode: PropTypes.string,
    walk: walkShape.walkShape,
  }

  setupForWalkupdate = () => {
    const { walk } = this.props;
    this.setState({ selectedEmployee: walk.employeeId, selectedDog: walk.dogId, selectedDate: walk.date });
  }

  componentDidMount() {
    const { editMode } = this.props;
    if (editMode === 'update walk') {
      this.setupForWalkupdate();
    }
  }

  saveDogEntry = (e) => {
    this.setState({ selectedDog: e.target.value });
  }

  saveEmployeeEntry = (e) => {
    this.setState({ selectedEmployee: e.target.value });
  }

  saveWalkEvent = (e) => {
    const {
      addWalk,
      editMode,
      walk,
      updateWalk,
    } = this.props;
    const { selectedDate, selectedDog, selectedEmployee } = this.state;

    e.preventDefault();
    const newWalk = {
      dogId: selectedDog,
      date: selectedDate,
      employeeId: selectedEmployee,
    };
    if (editMode === 'new walk') {
      addWalk(newWalk);
    } else if (editMode === 'update walk') {
      updateWalk(walk.id, newWalk);
    }
    this.setState({ selectedDog: '', selectedDate: '', selectedEmployee: '' });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ selectedDate: e.target.value });
  }

  render() {
    const { employees, dogs } = this.props;
    const { selectedDate, selectedDog, selectedEmployee } = this.state;

    return (
        <tr>
          <td className="align-content-center">
          <input
            type="data"
            className="form-control col"
            id="dateInput"
            placeholder="1/1/2020"
            value={selectedDate}
            onChange={this.dateChange}
          />
          </td>
          <td>
            <select className="form-control" value={selectedDog} id="dogName" onChange={this.saveDogEntry}>
              <option defaultValue>Choose A Dog</option>
            {
              dogs.map((dog) => (
                <option key={dog.id} value={dog.id}>{dog.dogName}</option>
              ))
            }
            </select>
          </td>
          <td>
            <select className="form-control" value={selectedEmployee} id="employeeName" onChange={this.saveEmployeeEntry}>
              <option defaultValue>Choose An Employee</option>
              {
                employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                ))
              }
            </select>
          </td>
          <td><button className="btn btn-success btn-sm" onClick={this.saveWalkEvent}>Save Button</button></td>
        </tr>
    );
  }
}

export default WalkForm;
