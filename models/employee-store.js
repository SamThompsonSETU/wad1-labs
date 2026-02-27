import { readFileSync } from 'fs';

const db = JSON.parse(readFileSync('./models/employee.json', 'utf8'));

const employeeStore = {
  getAppInfo() {
    // return the array of employees stored in JSON
    return db.employees;
  }
};

export default employeeStore;
