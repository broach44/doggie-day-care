import React from 'react';
import dogShape from '../../helpers/propz/dogShape';

class Dog extends React.Component {
  static propTypes = {
    dog: dogShape.dogShape,
  }

  render() {
    const { dog } = this.props;

    return (
      <div className="card col-3">
        <img src={dog.dogImageUrl} className="card-img-top" alt={dog.dogName} />
        <div className="card-body">
          <h5 className="card-title">{dog.dogName}</h5>
          <p className="card-text">Dog Owner: {dog.ownerName}</p>
          <p className="card-text">Description: {dog.description}</p>
        </div>
      </div>
    );
  }
}

export default Dog;
