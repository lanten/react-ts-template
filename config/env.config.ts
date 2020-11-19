import { EnvOptions } from '<slot>CLI_PACKAGE_NAME</slot>'

export interface EnvVariables {
  /** 项目名称 */
  PROJECT_NAME: string
  /** 项目标题 */
  PROJECT_TITLE: string

  /** API 接口地址 */
  API_BASE?: string
}

export const publicPath = '/<slot>PROJECT_NAME</slot>/'

/** 公共环境变量 */
export const COMMON_ENV: EnvVariables = {
  PROJECT_NAME: '<slot>PROJECT_NAME</slot>',
  PROJECT_TITLE: '<slot>PROJECT_TITLE</slot>',
}

/** 环境变量配置 */
export const env: { [key: string]: EnvOptions<EnvVariables> } = {
  mock: {
    publicPath,
    variables: {
      API_BASE: '//mock.xxx.com/mock',
    },
  },
  dev: {
    publicPath,
    variables: {
      API_BASE: '//dev.xxx.com',
    },
  },
  prod: {
    publicPath,
    variables: {
      API_BASE: '//prod.xxx.com',
    },
  },
}
