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
  }

  saveDogEntry = (currentDogSelected) => {
    this.setState({ selectedDog: currentDogSelected });
  }

  saveEmployeeEntry = (currentEmployeeSelected) => {
    this.setState({ selectedEmployee: currentEmployeeSelected });
  }

  render() {
    const { employees, dogs } = this.props;

    return (
        <tr>
          <td>
          </td>
          <td><DogDD list={dogs} saveDogEntry={this.saveDogEntry}/></td>
          <td><EmployeeDD list={employees} saveEmployeeEntry={this.saveEmployeeEntry} /></td>
          <td><button className="btn btn-success btn-sm">Save Button</button></td>
        </tr>
    );
  }
}

export default WalkForm;
