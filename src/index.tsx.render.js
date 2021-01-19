module.exports = ({ USE_REDUX, USE_LESS, USE_SASS }) => {
  styleExt = 'css'

  if (USE_LESS) {
    styleExt = 'less'
  } else if (USE_SASS) {
    styleExt = 'sass'
  }

  let reduxSnippets = [`  reactDom.render(<App routes={$tools.routes} />, document.getElementById('app'))`]

  if (USE_REDUX) {
    reduxSnippets = [
      `  reactDom.render(`,
      `    <Provider store={store}>`,
      `      <App routes={$tools.routes} />`,
      `    </Provider>,`,
      `    document.getElementById('app')`,
      `  )`,
    ]
  }
  return [
    `import React from 'react'`,
    `import reactDom from 'react-dom'`,
    USE_REDUX && `import { Provider } from 'react-redux'`,
    USE_REDUX && `import { store } from '@/store'`,
    ``,
    `import App from './app'`,
    `import '@/styles/index.${styleExt}'`,
    ``,
    `renderApp()`,
    ``,
    `function renderApp() {`,
    ...reduxSnippets,
    `}`,
    ``,
  ]
}
