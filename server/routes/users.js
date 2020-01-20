var express = require('express');
var router = express.Router();
const userDal = require('../DAL/UserDAL');

router.get('/getall', (req, res, next) => {
  if (req.session.userData) {
    userDal.getAll()
      .then((result) => {
        res.send(result);
      }).catch((err) => {
        res.status(500).send(err);
    });
  } else {
    res.status(401).send();
  }
});

router.post('/login', (req, res, next) => {
  let userData = {username: req.body.username,
                  password: req.body.password};
  
  userDal.userLogin(userData.username, userData.password)
    .then(result => {
      if (result) {
        req.session.userData = result;
        res.status(200).json();
      } else {
        res.status(401).send("Username or password don't match");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

router.post('/register', (req, res, next) => {

});

module.exports = router;
