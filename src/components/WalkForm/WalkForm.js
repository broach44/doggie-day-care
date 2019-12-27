import React from 'react';

import './WalkForm.scss';

class WalkForm extends React.Component {
  render() {
    return (
        <tr>
          <td>
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">Reference</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
              <span className="sr-only">Toggle Dropdown</span>
            </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
            <button className="dropdown-item">Action</button>
            <button className="dropdown-item">Another action</button>
            <button className="dropdown-item">Something else here</button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item">Separated link</button>
          </div>
  </div></td>
          <td>Dog to be walked</td>
          <td>Employee to do walk</td>
          <td><button className="btn btn-success btn-sm">Save Button</button></td>
        </tr>
    );
  }
}

export default WalkForm;
