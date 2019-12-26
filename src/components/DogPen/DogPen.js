import React from 'react';
// import PropTypes from 'prop-types';

import Dog from '../Dog/Dog';
import dogsData from '../../helpers/data/dogsData';
// import dogShape from '../../helpers/propz/dogShape';

class DogPen extends React.Component {
  state = {
    dogs: [],
  }

  getDogs = () => {
    dogsData.getAllDogs()
      .then((dogs) => {
        this.setState({ dogs });
      })
      .catch((errFromGetDogs) => console.error(errFromGetDogs));
  }

  componentDidMount() {
    this.getDogs();
  }

  render() {
    const { dogs } = this.state;

    return (
      <div className="DogPen">
        <h1>Dog Pen</h1>
        <div className="row justify-content-center">
          {
            dogs.map((dog) => <Dog key={dog.id} dog={dog} />)
          }
        </div>
      </div>
    );
  }
}

export default DogPen;
