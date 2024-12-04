import axios from "axios";
import {destroyCookie, parseCookies} from "nookies";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "https://ecommerceweb-latest.onrender.com",
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

        const excludeEndpoints = ["/login", "/register", "/forgot-password", "logout"];
        if (
            token &&
            !excludeEndpoints.some((endpoint) => config.url.includes(endpoint))
        ) {
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
                alert("Hết phiên đăng nhập, mời bạn đăng nhập lại");
                console.warn("Unauthorized! Redirecting to login...");

                // Clear the auth token cookie and localstorage
                destroyCookie(null, "authToken", {path: "/"});
                localStorage.clear();

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
export const request = (method, url, data = null, customHeader = {}) => {
    const options = {
        method,
        url,
        headers: customHeader,
    };

    if (method.toLowerCase() === "get") {
        options.params = data;
    } else {
        options.data = data;
    }

    return axiosInstance(options);
};