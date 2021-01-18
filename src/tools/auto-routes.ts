// 自动导入 views 文件夹下所有的 routes.tsx? 以生成路由
const views = require.context('@/views', true, /routes\.tsx?$/)

/** 以 name 为 key 的路由 Map */
export const routes: Map<string, RouteConfig> = new Map()
/** 以 path 为 key 的路由 Map */
export const routesPathKeyMap: Map<string, RouteConfig> = new Map()
/** 以 name 为 Key 的路由 path Map */
export const routesPathMap: Map<string, string> = new Map()

views.keys().forEach((path) => {
  const conf: RouteConfig | RouteConfig[] = views(path).default
  if (Array.isArray(conf)) {
    conf.forEach((v) => addRouteConfig(v))
  } else {
    addRouteConfig(conf)
  }
})

/**
 * 添加一个路由
 * @param conf
 */
export function addRouteConfig(conf: RouteConfig) {
  routes.set(conf.name, conf)
  if (conf.path) {
    routesPathMap.set(conf.name, conf.path)
    routesPathKeyMap.set(conf.path, conf)
  }
}
