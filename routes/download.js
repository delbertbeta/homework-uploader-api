const express = require('express');
const homeworkList = require('../tools/sequelize').HomeworkList;
const zipFolder = require('zip-folder')
const path = require('path')
const fs = require('fs')

const router = express.Router();

router.get('/api/download', (req, res) => {
  homeworkList.findOne({
    where: {
      id: req.query.id
    }
  }).then(i => {
    if (fs.existsSync(path.resolve('./upload/', i.name + '.zip'))) {
      fs.unlinkSync(path.resolve('./upload/', i.name + '.zip'));
    }
    zipFolder(path.resolve('./upload/', i.name), path.resolve('./upload/', i.name + '.zip'), function(err) {
      if(err) {
          res.send('oh no!', err);
      } else {
          res.sendFile(path.resolve('./upload/' + i.name + '.zip'))
      }
    })
  })
})

module.exports = router;