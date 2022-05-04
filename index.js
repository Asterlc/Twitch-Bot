require('dotenv').config();

const tmi = require('tmi.js');

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
    channels: ['nixnin_', 'SignisLc']
});

client.connect();
client.on('message', (channel, tags, message, self) => {
    if (self) return;

    switch (message.toLowerCase()) {
        case '!hello':
            client.say(channel, `@${tags.username}, Hello World !`);
            break;
        case '@signislc':
            client.say(channel, `@${tags.username}, que foi ?`);
            break;
        case '!elo':
            client.say(channel, `Madeira IV`);
            break;
        case '!stack':
            client.say(channel, `Node, MongoDB e Angular`);
            break;
        default:
            break;
    }
});