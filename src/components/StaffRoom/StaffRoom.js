import React from 'react';

import Employee from '../Employee/Employee';
import employeesData from '../../helpers/data/employeesData';

import './StaffRoom.scss';

class StaffRoom extends React.Component {
  state = {
    employees: [],
  }

  getEmployees = () => {
    employeesData.getAllEmployees()
      .then((employees) => {
        this.setState({ employees });
      })
      .catch((errFromGetEmployees) => console.error(errFromGetEmployees));
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    const { employees } = this.state;

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
