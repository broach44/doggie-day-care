import React from 'react';
import employeeShape from '../../helpers/propz/employeeShape';

import './Employee.scss';

class Employee extends React.Component {
  static propTypes = {
    employee: employeeShape.employeeShape,
  }

  render() {
    const { employee } = this.props;
    return (
      <div className="card employee-card col-2 m-2">
      <div className="card-body">
        <img src="https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103597_960_720.png" alt="employee-sample" />
        <h5 className="card-title">{employee.firstName} {employee.lastName}</h5>
        <p className="card-text">Phone: {employee.phoneNumber}</p>
      </div>
    </div>
    );
  }
}

export default Employee;
