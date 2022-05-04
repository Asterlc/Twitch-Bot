require('dotenv').config();
const axios = require('axios').default;

const api = axios.create({
    baseURL: 'https://br1.api.riotgames.com/lol/',
    headers: { "X-Riot-Token": `${process.env.RIOT_KEY}` }
});

module.exports = api;

//https://br1.api.riotgames.com/lol/