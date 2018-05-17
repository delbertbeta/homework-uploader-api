const express = require('express');
const verifier = require('../tools/verifier');
const {Upload, HomeworkList} = require('../tools/sequelize');
const Op = require('sequelize').Op;

const router = express.Router();

router.get('/api/verify_student_number', (req, res) => {
  let id = req.query.id;
  let homework = req.query.homework;
  if (verifier.verifier(id)) {
    const obj = Upload.findAll({
      where: {
        [Op.and]: [{
            student_number: id
          },
          {
            target: homework
          }
        ]
      },
      include: [{
        model: HomeworkList,
      }],
      order: [
        ['id', 'DESC']
      ]
    }).then(result => {
      res.send(result);
    })
    
  } else {
    res.sendStatus(401);
  }
})

module.exports = router;