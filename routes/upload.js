const express = require('express');
const homeworkList = require('../tools/sequelize')
const verifier = require('../tools/verifier');
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const logger = require('../middlewares/logger');

let storage = multer.memoryStorage();

const uploader = multer({
  storage: storage
})

const router = express.Router();

router.post('/api/upload', uploader.single('file'), (req, res) => {
  try {
    console.log(req.body.info);
    let info = JSON.parse(req.body.info);
    let studentInfo = verifier.getInfo(info.studentNumber);
    if (studentInfo === null) {
      throw "no such student.";
    }
    homeworkList.findAll({
      where: {
        id: info.homework
      }
    }).then((result) => {
      let homeworkInfo = result[0];
      let nameList = JSON.parse(homeworkInfo.uploaded_list);
      let duplicateFlag = false;
      for (let i = 0; i < nameList.length; i++) {
        if (nameList[i] === studentInfo.name) {
          duplicateFlag = true;
          break;
        }
      }
      if (!duplicateFlag) {
        nameList.push(studentInfo.name);
        homeworkList.update({
          uploaded_list: JSON.stringify(nameList)
        }, {
          where: {
            id: info.homework
          }
        })
      }
      let file = req.file;
      fileHandle(file, studentInfo, homeworkInfo);
      res.sendStatus(200);
    }).catch((e) => {
      console.log(e);
      res.sendStatus(400);
    })
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});


let fileHandle = function (file, studentInfo, homeworkInfo) {
  let name = studentInfo.student_number + '-' + '软件4班' + '-' + studentInfo.name;
  if (homeworkInfo.create_folder === true) {
    let pathString = path.resolve('./upload/', homeworkInfo.name, name);
    mkdirp.sync(pathString);
    let fileName = path.parse(file.originalname);
    let fileString = path.join(pathString, file.originalname);
    let localFile;
    if (!fs.existsSync(fileString)) {
      localFile = fs.openSync(fileString, 'w', 666);
    } else {
      fileString = path.join(pathString, fileName.name + '_' + Date.now() + fileName.ext);
      localFile = fs.openSync(fileString, 'w', 666);
    }
    fs.writeFileSync(localFile, file.buffer);
  } else {
    let pathString = path.resolve('./upload/', homeworkInfo.name);
    mkdirp(pathString, (err) => {
      if (err) {
        logger.logger.error(err);
        throw err;
      }
    });
    let fileName = path.parse(file.originalname);
    let fileString = path.join(pathString, name + fileName.ext);
    let localFile = fs.openSync(fileString, 'w', 666);
    fs.writeFileSync(localFile, file.buffer);
  }
}

module.exports = router;