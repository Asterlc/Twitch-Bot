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
    // console.log(`${tags['display-name']}: ${message}`);
    // console.log('tags', JSON.stringify(tags, null, 4));
    // console.log('channel', JSON.stringify(channel, null, 4));
    // console.log('message', JSON.stringify(message, null, 4));
    // console.log('self', JSON.stringify(self, null, 4));

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

    // if (message.toLowerCase() === '!hello') {
    //     setTimeout(() => {
    //         return client.say(channel, `@${tags.username}, Hello World !`);

    //     }, 1500);
    // }
    // if (message.toLowerCase() === '@signislc') {
    //     setTimeout(() => {
    //         return client.say(channel, `@${tags.username}, que foi ?`);

    //     }, 1500);
    // }
    // if (message.toLowerCase() === '!elo') {
    //     setTimeout(() => {
    //         return client.say(channel, `Madeira IV`);

    //     }, 1500);
    // }
});