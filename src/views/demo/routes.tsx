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
]

export default routes
