module.exports = ({ USE_ANTD }) => {
  let antdSnippet = ['        <AppRouter routes={routes} />']

  if (USE_ANTD) {
    antdSnippet = [
      `        <ConfigProvider locale={zhCN}>`,
      `          <AppRouter routes={routes} />`,
      `        </ConfigProvider>`,
    ]
  }
  return [
    `import React from 'react'`,
    USE_ANTD && `import { ConfigProvider } from 'antd'`,
    USE_ANTD && `import zhCN from 'antd/es/locale/zh_CN'`,
    ``,
    `import { AppRouter } from '@/components'`,
    ``,
    `interface AppProps {`,
    `  routes: Map<string, RouteConfig>`,
    `}`,
    ``,
    `export default class App extends React.Component<AppProps> {`,
    `  render(): JSX.Element {`,
    `    const { routes } = this.props`,
    `    return (`,
    `      <div className="app-content">`,
    ...antdSnippet,
    `      </div>`,
    `    )`,
    `  }`,
    `}`,
    ``,
  ]
}
