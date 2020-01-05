import React from 'react';
import PropTypes from 'prop-types';
import Employee from '../Employee/Employee';

import './StaffRoom.scss';
import employeeShape from '../../helpers/propz/employeeShape';

class StaffRoom extends React.Component {
  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
  }

  render() {
    const { employees } = this.props;

    return (
      <div>
        <h2>Staff Room</h2>
        <div className="row justify-content-center">
        {
          employees.map((employee) => <Employee key={employee.id} employee={employee} />)
        }
        </div>
      </div>
    );
  }
}

export default StaffRoom;
