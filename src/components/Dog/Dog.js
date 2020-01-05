import React from 'react';
import dogShape from '../../helpers/propz/dogShape';
import paperClip from '../../helpers/assets/paper-clip2.png';
import './Dog.scss';

class Dog extends React.Component {
  static propTypes = {
    dog: dogShape.dogShape,
  }

  render() {
    const { dog } = this.props;

    return (
      <div className="card dog-card col-2 m-2">
        <img src={paperClip} className="paper-clip-img" alt="paper-clip" />
        <img src={dog.dogImageUrl} className="card-img-top dog-img" alt={dog.dogName} />
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
