import React from 'react';

import Walk from '../Walk/Walk';
import WalkForm from '../WalkForm/WalkForm';

import walksData from '../../helpers/data/walksData';

class WalkSchedule extends React.Component {
  state = {
    walks: [],
  }
  
  getWalks = () => {
    walksData.getWalksData()
      .then((walks) => {
        this.setState({ walks });
      })
      .catch((errFromGetWalks) => console.error(errFromGetWalks));
  }

  componentDidMount() {
    this.getWalks();
  }

  deleteWalk = (walkId) => {
    walksData.deleteWalkById(walkId)
      .then(() => {
        this.getWalks()
      })
      .catch((errFromDeleteWalk) => console.error(errFromDeleteWalk));
  }

  render() {
    const { walks } = this.state;
    return (
      <div>
        <h2 className="m-3">Walk Schedule Component</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Dog</th>
              <th scope="col">Employee</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              {
                walks.map((walk) => <Walk key={walk.id} walk={walk} deleteWalk={this.deleteWalk} />)
              }
          <tr>
            <td>Add New Walk</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <WalkForm />
          </tbody>
        </table>
      </div>
    );
  }
}

export default WalkSchedule;
