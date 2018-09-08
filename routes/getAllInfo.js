const express = require('express');
const { HomeworkList, Upload } = require('../tools/sequelize');

const router = express.Router();

router.get('/api/get_all_info', (req, res) => {
  HomeworkList.findAll({
    order: [
      ['id', 'DESC']
    ],
    include: [{
      model: Upload
    }]
  }).then(i => {
    res.type('application/json').send(i);
  })
})

module.exports = router;