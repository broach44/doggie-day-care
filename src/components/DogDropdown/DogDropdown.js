import React from 'react';
import PropTypes from 'prop-types';

import dogShape from '../../helpers/propz/dogShape';

class DogDropdown extends React.Component {
  state = {
    listOpen: false,
    headerTitle: '',
  }

  static propTypes = {
    dogs: PropTypes.arrayOf(dogShape.dogShape),
    saveDogEntry: PropTypes.func,
    dogHeaderTitle: PropTypes.string,
    updateDogHeaderTitle: PropTypes.func,
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
    const { saveDogEntry, updateDogHeaderTitle } = this.props;

    e.preventDefault();
    saveDogEntry(e.target.id);
    this.toggleList();
    updateDogHeaderTitle(e.target.innerHTML);
  }

  render() {
    const { dogs, dogHeaderTitle } = this.props;
    const { listOpen } = this.state;
    return (
      <div className="dd-wrapper">
      <button className="dd-header btn btn-secondary btn-sm" onClick={() => this.toggleList()}>
        <div className="dd-header-title">{dogHeaderTitle}</div>
      </button>
      { listOpen
        && <div className="dd-list">
          {dogs.map((item) => (
            <li className="dd-list-item" key={item.id} onClick={this.saveEntryEvent} id={item.id}>{item.dogName}</li>
          ))}
        </div>
      }
      </div>
    );
  }
}

export default DogDropdown;
