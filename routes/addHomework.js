const express = require('express');
const homeworkList = require('../tools/sequelize')

const router = express.Router();

router.post('/api/add_homework', (req, res) => {
  let homeworkItem;
  try {
    homeworkItem = JSON.parse(req.body);
    homeworkList.create({
      name: homeworkItem.name,
      multifile: homeworkItem.multifile,
      create_folder: homeworkItem.createFolder,
      uploaded_list: '[]'
    })
    res.sendStatus(200);
  } catch(e) {
    res.sendStatus(400);
  }
})

module.exports = router;