import React from 'react';
import PropTypes from 'prop-types';

import WalkForm from '../WalkForm/WalkForm';

import employeeShape from '../../helpers/propz/employeeShape';
import dogShape from '../../helpers/propz/dogShape';
import walkShape from '../../helpers/propz/walkShape';

class Walk extends React.Component {
  state = {
    employee: {},
    dogName: '',
    walkToUpdate: '',
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
    editMode: PropTypes.string,
    setEditUpdateMode: PropTypes.func,
    setWalkToEdit: PropTypes.string,
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

  setUpdateWalkMode = (e) => {
    e.preventDefault();
    const { walk, setEditUpdateMode } = this.props;
    this.setState({
      editWalkMode: true,
      walkToUpdate: walk.id,
      selectedDog: walk.dogId,
      selectedDate: walk.date,
      selectedEmployee: walk.employeeId,
    });
    setEditUpdateMode(walk.id);
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
  }

  render() {
    const {
      walk,
      employees,
      dogs,
      editMode,
      setWalkToEdit,
    } = this.props;
    // const {
    //   editWalkMode,
    //   selectedDog,
    //   selectedEmployee,
    //   selectedDate,
    // } = this.state;

    return (
      <React.Fragment>
        {
          (editMode === 'update walk' && walk.id === setWalkToEdit)
            ? <WalkForm dogs={dogs} employees={employees} walk={walk} editMode={editMode} />
            : <tr>
                <td>{walk.date}</td>
                <td>{this.getDogName()}</td>
                <td>{this.getEmployeeName()}</td>
                <td>
                  <button className="btn btn-primary btn-sm"
                          onClick={this.deleteWalkEvent}>Delete Walk
                  </button>
                  <button className="btn btn-success btn-sm ml-2"
                          onClick={this.setUpdateWalkMode} dogs={dogs} employees={employees}>Update Walk
                  </button>
                </td>
              </tr>
        }
      </React.Fragment>
    );
  }
}

export default Walk;
