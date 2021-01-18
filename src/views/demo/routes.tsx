const routes: RouteConfig[] = [
  {
    name: 'home',
    path: '/',
    exact: true,
    redirectTo: '/demo',
  },
  {
    name: 'demo',
    path: '/demo',
    exact: true,
    asyncImport: () => import(/* webpackChunkName:"demo" */ './demo'),
  },
  {
    name: 'demo-2',
    path: '/demo-2',
    exact: true,
    asyncImport: () => import(/* webpackChunkName:"demo-2" */ './demo-2'),
  },
]

// 5.0.1

export default routes
