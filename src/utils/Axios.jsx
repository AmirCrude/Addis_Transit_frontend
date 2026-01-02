import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// attach jwt token to requests
instance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token") --commented out for testing purpose
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NzMyNzk4MiwiZXhwIjoxNzY3NDE0MzgyfQ.2bKUI6aXCjVfhZrlto5z4K6zqy36MTWHGIwwwr_cRw4"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
