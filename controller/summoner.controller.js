const api = require('../src/api/api');

exports.summonerByName = async (name) => {
    try {
        const { data } = await api.get(`/summoner/v4/summoners/by-name/${name}`);
        const { id } = data;
        return id;
    } catch (error) {
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