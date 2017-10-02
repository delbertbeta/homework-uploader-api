const express = require('express');
const verifier = require('../tools/verifier')

const router = express.Router();

router.get('/api/verify_student_number', (req, res) => {
  let para = req.query.id;
  if (para === undefined) {
    res.sendStatus(401);
  }
  if (verifier.verifier(para)) {
    res.send('');
  } else {
    res.sendStatus(401);
  }
})

module.exports = router;