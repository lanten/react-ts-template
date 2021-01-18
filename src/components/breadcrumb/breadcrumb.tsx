import React from 'react'
import { Breadcrumb } from 'antd'
import { RouteComponentProps, Link } from 'react-router-dom'

import './breadcrumb.less'

interface Props {
  match: RouteComponentProps['match']
  title?: string
}

const baseTitle: string = document.title

export default class AppBreadcrumb extends React.Component<Props> {
  shouldComponentUpdate() {
    // 此组件无视状态刷新
    return false
  }

  componentDidMount() {
    const { match, title } = this.props

    if (title) {
      document.title = `${title} - ${baseTitle}`
    } else {
      const routeInfo = $tools.routesPathKeyMap.get(match.path)
      if (routeInfo && routeInfo.title) {
        document.title = `${routeInfo.title} - ${baseTitle}`
      }
    }
  }

  renderBreadcrumbItem() {
    const { path } = this.props.match
    const pathSnippets = path.split(/\/(?=[^:])/).filter((x) => x)

    return pathSnippets.map((name, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      const route = $tools.routesPathKeyMap.get(url)
      if (!route || !route.title || route.title === '/') return null
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{route.title}</Link>
        </Breadcrumb.Item>
      )
    })
  }

  render() {
    return (
      <div className="rc-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">{process.env.PROJECT_TITLE}</Link>
          </Breadcrumb.Item>
          {this.renderBreadcrumbItem()}
        </Breadcrumb>
      </div>
    )
  }
} // class Breadcrumb end
