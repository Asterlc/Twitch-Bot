require('dotenv').config();
const { summonerByName, getTier } = require('./../controller/summoner.controller');
const tmi = require('tmi.js');
const api = require('./api/api');

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: ['SignisLc']
});

client.connect();
client.on('message', (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = "!" + args.shift().toLowerCase();

    if (message.toLowerCase() === '!summoner') {
        summonerByName()
            .then(summonerID => summonerID)
            .then(async param => {
                const { tier, rank, leaguePoints } = await getTier(param);
                client.say(channel, `${tier} ${rank} PDL: ${leaguePoints}`);
            })
            .catch(error => console.log(error));

        // async function summonerByName() {
        //     try {
        //         const { data } = await api.get(`/summoner/v4/summoners/by-name/Signis`);
        //         const { id } = data;
        //         return id;
        //     } catch (error) {
        //         throw error;
        //     }
        // }

        // async function getTier() {
        //     try {
        //         const { data } = await api.get(`/league/v4/entries/by-summoner/6H89cDX0ha-eJaAmdxFGgrVbYquOl-uIMUDHXEdD0G3diQ`);
        //         const [soloq, flex] = data;
        //         return soloq;
        //     } catch (error) {
        //         throw error;
        //     }
        // }
        // client.say(channel, `@${tags.username}, usando api!`);
    }
});