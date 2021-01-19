import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { withStore } from '@/store'
import { asyncImport as AsyncImport } from '../async-import'

interface AppRouterProps extends DefaultProps {
  routes: Map<string, RouteConfig>
}

interface DefaultProps extends StoreProps {
  userPermissions: StoreStates['userPermissions']
}

interface AppRouteQuery {
  // query...
}

@withStore(['userPermissions'])
export class AppRouter extends React.Component<AppRouterProps, unknown> {
  static defaultProps: DefaultProps = {
    dispatch: () => void 0,
    userPermissions: [],
  }

  noMatch?: JSX.Element
  routeElements: JSX.Element[]

  constructor(props: AppRouterProps) {
    super(props)

    this.routeElements = this.createRoutes()
  }

  createRoutes() {
    const { routes } = this.props
    const res: JSX.Element[] = []

    routes.forEach((conf, index) => {
      const routeEl = this.creatRoute(conf, `key-${index}`)
      if (conf.path) {
        res.push(routeEl)
      } else {
        this.noMatch = routeEl
      }
    })

    return res
  }

  render() {
    return (
      <Router>
        <Switch>
          {this.routeElements}
          {this.noMatch ?? null}
        </Switch>
      </Router>
    )
  }

  creatRoute = (routeConfig: RouteConfig, key: string) => {
    const { name, path, exact = true, asyncImport, redirectTo, ...params } = routeConfig

    const routeProps: any = {
      key: name || key,
      path,
      exact,
    }

    const nextProps = {
      query: {} as AnyObj,
      ...params,
      name,
    }

    if (redirectTo) {
      routeProps.render = (props: any) => <Redirect to={{ pathname: redirectTo }} {...props} {...nextProps} />
    } else if (asyncImport) {
      const Comp = AsyncImport(asyncImport, this.beforeRouter)

      routeProps.render = (props: RouteComponentProps) => {
        nextProps.query = $tools.getQuery(props.location.search)
        return <Comp {...props} {...nextProps} />
      }
    } else {
      throw new Error(`Route config error! \n ${JSON.stringify(routeConfig, undefined, 2)}`)
    }

    return <Route {...routeProps} />
  }

  /**
   * 跳转到错误页
   * @param props
   * @param nextProps
   */
  toErrorPage(
    props: PageProps<unknown, AppRouteQuery>,
    nextProps: PageProps<unknown, AppRouteQuery>,
    code: ErrorPageQuery['code']
  ) {
    const nextQuery: ErrorPageQuery = {
      name: props.name,
      code: code,
      from: props.location.pathname,
    }
    nextProps.location.search = $tools.toSearch(nextQuery)
    nextProps.location.pathname = '/error'

    props.history.replace(nextProps.location)
    return false
  }

  /**
   * 路由钩子,页面切入时触发
   * @param props
   * @param next 继续渲染
   * @this AppRouter
   */
  beforeRouter: RouterHook = (props: PageProps<unknown, AppRouteQuery>) => {
    const nextProps = Object.assign({}, props)
    const { userPermissions } = this.props

    if (props.name === 'error-page') return true

    if (props.permissionsCode) {
      if (userPermissions.includes(props.permissionsCode)) return true

      this.toErrorPage(props, nextProps, 403)
      return false
    }

    return true
  }
}
