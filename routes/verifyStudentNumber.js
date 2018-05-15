const express = require('express');
const verifier = require('../tools/verifier');
const {Upload, HomeworkList} = require('../tools/sequelize');
const Op = require('sequelize').Op;

const router = express.Router();

router.get('/api/verify_student_number', (req, res) => {
  let id = req.query.id;
  let homework = req.query.homework;
  if (para === undefined) {
    res.sendStatus(401);
  }
  if (verifier.verifier(para)) {
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
        through: {
          attributes: ['target']
        }
      }]
    });
    res.send(obj);
  } else {
    res.sendStatus(401);
  }
})

module.exports = router;