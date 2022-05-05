require('dotenv').config();
const axios = require('axios').default;

const api = axios.create({
    baseURL: `${process.env.RIOT_URL}`,
    headers: {
        "X-Riot-Token": `${process.env.RIOT_KEY}`,
    }

});

module.exports = api;