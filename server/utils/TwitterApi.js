const Twit = require('twit');

const T = new Twit({
    consumer_key:         '...',
    consumer_secret:      '...',
    access_token:         '...',
    access_token_secret:  '...'
});

const twitMessage = (message) => {
    T.post('statuses/update', {status: message});
};

const twitShelter = (shelterData) => {
    let baseMessage = `A new Shelter was created on {X:${shelterData.LocX}, Y:${shelterData.LocY}} with maximum of ${shelterData.MaxPopulation} people! More info: ${shelterData.Description}`;
    twitMessage(baseMessage)
};

const twitUser = (userData) => {
    let baseMessage = `A new User was created! Say hello to ${userData.Username}!`;
    twitMessage(baseMessage)
}

module.exports = { twitShelter, twitUser }