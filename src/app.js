"use strict";
require('dotenv').config();
const { summonerByName, getTier } = require('./controller/summoner.controller');
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
    let [command, ...name] = args;
    command = "!" + args.shift().toLowerCase();
    
    if (command.toLowerCase() === '!summoner') {
        summonerByName(name)
            .then(summonerID => summonerID)
            .then(async (id) => {
                let { tier, rank, leaguePoints } = await getTier(id);
                tier = tier.toLowerCase();
                client.say(channel, `Tier: ${tier[0].toUpperCase()}${tier.slice(1)} ${rank} - PDL: ${leaguePoints}`);
            })
            .catch(error => {
                console.log('error:>>', error)
                client.say(channel, `Ops, não encontrei esse ai não.`);
            })
    }

    if (message.toLowerCase() === '!hello') {
        client.say(channel, `Hello World!`);
    }
});