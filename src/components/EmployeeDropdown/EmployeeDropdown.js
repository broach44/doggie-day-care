import React from 'react';
import PropTypes from 'prop-types';

import employeeShape from '../../helpers/propz/employeeShape';

class EmployeeDropdown extends React.Component {
  state = {
    listOpen: false,
    headerTitle: 'Choose an Employee',
  }

  static propTypes = {
    list: PropTypes.arrayOf(employeeShape.employeeShape),
    saveEmployeeEntry: PropTypes.func,
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
    e.preventDefault();
    this.props.saveEmployeeEntry(e.target.id);
    this.toggleList();
    this.setState({ headerTitle: e.target.innerHTML });
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
      <button className="dd-header btn btn-secondary btn-sm" onClick={() => this.toggleList()}>
        <div className="dd-header-title">{headerTitle}</div>
      </button>
      { listOpen
        && <div className="dd-list">
          {list.map((item) => (
            <li className="dd-list-item" key={item.id} onClick={this.saveEntryEvent} id={item.id}>{item.firstName} {item.lastName}</li>
          ))}
        </div>
      }
      </div>
    );
  }
}

export default EmployeeDropdown;
