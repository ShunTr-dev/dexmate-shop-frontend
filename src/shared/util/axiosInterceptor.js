import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token')
        // const token = localStorage.getItem('userData')

        const token = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).token : null;
        // console.log('Token: ' + token);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        //console.log("Axios interceptor called");
        if (response.status === 401) {
            //console.log("You are not authorized");
            // TO DO - Redirect to login page
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    }
);
