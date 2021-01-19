import { RouteProps } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

/**
 * 路由配置接口
 */
declare global {
  /** 页面默认 props */
  interface PageProps<P = AnyObj, Q = AnyObj>
    extends RouteComponentProps<P>,
      RouteParamsDefault<Q>,
      RouteParams {}

  interface RouteParamsDefault<Q = AnyObj> {
    /** 由 location.search 转换来的对象 */
    query: Q
  }

  /** 自定义路由参数 */
  interface RouteParams {
    /** 页面标题 */
    title?: string
    /** 是否显示侧边菜单 */
    sideMenu?: boolean
    /** 路由的 name 将与侧边菜单的 key 对应,全局唯一 */
    name: string
    /** 需要验证权限代码 */
    permissionsCode?: string
    /** 自定义参数, 视情况而定 */
    type?: string
  }

  interface RouteConfig extends RouteProps, RouteParams {
    path?: string
    /** 异步导入组件 */
    asyncImport?: ImportComponent
    /** 重定向 */
    redirectTo?: string
    /** 默认为 true */
    exact?: boolean
  }

  type ImportComponent = () => Promise<any>

  type RouterHook = (props: PageProps, next: () => void) => boolean | void | Promise<boolean | void>
}
