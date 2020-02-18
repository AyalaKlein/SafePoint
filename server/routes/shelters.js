var express = require('express');
var router = express.Router();
const shelterDal = require('../DAL/ShelterDAL');
const TwitterApi = require('../utils/TwitterApi');
const FacebookApi = require('../utils/FacebookApi');

router.get('/getall', (req, res, next) => {
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

router.post('/create', (req, res, next) => {
  //if (req.session.userData) {
    shelterDal.createShelter(req.body)
      .then((result) => {
        // TwitterApi.twitShelter(req.body);
        FacebookApi.shareShelter(req.body);
        res.status(200).send();
      }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
  // } else {
  //   res.status(401).send();
  // }
});

router.post('/edit', (req, res, next) => {
  let newData = {
    LocX: req.body.LocX,
    LocY: req.body.LocY,
    Description: req.body.Description,
    MaxPopulation: req.body.MaxPopulation
  };

  shelterDal.editShelter(req.body._id, newData)
    .then(result => {
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

router.get('/delete/:id', (req, res, next) => {
  shelterDal.deleteShelter(req.params.id)
    .then(result => {
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get('/sheltersByMonth', (req, res, next) => {
  shelterDal.sheltersByMonth()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
});

router.get('/sheltersCountByPopulation', (req, res, next) => {
  shelterDal.sheltersCountByMaxPopulation()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
});

module.exports = router;
