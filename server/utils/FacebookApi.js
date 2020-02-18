const request = require('request-promise');

const id = '109133784005081';
const access_token = 'EAAG3339bQ0UBADHd1KGLYffGHzDhtTDo9BDJI0tdCY2KFJfZABqdQotOUZBKCFYzbWsjvZBUqVADcRNunrXhq6jY1Ja9sScZB7yxJUQoptbH8GdFXHZAuWZC1XsJLNCsExZBhsHhir1LebUU7l1SjGNOpL63ZAxkV5Sm6n3WrkGvYbsC9WjyoLwtyr9uIyD9tkeBBkbi5k5klQZDZD';

const shareMessage = (message) => {
    const postTextOptions = {
        method: 'POST',
        uri: `https://graph.facebook.com/v2.8/${id}/feed`,
        qs: {
          access_token: access_token,
          message
        }
      };
      request(postTextOptions);
};

const shareShelter = (shelterData) => {
    let baseMessage = `A new Shelter was created on {X:${shelterData.LocX}, Y:${shelterData.LocY}} with maximum of ${shelterData.MaxPopulation} people! More info: ${shelterData.Description}`;
    shareMessage(baseMessage)
};

const shareUser = (userData) => {
    let baseMessage = `A new User was created! Say hello to ${userData.Username}!`;
    shareMessage(baseMessage)
}

module.exports = { shareShelter, shareUser }