var express = require('express');
var router = express.Router();
const shelterDal = require('../DAL/ShelterDAL');

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
  
});

module.exports = router;
