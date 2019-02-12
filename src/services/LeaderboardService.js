import axios from 'axios';

const url = '/api/leaderboard/';

class LeaderboardService {
    static getLeaderboard() {
        return new Promise(async (resolve, reject) => {
            try {
              const res = await axios.get(url);
              resolve(res.data);
            } catch(err) {
                reject(err);
            }
        })
    }
}

export default LeaderboardService;