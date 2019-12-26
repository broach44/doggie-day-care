import React from 'react';

import walkShape from '../../helpers/propz/walkShape';

class Walk extends React.Component {
  static propTypes = {
    walk: walkShape.walkShape,
  }

  render() {
    const { walk } = this.props;

    return (
      <tr>
        <td>{walk.date}</td>
        <td>{walk.dogId}</td>
        <td>{walk.employeeId}</td>
      </tr>
    );
  }
}

export default Walk;
