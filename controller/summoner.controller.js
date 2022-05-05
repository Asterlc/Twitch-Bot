"use strict";
const api = require('../src/api/api');
const querystring = require('querystring');


exports.summonerByName = async (name) => {
    try {
        let spacedName = '';
        if (name.length > 1) {
            for (let i = 0; i < name.length; i++){
                spacedName += ' ' + name[i];
            }
const querystring = require('querystring');
            const { data } = await api.get(`/summoner/v4/summoners/by-name/${spacedName.replace(' ','')}`, );
            const { id } = data;
            return id;
        }
        const { data } = await api.get(`/summoner/v4/summoners/by-name/${name}`);
        const { id } = data;

        return id;
    } catch (error) {
        console.log('error:>>', error.request)
        throw error
    }
}
// 6H89cDX0ha-eJaAmdxFGgrVbYquOl-uIMUDHXEdD0G3diQ
exports.getTier = async (id) => {
    try {
        const { data } = await api.get(`/league/v4/entries/by-summoner/${id}`);
        const [soloq] = data.filter(data => data.queueType == 'RANKED_SOLO_5x5');

        return soloq;
    } catch (error) {
        throw error;
    }
}