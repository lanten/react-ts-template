import { EnvVariables } from '../config/env.config'

declare global {
  /** 使用此类型替代 any object */
  interface AnyObj {
    [key: string]: any
  }

  /** window 下的全局变量 */
  interface Window {}

  namespace NodeJS {
    /** 环境变量 */
    interface ProcessEnv extends EnvVariables {}
  }
}
