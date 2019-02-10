import axios from 'axios';

const url = 'http://localhost:5000/api/user/';

class UserService {
    // Login 
    static login(username, password) {
        console.log(username);
        console.log(password);
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}login`);
                const data = res.data;
                resolve(data);
            } catch(err) {
                reject("Login not implemented");
            }
        })
    }

    // Register
    static register() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}register`);
                const data = res.data;
                resolve(data);
            } catch(err) {
                reject("Register not implemented");
            }
        })
    }
}

export default UserService;