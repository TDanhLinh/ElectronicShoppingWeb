import axios from "axios";
import { Cookies } from "react-cookie";

// Initialize cookies
const cookies = new Cookies();

// Set up Axios defaults
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Add Axios Interceptors
axios.interceptors.request.use(
    (config) => {
        // Check if the request URL contains "/auth", and avoid attaching JWT token
        if (!config.url.includes("/auth")) {
            // Get the token from cookies
            const token = cookies.get("authToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        // Handle request errors
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

// Handle response errors globally
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                // Unauthorized, redirect to login page
                console.warn("Unauthorized! Redirecting to login...");
                cookies.remove("authToken"); // Clear token from cookies
                window.location.href = "/login";
            } else if (status === 403) {
                console.error("Forbidden access!");
            } else if (status >= 500) {
                console.error("Server error. Please try again later.");
            }
        } else {
            console.error("Network error or server is unreachable.");
        }
        return Promise.reject(error);
    }
);

// Define the request methods
export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};

// Example API calls
export const listAllAPI = (functionName) => axios.get(`/api/${functionName}/getAll`);
export const editAPI = (functionName, id, data) => axios.put(`/api/${functionName}/update/${id}`, data);
export const addAPI = (functionName, data) => axios.post(`/api/${functionName}/add`, data);
export const showAPI = (functionName, id) => axios.get(`/api/${functionName}/get/${id}`);
export const deleteAPI = (functionName, id) => axios.delete(`/api/${functionName}/delete/${id}`);
export const searchAPI = (functionName, keyword) => axios.get(`/api/${functionName}/search?keyword=${keyword}`);
export const editAPIWithFile = (functionName, id, formData) => axios.put(`/api/${functionName}/update/${id}`, formData);
