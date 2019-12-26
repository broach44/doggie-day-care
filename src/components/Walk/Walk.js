import React from 'react';

import walkShape from '../../helpers/propz/walkShape';
import employeesData from '../../helpers/data/employeesData';
import dogsData from '../../helpers/data/dogsData';

class Walk extends React.Component {
  state = {
    employee: {},
    dog: {},
  }

  static propTypes = {
    walk: walkShape.walkShape,
  }

  getEmployeeName = () => {
    const { walk } = this.props;
    employeesData.getSingleEmployeeById(walk.employeeId)
      .then((employeeInfo) => {
        this.setState({ employee: employeeInfo.data })
      })
      .catch((errFromGetEmployeeById) => console.error(errFromGetEmployeeById));
  }

  getDogName = () => {
    const { walk } = this.props;
    dogsData.getSingleDogById(walk.dogId)
      .then((dogInfo) => {
        this.setState({ dog: dogInfo.data })
      })
      .catch((errFromGetDogById) => console.error(errFromGetDogById));
  }

  componentDidMount() {
    this.getEmployeeName();
    this.getDogName();
  }

  render() {
    const { walk } = this.props;
    const { employee, dog } = this.state;

    return (
      <tr>
        <td>{walk.date}</td>
        <td>{walk.dogId} {dog.name}</td>
        <td>{employee.firstName} {employee.lastName}</td>
      </tr>
    );
  }
}

export default Walk;
