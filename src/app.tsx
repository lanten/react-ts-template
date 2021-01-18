import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import { AppRouter } from '@/components'

interface AppProps {
  routes: Map<string, RouteConfig>
}

export default class App extends React.Component<AppProps> {
  render(): JSX.Element {
    const { routes } = this.props
    return (
      <div className="boss-layout app-content">
        <ConfigProvider locale={zhCN}>
          <AppRouter routes={routes} />
        </ConfigProvider>
      </div>
    )
  }
}
