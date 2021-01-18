import { EnvOptions } from 'ts-rc-cli'

export interface EnvVariables {
  /** 项目名称 */
  PROJECT_NAME?: string
  /** 项目标题 */
  PROJECT_TITLE?: string
  /** API 网关 */
  API_GATEWAY?: string
}

export const envNames = <const>['mock', 'dev', 'prod']

export type EnvNames = typeof envNames[number]

/** 公共环境变量 */
export const COMMON_ENV: EnvVariables = {}

export const env: { [key in EnvNames]: EnvOptions<EnvVariables> } = {
  mock: {
    publicPath: '/',
    variables: {
      API_GATEWAY: '//yapi.baidu.com/mock/17714',
    },
  },

  dev: {
    publicPath: '/',
    variables: {
      API_GATEWAY: '//yapi.baidu.com/mock/17714',
    },
  },

  prod: {
    publicPath: '/',
    variables: {
      API_GATEWAY: '//yapi.baidu.com/mock/17714',
    },
  },
}
