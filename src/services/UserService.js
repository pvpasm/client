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
                resolve(data);
            } catch(err) {
                reject("Login failed!");
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
                reject("Register failed!");
            }
        })
    }
}

export default UserService;