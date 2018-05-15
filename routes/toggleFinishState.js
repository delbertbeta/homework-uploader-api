const express = require('express');
const homeworkList = require('../tools/sequelize').HomeworkList
const logger = require('../middlewares/logger');

const router = express.Router();

router.get('/api/toggle_finish_state', (req, res) => {
  let para = req.query.id;
  if (para === undefined) {
    res.sendStatus(400);
  }
  homeworkList.findAll({
    where: {
      id: parseInt(para)
    }
  }).then(i => {
    let item = i[0];
    let result = !(item.finished);
    homeworkList.update({
      finished: result
    }, {
      where: {
        id: para
      }
    })
    res.sendStatus(200);
  }).catch((e) => {
    logger.logger.error(e);
    res.sendStatus(400);
  })
})

module.exports = router;