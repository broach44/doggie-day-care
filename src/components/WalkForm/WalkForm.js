import React from 'react';
import PropTypes from 'prop-types';

import EmployeeDD from '../EmployeeDropdown/EmployeeDropdown';
import DogDD from '../DogDropdown/DogDropdown';

import './WalkForm.scss';
import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';

class WalkForm extends React.Component {
  state = {
    selectedEmployee: '',
    selectedDog: '',
    selectedDate: '',
    dogHeaderTitle: 'Choose A Dog',
    employeeHeaderTitle: 'Choose An Employee',
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
    addWalk: PropTypes.func,
    updateWalk: PropTypes.func,
    editMode: PropTypes.string,
  }

  saveDogEntry = (currentDogSelected) => {
    this.setState({ selectedDog: currentDogSelected });
  }

  saveEmployeeEntry = (currentEmployeeSelected) => {
    this.setState({ selectedEmployee: currentEmployeeSelected });
  }

  updateDogHeaderTitle = (newTitle) => {
    this.setState({ dogHeaderTitle: newTitle });
  }

  updateEmployeeHeaderTitle = (newEmployeeTitle) => {
    this.setState({ employeeHeaderTitle: newEmployeeTitle });
  }

  saveWalkEvent = (e) => {
    const { addWalk, editMode } = this.props;
    const { selectedDate, selectedDog, selectedEmployee } = this.state;

    e.preventDefault();
    const newWalk = {
      dogId: selectedDog,
      date: selectedDate,
      employeeId: selectedEmployee,
    };
    // const walkToUpdate = walkId;
    if (editMode === 'new walk') {
      addWalk(newWalk);
    }
    this.setState({ selectedDog: '', selectedDate: '', selectedEmployee: '' });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ selectedDate: e.target.value });
  }

  render() {
    const { employees, dogs } = this.props;
    const { selectedDate, dogHeaderTitle, employeeHeaderTitle } = this.state;

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
          <td><DogDD dogs={dogs} saveDogEntry={this.saveDogEntry} dogHeaderTitle={dogHeaderTitle} updateDogHeaderTitle={this.updateDogHeaderTitle}/></td>
          <td><EmployeeDD employees={employees} saveEmployeeEntry={this.saveEmployeeEntry} employeeHeaderTitle={employeeHeaderTitle} updateEmployeeHeaderTitle={this.updateEmployeeHeaderTitle} /></td>
          <td><button className="btn btn-success btn-sm" onClick={this.saveWalkEvent}>Save Button</button></td>
        </tr>
    );
  }
}

export default WalkForm;
