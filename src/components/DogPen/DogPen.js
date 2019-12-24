import React from 'react';
import PropTypes from 'prop-types';

import Dog from '../Dog/Dog';
import dogShape from '../../helpers/propz/dogShape';

class DogPen extends React.Component {
  static propTypes = {
    dogs: PropTypes.arrayOf(dogShape.dogShape),
  }

  render() {
    const { dogs } = this.props;

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
