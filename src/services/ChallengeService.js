import axios from 'axios';

axios.defaults.withCredentials = true;

const url = '/api/challenge/';

class ChallengeService {
  static getChallenges() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}history`);
        resolve(res.data.map(item => ({
          ...item,
          myTime: "(" + String(Math.floor(item.myTime / 60)) + "m " + String(item.myTime % 60) + "s)",
          oppTime: item.oppTime == 0 ? "" : "(" + String(Math.floor(item.oppTime / 60)) + "m " + String(item.oppTime % 60) + "s)",
          date: new Date(item.date)
        })));
      } catch(err) {
        reject(err);
      }
    })
  }
  
  static getChall(num) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}chall${num}`);
        resolve(res.data.code);
      } catch(err) {
        reject(err);
      }
    })
  }  

  static start() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}start`);
        resolve(res.data);
      } catch(err) {
        reject(err);
      }
    })
  }

  static start() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}start`);
        resolve(res.data);
      } catch(err) {
        reject(err);
      }
    })
  }
}

export default ChallengeService;