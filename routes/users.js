const express = require('express');

const router = express.Router();

const User = require('../models/in_memo/user')
/* GET users listing. */
router.get('/', (req, res) => {
  const U = new User(req.query.firstname, req.query.lastname, req.query.age)
  // res.send('respond with a resource');
  res.locals.user = u;
  res.render('user');
});

module.exports = router;
