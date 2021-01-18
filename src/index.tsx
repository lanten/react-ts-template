import React from 'react'
import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'

import App from './app'
import '@/styles/index.less'

renderApp()

function renderApp() {
  reactDom.render(
    <Provider store={store}>
      <App routes={$tools.routes} />
    </Provider>,
    document.getElementById('app')
  )
}
