const studentList = require('../data/personList.json').result;

const verifier = function (number) {
  for (let i = 0; i < studentList.length; i++) {
    let copy = number;
    if (typeof copy === 'number') {
      copy = copy + '';
    }
    if (studentList[i].student_number === copy) {
      return true;
    }
  }
  return false;
}

const getInfo = function (number) {
  let copy = number;
  if (typeof copy === 'number') {
    copy = copy + '';
  }
  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].student_number === copy) {
      return studentList[i];
    }
  }
  return null;
}

module.exports = {
  verifier: verifier,
  getInfo: getInfo
}