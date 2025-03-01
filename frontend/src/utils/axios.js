import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL + "/api",
});

// Function to set up interceptors, receiving a function that retrieves the token
export const setupAxiosInterceptors = (getToken) => {
  instance.interceptors.request.use(
    (config) => {
      try {
        const token = getToken(); // Get the latest token dynamically

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default instance;
