"use strict";
const api = require('../src/api/api');

exports.summonerByName = async (name) => {
    try {
        let nameHandler = '';
        for (let i = 0; i < name.length; i++) {
            nameHandler += ' ' + name[i];
        }
        const { data } = await api.get(encodeURI(`/summoner/v4/summoners/by-name/${nameHandler.replace(' ', '')}`));
        const { id } = data;
        return id;

    } catch (error) {
        throw error
    }
}
// 6H89cDX0ha-eJaAmdxFGgrVbYquOl-uIMUDHXEdD0G3diQ
exports.getTier = async (id) => {
    try {
        const { data } = await api.get(encodeURI(`/league/v4/entries/by-summoner/${id}`));
        const [soloq] = data.filter(data => data.queueType == 'RANKED_SOLO_5x5');

        return soloq;
    } catch (error) {
        throw error;
    }
}