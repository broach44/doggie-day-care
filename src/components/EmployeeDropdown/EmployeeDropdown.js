import React from 'react';
import PropTypes from 'prop-types';

import employeeShape from '../../helpers/propz/employeeShape';

class EmployeeDropdown extends React.Component {
  state = {
    listOpen: false,
    headerTitle: '',
  }

  static propTypes = {
    employees: PropTypes.arrayOf(employeeShape.employeeShape),
    saveEmployeeEntry: PropTypes.func,
    employeeHeaderTitle: PropTypes.string,
    updateEmployeeHeaderTitle: PropTypes.func,
  }

  // ***Todo: Work on function below to close the toggle when clicking on body***
  // handleClickOutside = () => {
  //   this.setState({
  //     listOpen: false,
  //   });
  // }

  toggleList() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
    }));
  }

  saveEntryEvent = (e) => {
    const { saveEmployeeEntry, updateEmployeeHeaderTitle } = this.props;
    e.preventDefault();
    saveEmployeeEntry(e.target.id);
    this.toggleList();
    updateEmployeeHeaderTitle(e.target.innerHTML);
  }

  render() {
    const { employees, employeeHeaderTitle } = this.props;
    const { listOpen } = this.state;
    return (
      <div className="dd-wrapper">
      <button className="dd-header btn btn-secondary btn-sm" onClick={() => this.toggleList()}>
        <div className="dd-header-title">{employeeHeaderTitle}</div>
      </button>
      { listOpen
        && <div className="dd-list">
          {employees.map((item) => (
            <li className="dd-list-item" key={item.id} onClick={this.saveEntryEvent} id={item.id}>{item.firstName} {item.lastName}</li>
          ))}
        </div>
      }
      </div>
    );
  }
}

export default EmployeeDropdown;
