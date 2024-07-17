import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${"http://127.0.0.1:8000"}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    post: async function(url: string, formData: FormData): Promise<any> {
        console.log('post', url, formData);
    
        const token = await getAccessToken();
    
        return new Promise((resolve, reject) => {
            fetch(`${"http://127.0.0.1:8000"}${url}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json) => {
                console.log('Response:', json);
                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
        })
    },    
    

    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${"http://127.0.0.1:8000"}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiService;