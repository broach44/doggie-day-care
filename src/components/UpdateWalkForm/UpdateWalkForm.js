import React from 'react';
import PropTypes from 'prop-types';

import EmployeeDD from '../EmployeeDropdown/EmployeeDropdown';
import DogDD from '../DogDropdown/DogDropdown';

import dogShape from '../../helpers/propz/dogShape';
import employeeShape from '../../helpers/propz/employeeShape';
// import walkShape from '../../helpers/propz/walkShape';

class UpdateWalkForm extends React.Component {
  state = {
    selectedEmployee: '',
    selectedDog: '',
    selectedDate: '',
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
  }

  updateWalkEvent = () => {

  }

  render() {
    const { employees, dogs } = this.props;
    return (
      <tr>
        <td className="align-content-center">
          <input
            type="data"
            className="form-control col"
            id="dateInput"
            placeholder="1/1/2020"
            value={''}
            onChange={this.dateChange}
          />
        </td>
        <td><DogDD dogs={dogs} saveDogEntry={this.saveDogEntry}/></td>
        <td><EmployeeDD employees={employees} saveEmployeeEntry={this.saveEmployeeEntry} /></td>
        <td><button className="btn btn-warning btn-sm" onClick={this.updateWalkEvent}>Save Changes</button></td>
      </tr>
    );
  }
}

export default UpdateWalkForm;
