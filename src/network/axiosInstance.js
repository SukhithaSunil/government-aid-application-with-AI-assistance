import axios from 'axios'
import {ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS} from '../util/constants'

const axiosInstance = axios.create({
  timeout: 10000,
})
const apiKey = process.env.APP_OPEN_API_KEY

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.needsAuth) {
      config.headers['Authorization'] = `Bearer ${apiKey}`
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === ERROR_CODES.TIMEOUT) {
      error.customMessage = ERROR_MESSAGES.TIMEOUT
    }

    if (error.response) {
      const {status} = error.response
      if (status === HTTP_STATUS.UNAUTHORIZED) {
        error.customMessage = ERROR_MESSAGES.AUTH_FAILED
      } else if (status >= HTTP_STATUS.SERVER_ERROR_START) {
        error.customMessage = ERROR_MESSAGES.SERVER_ERROR
      } else {
        error.customMessage = ERROR_MESSAGES.GENERIC_ERROR
      }
    } else if (!error.response) {
      error.customMessage = ERROR_MESSAGES.NETWORK_ERROR
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
