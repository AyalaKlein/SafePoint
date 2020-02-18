var express = require('express');
var router = express.Router();
const cityDAL = require('../DAL/CityDAL');

router.get('/getall', (req, res) => {
    cityDAL.getAll()
      .then((result) => {
        res.send(result);
      }).catch((err) => {
        res.status(500).send(err);
    });
});

module.exports = router;
