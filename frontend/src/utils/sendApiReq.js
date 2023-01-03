import axios from "axios";
import jsCookie from "js-cookie";
import { root } from './endPoints';

export const cookies = jsCookie;

const requestIntercepter = (instance, isAuthendicated, headers) => {
  instance.interceptors.request.use(
    function (config) {
      if (isAuthendicated) {
        config.headers = {
          Authorization: "Bearer " + cookies.get("NPCI-token"),
          ...headers
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  )
}

const responseIntercepter = instance => {
  instance.interceptors.response.use(
    res => res.data,
    error => {
      const err = new Error(error?.message)
      err.status = error?.response?.status
      err.message = error?.response?.data?.message
      throw err
    }
  )
}

const sendApiReq = ({ isAuthendicated = true, headers = {}, ...others }) => {
  const instances = axios.create({
    baseURL: root.baseUrl,
  })
  requestIntercepter(instances, isAuthendicated, headers)
  responseIntercepter(instances)
  return instances({ ...others })
}

export default sendApiReq;
