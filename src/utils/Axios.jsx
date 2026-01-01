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
    // const token = localStorage.getItem("token")
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc2NzEwMTI1NSwiZXhwIjoxNzY3MTg3NjU1fQ.KEqlS87ycrw5vaP7LBxuhk5I-icF8RAmq3YFG4ynTrY"
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
