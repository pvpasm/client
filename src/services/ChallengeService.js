import axios from 'axios';

const url = 'http://localhost:5000/api/challenge/';

class ChallengeService {
  static getChallenges() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve([
          {
            opponent: "dawg",
            result: "W (2-3) [14:12-15:16]",
            date: new Date("1 Jan 2019")
          },                    
          {
            opponent: "dawg",
            result: "W (2-3) [14:12-15:16]",
            date: new Date("1 Jan 2019")
          },                    
          {
            opponent: "dawg",
            result: "W (2-3) [14:12-15:16]",
            date: new Date("1 Jan 2019")
          },                    
          {
            opponent: "dawg",
            result: "W (2-3) [14:12-15:16]",
            date: new Date("1 Jan 2019")
          },                    
          {
            opponent: "dawg",
            result: "W (2-3) [14:12-15:16]",
            date: new Date("1 Jan 2019")
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

export default ChallengeService;