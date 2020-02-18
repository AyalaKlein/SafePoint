const request = require('request-promise');
const apiKey = "67aab106ee9c42c982ee8172a8287f87";

const getArticle = () => {
      return new Promise((resolve, reject) => {
        request(`http://newsapi.org/v2/everything?q=shelter&from=${formatDate()}&sortBy=publishedAt&apiKey=${apiKey}`)
            .then(result => {
                if (result != null) {
                    result = JSON.parse(result);
                    if (result.articles.length > 0) {
                        resolve({
                            title: result.articles[0].title,
                            url: result.articles[0].url
                        })
                    }
                }
                
                resolve(null);
            })
            .catch(reject);
      })
}

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = { getArticle };