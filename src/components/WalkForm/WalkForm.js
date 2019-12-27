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
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
    addWalk: PropTypes.func,
    cancelEditMode: PropTypes.func,
  }

  saveDogEntry = (currentDogSelected) => {
    this.setState({ selectedDog: currentDogSelected });
  }

  saveEmployeeEntry = (currentEmployeeSelected) => {
    this.setState({ selectedEmployee: currentEmployeeSelected });
  }

  saveWalkEvent = (e) => {
    const { addWalk } = this.props;
    const { selectedDate, selectedDog, selectedEmployee } = this.state;

    e.preventDefault();
    const newWalk = {
      dogId: selectedDog,
      date: selectedDate,
      employeeId: selectedEmployee,
    };
    addWalk(newWalk);
    this.setState({ selectedDog: '', selectedDate: '', selectedEmployee: '' });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ selectedDate: e.target.value });
  }

  render() {
    const { employees, dogs } = this.props;
    const { selectedDate } = this.state;

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
          <td><DogDD list={dogs} saveDogEntry={this.saveDogEntry}/></td>
          <td><EmployeeDD list={employees} saveEmployeeEntry={this.saveEmployeeEntry} /></td>
          <td><button className="btn btn-success btn-sm" onClick={this.saveWalkEvent}>Save Button</button></td>
        </tr>
    );
  }
}

export default WalkForm;
