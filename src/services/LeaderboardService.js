import axios from 'axios';

const url = 'http://localhost:5000/api/leaderboard/';

class LeaderboardService {
    static getLeaderboard() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve([
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    },
                    {
                      rank: "0",
                      name: "daniellimws",
                      points: 3000
                    }
                ]);
                // const res = await axios.get(url);
                // const data = res.data;
                // resolve(data);
            } catch(err) {
                reject(err);
            }
        })
    }
}

export default LeaderboardService;