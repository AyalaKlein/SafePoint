var express = require('express');
var router = express.Router();
const userDal = require('../DAL/UserDAL');
const TwitterApi = require('../utils/TwitterApi');
const FacebookApi = require('../utils/FacebookApi');

router.get('/getall', (req, res, next) => {
  // if (req.session.userData) {
    userDal.getAll()
      .then((result) => {
        res.send(result);
      }).catch((err) => {
        res.status(500).send(err);
    });
  // } else {
    // res.status(401).send();
  // }
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
          // TwitterApi.twitUser(userData);
          FacebookApi.shareUser(userData);
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

router.get('/getUserData', (req, res, next) => {
  if (req.session.userData) {
    userDal.getById(req.session.userData._id)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.send(500).send("Failed while trying to retrieve the user by id: " + req.session.userData._id);
      });
  } else {
    res.send(401).send("User must login");
  }
});

router.post('/edit', (req, res, next) => {
  if (req.session.userData) {
    let userData = {
      Username: req.body.username,
      Password: req.body.password,
      Age: req.body.age,
      Fitness: req.body.fitness,
      Cities: req.body.cities
    };

    userDal.updateUser(req.session.userData._id, userData)
      .then(result => {
        res.send(200).send();
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Failed while trying to update the user with the following data: " + req.body);
      });
  } else {
    res.send(401).send("User must login");
  }
});

module.exports = router;
