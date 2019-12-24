import React from 'react';
import PropTypes from 'prop-types';

import Employee from '../Employee/Employee';

import employeeShape from '../../helpers/propz/employeeShape';

import './StaffRoom.scss';

class StaffRoom extends React.Component {
  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
  }

  render() {
    const { employees } = this.props;

    return (
      <div>
        <h2>Staff Room</h2>
        <div className="row">
        {
          employees.map((employee) => <Employee key={employee.id} employee={employee} />)
        }
        </div>
      </div>
    );
  }
}

export default StaffRoom;
