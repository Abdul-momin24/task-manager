import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    timeout:10000,
    withCredentials:true
})



axiosInstance.interceptors.response.use(
    response => response, // Pass through successful responses
  
    error => {
      const { response } = error;
  
      if (response) {
        const { status, data } = response;
  
        const messages = {
          400: "Bad Request",
          401: "Unauthorized",
          403: "Forbidden",
          404: "Not Found",
          500: "Internal Server Error"
          // Add more status codes as needed
        };
  
        const message = messages[status] || "An error occurred";
        console.error(`${message}:`, data);
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;