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
        req.session.save();
        res.status(200).json();
      } else {
        res.status(401).send("Username or password don't match");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.status(200).send();
});

router.post('/register', (req, res, next) => {
  let userData = {
    Username: req.body.username,
    Password: req.body.password,
    Age: req.body.age,
    Fitness: req.body.fitness,
    Cities: req.body.cities
  };

  userDal.isUserExist(userData.Username)
    .then(user => {
      if (user) {
        res.status(403).send("Username is already taken");
      }

      userDal.registerUser(userData)
        .then(result => {
          res.status(200).send();
        })
        .catch(err => {
          console.log(err);
          res.status(500).send("Failed while trying to register the user with the following data: " + req.body);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Failed while trying to register the user with the following data: " + req.body);
    });
});

module.exports = router;
