import React from 'react';

import DogPen from '../components/DogPen/DogPen';
import StaffRoom from '../components/StaffRoom/StaffRoom';

import dogsData from '../helpers/data/dogsData';
import employeesData from '../helpers/data/employeesData';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends React.Component {
  state = {
    dogs: [],
    employees: [],
  }

  getDogs = () => {
    const dogs = dogsData.getAllDogs();
    this.setState({ dogs });
  }

  getEmployees = () => {
    const employees = employeesData.getAllEmployees();
    this.setState({ employees });
  }

  componentDidMount() {
    this.getDogs();
    this.getEmployees();
  }

  render() {
    const { dogs, employees } = this.state;

    return (
      <div className="App">
        <h1>Doggie Daycare</h1>
      <DogPen dogs={dogs} />
      <StaffRoom employees={employees} />
    </div>
    );
  }
}

export default App;
