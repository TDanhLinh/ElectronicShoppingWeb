import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add Axios request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get cookies
        const cookies =
            typeof window === "undefined"
                ? parseCookies() // Parse cookies from the request
                : parseCookies(null); // Parse cookies from the browser

        const token = cookies.authToken;

        // Attach Authorization header if token exists and URL is not "/auth"
        if (token && !config.url.includes("/auth")) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

// Add Axios response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                console.warn("Unauthorized! Redirecting to login...");

                // Clear the auth token cookie
                destroyCookie(null, "authToken", { path: "/" });

                // Redirect to login page (only works in CSR)
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
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

// Export the Axios instance
export default axiosInstance;

// Define request methods for reuse
export const request = (method, url, data = null) => {
    const options = {
        method,
        url,
    };

    if (method.toLowerCase() === "get") {
        options.params = data;
    } else {
        options.data = data;
    }

    return axiosInstance(options);
};

// Example API calls
export const listAllAPI = (functionName) => axiosInstance.get(`/api/${functionName}/getAll`);
export const editAPI = (functionName, id, data) =>
    axiosInstance.put(`/api/${functionName}/update/${id}`, data);
export const addAPI = (functionName, data) => axiosInstance.post(`/api/${functionName}/add`, data);
export const showAPI = (functionName, id) => axiosInstance.get(`/api/${functionName}/get/${id}`);
export const deleteAPI = (functionName, id) => axiosInstance.delete(`/api/${functionName}/delete/${id}`);
export const searchAPI = (functionName, keyword) =>
    axiosInstance.get(`/api/${functionName}/search`, { params: { keyword } });
export const editAPIWithFile = (functionName, id, formData) =>
    axiosInstance.put(`/api/${functionName}/update/${id}`, formData);
export const listProducts = (url) => axiosInstance.get(url);