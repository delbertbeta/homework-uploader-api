const express = require('express');
const homeworkList = require('../tools/sequelize').HomeworkList;

const router = express.Router();

router.get('/api/get_homework_list', (req, res) => {
  homeworkList.findAll({
    attributes: ['id', 'name', 'multifile', 'ddl', 'tip'],
    order: [
      ['ddl', 'ASC']
    ],
    where: {
      finished: false
    }
  }).then(i => {
    res.type('application/json').send(i);
  })
})

module.exports = router;