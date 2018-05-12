const studentList = require('../data/personList.json').result;

const verifier = function (number) {
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].student_number === number) {
      return true;
    }
  }
  return false;
}

const getInfo = function (number) {
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].student_number === number) {
      return studentList[i];
    }
  }
  return null;
}

module.exports = {
  verifier: verifier,
  getInfo: getInfo
}