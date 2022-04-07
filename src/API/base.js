import axios from 'axios';


const AxiosInstance = axios.create({
  baseURL: `https://api.banahara.com/`,
  headers: {
    "Content-Type" : "application/json"
  }
});


AxiosInstance.interceptors.request.use((config) => {
// Do something before request is sent
  var token = localStorage.getItem('token');

    if(token)
    config.headers.Authorization = `Token ${token}`;

    

    return config;
  },(error) =>{
    // Do something with request error
    return Promise.reject(error);
  });

  AxiosInstance.interceptors.response.use((response)=>{
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default AxiosInstance;
