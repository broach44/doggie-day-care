import React from 'react';

import walkShape from '../../helpers/propz/walkShape';
import employeesData from '../../helpers/data/employeesData';
import dogsData from '../../helpers/data/dogsData';

class Walk extends React.Component {
  state = {
    employee: {},
    dogName: '',
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
      .catch((errFromGetEmployeeName) => console.error(errFromGetEmployeeName));
  }

  getDogName = () => {
    const { walk } = this.props;
    dogsData.getSingleDogById(walk.dogId)
      .then((dogInfo) => {
        this.setState({ dogName: dogInfo.data.dogName })
      })
      .catch((errFromGetDogName) => console.error(errFromGetDogName));
  }


  componentDidMount() {
    this.getEmployeeName();
    this.getDogName();
  }

  render() {
    const { walk } = this.props;
    const { employee, dogName } = this.state;

    return (
      <tr>
        <td>{walk.date}</td>
        <td>{dogName}</td>
        <td>{employee.firstName} {employee.lastName}</td>
      </tr>
    );
  }
}

export default Walk;
