const api = require('../src/api/api');

exports.summonerByName = async () => {
    try {
        const { data } = await api.get(`/summoner/v4/summoners/by-name/Signis`);
        const { id } = data;
        return id;
    } catch (error) {
        throw error
    }
}

exports.getTier = async () =>{
    try {
        const { data } = await api.get(`/league/v4/entries/by-summoner/6H89cDX0ha-eJaAmdxFGgrVbYquOl-uIMUDHXEdD0G3diQ`);
        const [soloq, flex] = data;
        return soloq;
    } catch (error) {
        throw error;
    }
}