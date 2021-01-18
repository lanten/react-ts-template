import axios, { AxiosRequestConfig } from 'axios'
import { errorAction } from './handle-response'

// axios 跨域请求携带 cookie
axios.defaults.withCredentials = true

console.log(process.env.API_GATEWAY)

const DEFAULT_CONFIG = {
  method: 'POST',
  baseUrl: process.env.API_GATEWAY,
  timeout: 30000,
  loading: false,
  errorType: 'toast',
  checkStatus: true,
  errorAction: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 默认传递的参数
const DEFAULT_PARAMS = {}

/**
 * 发起一个请求
 * @param service
 * @param params
 * @param optionsSource
 */
export async function request(path: string, params?: RequestParams, optionsSource?: RequestOptions) {
  const options: RequestOptions = Object.assign({}, DEFAULT_CONFIG, optionsSource)
  const { method, baseUrl, headers, responseType, checkStatus, formData, errorAction: toErrorAction } = options
  const sendData: AxiosRequestConfig = {
    url: `${baseUrl}${path}`,
    method,
    headers,
    responseType,
  }

  const paramsData = Object.assign({}, DEFAULT_PARAMS, params)
  if (method === 'GET') {
    const paramsStr = $tools.toSearch(paramsData)
    sendData.url = sendData.url + paramsStr
  } else if (formData) {
    const formData = new FormData()
    Object.keys(paramsData).forEach((key) => {
      formData.append(key, paramsData[key])
    })
    sendData.data = formData
  } else {
    sendData.data = paramsData
  }

  return axios(sendData)
    .then((res) => {
      const resH = res.data

      if (!checkStatus || resH.status) {
        return resH
      } else {
        return Promise.reject(resH)
      }
    })
    .catch((err: any) => {
      console.error({ sendData, err })
      if (toErrorAction) errorAction(err, sendData, options)
      return Promise.reject({ ...err, path, sendData, resData: err })
    })
}

declare global {
  /** 网络请求参数 */
  type RequestParams = AnyObj

  /** 网络请求返回值 */
  interface RequestRes {
    /** 状态码,成功返回 200 */
    code: number
    /** 错误消息 */
    message: string
    /** 请求是否成功 */
    status: boolean
    /** 返回数据 */
    data: any
  }

  /** 请求选项 */
  interface RequestOptions {
    /** 请求类型: [POST | GET] 默认: POST */
    method?: 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH'
    /** 基本 url, 没有特殊需求无需传递 */
    baseUrl?: string
    /** 使用 formData 传递参数 */
    formData?: boolean
    /** 返回错误时是否执行 errorAction 默认: true */
    errorAction?: boolean
    /** 超时时间,单位: ms */
    timeout?: number
    /** 请求过程中是否显示 Loading */
    loading?: boolean
    /** 发生错误时提示框类型: [toast | modal] 默认: toast */
    errorType?: string | boolean
    /** 自定义请求头 */
    headers?: Headers
    /** 类型动态设置 */
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | undefined
    /** 是否校验请求状态 */
    checkStatus?: boolean
  }
}
