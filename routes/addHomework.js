const express = require('express');
const homeworkList = require('../tools/sequelize')
const bodyParser = require('body-parser')
const logger = require('../middlewares/logger');

const router = express.Router();

router.post('/api/add_homework', bodyParser.json(), (req, res) => {
  let homeworkItem;
  try {
    console.log(req.body)
    homeworkItem = req.body;
    homeworkList.create({
      name: homeworkItem.name,
      multifile: homeworkItem.multifile,
      create_folder: homeworkItem.createFolder,
      uploaded_list: '[]'
    })
    res.sendStatus(200);
  } catch(e) {
    logger.logger.error(e);
    res.sendStatus(400);
  }
})

module.exports = router;