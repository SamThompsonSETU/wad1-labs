import { readFileSync } from 'fs';

const db = JSON.parse(readFileSync('./models/employee.json', 'utf8'));

const employeeStore = {
  getAppInfo() {
    return db.employee;
  }
};

export default employeeStore;
