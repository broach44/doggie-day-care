import React from 'react';

import Walk from '../Walk/Walk';
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

  render() {
    const { walks } = this.state;
    return (
      <div>
        <h2>Walk Schedule Component</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Dog</th>
              <th scope="col">Employee</th>
            </tr>
          </thead>
          <tbody>
              {
                walks.map((walk) => <Walk key={walk.id} walk={walk} />)
              }
          </tbody>
        </table>
      </div>
    );
  }
}

export default WalkSchedule;
