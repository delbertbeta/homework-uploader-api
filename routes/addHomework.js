const express = require('express');
const homeworkList = require('../tools/sequelize').HomeworkList
const bodyParser = require('body-parser')
const logger = require('../middlewares/logger');

const router = express.Router();

router.post('/api/add_homework', bodyParser.json(), (req, res) => {
  let homeworkItem;
  try {
    homeworkItem = req.body;
    homeworkList.create({
      name: homeworkItem.name,
      multifile: homeworkItem.multifile,
      create_folder: homeworkItem.createFolder,
      ddl: homeworkItem.ddl,
      tip: homeworkItem.tip
    })
    res.sendStatus(200);
  } catch(e) {
    logger.logger.error(e);
    res.sendStatus(400);
  }
})

module.exports = router;