const express = require('express');
const Upload = require('../tools/sequelize').Upload;

const router = express.Router();

router.get('/api/get_uploaded_list', (req, res) => {
  let id = req.query.id;
  Upload.findAll({
    attributes: ['who'],
    group: ['who'],
    where: {
      target: id
    },
    order: [
      ['id', 'DESC']
    ],
  }).then(result => {
    res.send(result.map(v => {
      return v.who;
    }));
  })
})

module.exports = router;