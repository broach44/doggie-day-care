import React from 'react';
import PropTypes from 'prop-types';

import EmployeeDD from '../EmployeeDropdown/EmployeeDropdown';
import DogDD from '../DogDropdown/DogDropdown';
import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';
import walkShape from '../../helpers/propz/walkShape';
import employeesData from '../../helpers/data/employeesData';
import dogsData from '../../helpers/data/dogsData';
import walksData from '../../helpers/data/walksData';

class Walk extends React.Component {
  state = {
    employee: {},
    dogName: '',
    walkToUpdate: '',
    editWalkMode: false,
    dogHeaderTitle: 'Choose A Dog',
    employeeHeaderTitle: 'Choose An Employee',
    selectedEmployee: '',
    selectedDog: '',
    selectedDate: '',
  }

  static propTypes = {
    walk: walkShape.walkShape,
    deleteWalk: PropTypes.func,
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    dogs: PropTypes.arrayOf(dogShape.dogShape),
    getWalks: PropTypes.func,
  }

  deleteWalkEvent = (e) => {
    e.preventDefault();
    const { deleteWalk, walk } = this.props;
    deleteWalk(walk.id);
  }

  getEmployeeName = () => {
    const { walk } = this.props;
    employeesData.getSingleEmployeeById(walk.employeeId)
      .then((employeeInfo) => {
        this.setState({ employee: employeeInfo.data });
      })
      .catch((errFromGetEmployeeName) => console.error(errFromGetEmployeeName));
  }

  getDogName = () => {
    const { walk } = this.props;
    dogsData.getSingleDogById(walk.dogId)
      .then((dogInfo) => {
        this.setState({ dogName: dogInfo.data.dogName });
      })
      .catch((errFromGetDogName) => console.error(errFromGetDogName));
  }

  setUpdateWalkMode = (e) => {
    e.preventDefault();
    const { walk } = this.props;
    const { dogName, employee } = this.state;
    this.setState({
      editWalkMode: true,
      walkToUpdate: walk.id,
      dogHeaderTitle: dogName,
      employeeHeaderTitle: `${employee.firstName} ${employee.lastName}`,
      selectedDog: walk.dogId,
      selectedDate: walk.date,
      selectedEmployee: walk.employeeId,
    });
  }

  componentDidMount() {
    this.getEmployeeName();
    this.getDogName();
  }

  saveDogEntry = (currentDogSelected) => {
    this.setState({ selectedDog: currentDogSelected });
  }

  saveEmployeeEntry = (currentEmployeeSelected) => {
    this.setState({ selectedEmployee: currentEmployeeSelected });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ selectedDate: e.target.value });
  }

  updateDogHeaderTitle = (newTitle) => {
    this.setState({ dogHeaderTitle: newTitle });
  }

  updateEmployeeHeaderTitle = (newEmployeeTitle) => {
    this.setState({ employeeHeaderTitle: newEmployeeTitle });
  }

  saveUpdatedWalk = () => {
    const { walk, getWalks } = this.props;
    const { selectedDog, selectedEmployee, selectedDate } = this.state;
    const updatedWalk = {
      dogId: selectedDog,
      employeeId: selectedEmployee,
      date: selectedDate,
    };
    walksData.updateWalk(walk.id, updatedWalk)
      .then(() => {
        getWalks();
        this.setState({ dogHeaderTitle: 'Choose A Dog' });
        this.setState({ editWalkMode: false });
      })
      .catch((errFromSaveUpdatedWalk) => console.error(errFromSaveUpdatedWalk));
  }

  render() {
    const { walk, employees, dogs } = this.props;
    const {
      employee,
      dogName,
      editWalkMode,
      dogHeaderTitle,
      employeeHeaderTitle,
      selectedDate,
    } = this.state;

    return (
      <tr>
        {
          (editWalkMode)
            ? <td className="align-content-center">
            <input
              type="data"
              className="form-control col"
              id="dateInput"
              placeholder="1/1/2020"
              value={selectedDate}
              onChange={this.dateChange}
            />
            </td>
            : <td>{walk.date}</td>
        }
        {
          (editWalkMode)
            ? <td><DogDD dogs={dogs} saveDogEntry={this.saveDogEntry} dogHeaderTitle={dogHeaderTitle} updateDogHeaderTitle={this.updateDogHeaderTitle} /></td>
            : <td>{dogName}</td>
        }
        {
          (editWalkMode)
            ? <td><EmployeeDD employees={employees} saveEmployeeEntry={this.saveEmployeeEntry} employeeHeaderTitle={employeeHeaderTitle} updateEmployeeHeaderTitle={this.updateEmployeeHeaderTitle} /></td>
            : <td>{employee.firstName} {employee.lastName}</td>
        }
        {
          (editWalkMode)
            ? <td><button className="btn btn-danger btn-sm" onClick={this.saveUpdatedWalk}>Save Updates</button></td>
            : <td>
                <button className="btn btn-primary btn-sm" onClick={this.deleteWalkEvent}>Delete Walk</button>
                <button className="btn btn-success btn-sm ml-2" onClick={this.setUpdateWalkMode} dogs={dogs} employees={employees}>Update Walk</button>
              </td>
        }
      </tr>
    );
  }
}

export default Walk;
