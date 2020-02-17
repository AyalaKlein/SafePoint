var express = require('express');
var router = express.Router();
const NewsApi = require('../utils/NewsApi');

router.get('/get', (req, res, next) => {
    NewsApi.getArticle()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;