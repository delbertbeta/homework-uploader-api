const express = require('express');
const homeworkList = require('../tools/sequelize').HomeworkList;

const router = express.Router();

router.get('/api/get_all_info', (req, res) => {
  homeworkList.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(i => {
    res.type('application/json').send(i);
  })
})

module.exports = router;