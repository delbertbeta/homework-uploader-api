const express = require('express');
const {
  HomeworkList,
  Upload
} = require('../tools/sequelize');
const verifier = require('../tools/verifier');
const multer = require('multer');

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const logger = require('../middlewares/logger');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let info = JSON.parse(req.body.info);
    let studentInfo = verifier.getInfo(info.studentNumber);
    // if (studentInfo === null) {
    //   req.error = true;
    // }
    HomeworkList.findOne({
      where: {
        id: info.homework
      }
    }).then((result) => {
      req.studentInfo = studentInfo;
      req.homeworkInfo = result;
      if (result.create_folder === true) {
        let pathString = path.resolve('./upload/', result.name, studentInfo.student_number + '-' + '软件4班' + '-' + studentInfo.name);
        if (!fs.existsSync(pathString)) {
          mkdirp.sync(pathString);
        }
        cb(null, pathString);
      } else {
        let pathString = path.resolve('./upload/', result.name);
        if (!fs.existsSync(pathString)) {
          mkdirp.sync(pathString);
        }
        cb(null, pathString);
      }
    })
  },
  filename: function (req, file, cb) {
    if (req.homeworkInfo.create_folder === true) {
      cb(null, file.originalname);
    } else {
      cb(null, req.studentInfo.student_number + '-' + '软件4班' + '-' + req.studentInfo.name + path.extname(file.originalname));
    }
  }
})

const uploader = multer({
  storage: storage
})

const router = express.Router();

router.post('/api/upload', uploader.single('file'), (req, res) => {
  let {
    studentInfo,
    homeworkInfo,
    file
  } = req;

  Upload.create({
    who: studentInfo.name,
    student_number: studentInfo.student_number,
    target: homeworkInfo.id,
    originalFile: file.originalname,
    storageFile: file.path,
    fileSize: file.size
  })

  logger.logger.warn("write to " + req.file.path);
  logger.logger.warn(req.ip + ' has uploaded for ' + studentInfo.name + ' at ' + homeworkInfo.name);
  res.sendStatus(200);
});


// let fileHandle = function (file, studentInfo, homeworkInfo) {
//   let name = studentInfo.student_number + '-' + '软件4班' + '-' + studentInfo.name;
//   createFolder = homeworkInfo.create_folder;
//   if (createFolder == true || createFolder == 1) {
//     let pathString = path.resolve('./upload/', homeworkInfo.name, name);
//     // console.log(pathString);
//     mkdirp.sync(pathString);
//     let fileName = path.parse(file.originalname);
//     let fileString = path.join(pathString, file.originalname);
//     let localFile;
//     if (!fs.existsSync(fileString)) {
//       localFile = fs.openSync(fileString, 'w', 666);
//     } else {
//       fileString = path.join(pathString, fileName.name + '_' + Date.now() + fileName.ext);
//       localFile = fs.openSync(fileString, 'w', 666);
//     }
//     fs.writeFileSync(localFile, file.buffer);
//     fs.closeSync();
//     logger.logger.warn("write to " + fileString);
//   } else {
//     let pathString = path.resolve('./upload/', homeworkInfo.name);
//     mkdirp.sync(pathString);
//     let fileName = path.parse(file.originalname);
//     let fileString = path.join(pathString, name + fileName.ext);
//     let localFile = fs.openSync(fileString, 'w', 666);
//     fs.writeFileSync(localFile, file.buffer);
//     fs.closeSync();
//     logger.logger.warn("write to " + fileString);
//   }
// }

module.exports = router;