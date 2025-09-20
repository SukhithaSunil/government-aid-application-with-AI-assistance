import axiosInstance from '../network/axiosInstance'
import {tryCatchWrapper} from '../util'

const useFetch = (
  url,
  method = 'get',
  onStart = () => {},
  onSuccess = () => {},
  onError = () => {},
  needsAuth = false
) => {
  const fetchData = async (payload = null) => {
    onStart()
    const response = await axiosInstance.request({
      url,
      method,
      data: payload,
      needsAuth,
    })
    const data = await response.data
    onSuccess(data)
  }
  const execute = async (data) => {
    await tryCatchWrapper(
      () => fetchData(data),
      (error) => {
        onError(error)
      }
    )
  }
  return {execute}
}

export default useFetch
