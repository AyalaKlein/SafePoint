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
    Username: req.body.Username,
    Age: req.body.Age,
    Fitness: req.body.Fitness,
    Cities: req.body.Cities
  };

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
  if (req.body) {
    let userData = {
      Username: req.body.Username,
      Age: req.body.Age,
      Fitness: req.body.Fitness,
      Cities: req.body.Cities
    };

    userDal.updateUser(req.body._id, userData)
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

router.get('/delete/:id', (req, res) => {
  userDal.deleteUser(req.params.id)
    .then(result => {
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get('/getTopSelectedCities', (req, res) => {
  userDal.getAll()
    .then((results) => {
        let allCities = [];
        results.map(result => {
          allCities = allCities.concat(result.Cities);
        });

        let counts = {};

        allCities.forEach(city => {
          const cityName = city.name
          if (!counts[cityName]) {
            counts[cityName] = 1;
          } else {
            counts[cityName] = counts[cityName] + 1
          }
        });

        const countsArray = []
        for (let b in counts) {
          countsArray.push([b, counts[b]])
        }

        const topCities = countsArray.sort((a, b) => b[1] - a[1]).slice(0, 3).map(count => count[0]);
        
        res.send(topCities);
    }).catch((err) => {
      res.status(500).send(err);
  });
});

module.exports = router;
