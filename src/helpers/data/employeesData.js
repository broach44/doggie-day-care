import axios from 'axios';
// import apiKeys from '../apiKeys.json';

// const baseUrl = apiKeys.firebaseKeys.databasURL;

const getAllEmployees = () => new Promise((resolve, reject) => {
  axios.get('https://doggie-daycare-e1e4d.firebaseio.com/employees')
    .then((result) => {
      const allEmployeesObj = result.data;
      const employees = [];
      if (allEmployeesObj != null) {
        Object.keys(allEmployeesObj).forEach((employeeId) => {
          const newEmployee = allEmployeesObj[employeeId];
          newEmployee.id = employeeId;
          employees.push(newEmployee);
        });
      }
      resolve(employees);
    })
    .catch((error) => reject(error));
});

export default { getAllEmployees };
