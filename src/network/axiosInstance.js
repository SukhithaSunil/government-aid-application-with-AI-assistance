import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 10000,
})
const apiKey = process.env.APP_OPEN_API_KEY

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.needsAuth) {
      config.headers['Authorization'] = `Bearer ${apiKey}`;
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => 
    response
  ,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.customMessage = 'Request timed out. Please try again.'
    }

    if (error.response) {
      const {status} = error.response
      if (status === 401) {
        error.customMessage = 'Authentication failed.'
      } else if (status >= 500) {
        error.customMessage = 'Server error. Please try again later.'
      } else {
        error.customMessage = 'Something went wrong.'
      }
    } else if (!error.response) {
      error.customMessage = 'Network error. Please check your connection.'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
