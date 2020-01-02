import React from 'react';
import PropTypes from 'prop-types';

import EmployeeDD from '../EmployeeDropdown/EmployeeDropdown';
import DogDD from '../DogDropdown/DogDropdown';
import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';
import walkShape from '../../helpers/propz/walkShape';

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
    updateWalk: PropTypes.func,
  }

  deleteWalkEvent = (e) => {
    e.preventDefault();
    const { deleteWalk, walk } = this.props;
    deleteWalk(walk.id);
  }

  getEmployeeName = () => {
    const { walk, employees } = this.props;
    const currentEE = employees.find((employee) => employee.id === walk.employeeId);
    const employeeFullName = `${currentEE.firstName} ${currentEE.lastName}`;
    return employeeFullName;
  }

  getDogName = () => {
    const { walk, dogs } = this.props;
    const currentDog = dogs.find((dog) => dog.id === walk.dogId);
    return currentDog.dogName;
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

  setUpdateWalkMode = (e) => {
    e.preventDefault();
    const { walk } = this.props;
    this.setState({
      editWalkMode: true,
      walkToUpdate: walk.id,
      dogHeaderTitle: this.getDogName(),
      employeeHeaderTitle: this.getEmployeeName(),
      selectedDog: walk.dogId,
      selectedDate: walk.date,
      selectedEmployee: walk.employeeId,
    });
  }

  updateWalkEvent = (e) => {
    e.preventDefault();
    const { walk, updateWalk } = this.props;
    const { selectedDog, selectedEmployee, selectedDate } = this.state;
    const updatedWalk = {
      dogId: selectedDog,
      employeeId: selectedEmployee,
      date: selectedDate,
    };
    updateWalk(walk.id, updatedWalk);
    this.setState({ dogHeaderTitle: 'Choose A Dog' });
    this.setState({ editWalkMode: false });
  }

  render() {
    const { walk, employees, dogs } = this.props;
    const {
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
            : <td>{this.getDogName()}</td>
        }
        {
          (editWalkMode)
            ? <td><EmployeeDD employees={employees} saveEmployeeEntry={this.saveEmployeeEntry} employeeHeaderTitle={employeeHeaderTitle} updateEmployeeHeaderTitle={this.updateEmployeeHeaderTitle} /></td>
            : <td>{this.getEmployeeName()}</td>
        }
        {
          (editWalkMode)
            ? <td><button className="btn btn-danger btn-sm" onClick={this.updateWalkEvent}>Save Updates</button></td>
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
