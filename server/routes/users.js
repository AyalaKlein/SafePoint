var express = require('express');
var router = express.Router();
const userDal = require('../DAL/UserDAL');

router.get('/getall', (req, res, next) => {
  // Check if admin
  userDal.getAll()
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err);
  });
});

router.post('/login', (req, res, next) => {

});

router.post('/register', (req, res, next) => {

});

module.exports = router;
