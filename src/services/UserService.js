import axios from 'axios';

axios.defaults.withCredentials = true;

const url = '/api/user/';

class UserService {
    // Login 
    static login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}login`, {
                    username: username,
                    password: password
                });
                resolve(res.data);
            } catch(err) {
                reject(err.response.data.error);
            }
        })
    }

    // Register
    static register(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}register`, {
                    username: username,
                    password: password
                });
                resolve(res.data);
            } catch(err) {
                reject(err.response.data.error);
            }
        })
    }
}

export default UserService;