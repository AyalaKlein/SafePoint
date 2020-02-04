var express = require('express');
var router = express.Router();
const shelterDal = require('../DAL/ShelterDAL');

router.get('/', (req, res, next) => {
  //const {radius = 300, latitude, longitude, limit, } = req.query
  //if (req.session.userData) {
    shelterDal.getAll()
      .then((result) => {
        res.send(result);
      }).catch((err) => {
        res.status(500).send(err);
    });
  // } else {
  //   res.status(401).send();
  // }
});

router.post('/', (req, res, next) => {
  //if (req.session.userData) {
    shelterDal.createShelter()
      .then((result) => {
        res.status(200).send();
      }).catch((err) => {
        res.status(500).send(err);
    });
  // } else {
  //   res.status(401).send();
  // }
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
