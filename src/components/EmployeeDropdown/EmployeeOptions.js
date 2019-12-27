// import React from 'react';
// import {
//   DropdownItem,
//   DropdownMenu,
// } from 'reactstrap';


// const EmployeeDDOptions = (employees) => <DropdownMenu>{employees.map((employee) => <DropdownItem>{employee.firstName}</DropdownItem>)}</DropdownMenu>;

// export default EmployeeDDOptions;


// Extra ReactStrap options:
// ***********************************************
// import React, { useState } from 'react';
// import {
//   ButtonDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from 'reactstrap';
// // import EmployeeOptions from './EmployeeOptions';

// const EmployeeDD = (employees) => {
//   const [dropdownOpen, setOpen] = useState(false);
//   const toggle = () => setOpen(!dropdownOpen);

//   return (
//     <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret>
//         Select Employee
//       </DropdownToggle>
//       <DropdownMenu>
//         {/* <EmployeeOptions /> */}
//         <DropdownItem>Another Action</DropdownItem>
//         <DropdownItem>Another Action</DropdownItem>
//       </DropdownMenu>
//     </ButtonDropdown>
//   );
// };

// export default EmployeeDD;
// ****************************************************
