import axios from 'axios';

const url = '/api/news/';

class NewsService {
    static getNews() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.map(item => ({
                    ...item,
                    date: new Date(item.createdAt)
                })));
            } catch(err) {
                reject(err);
            }
        })
    }
}

export default NewsService;