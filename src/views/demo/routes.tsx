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
    asyncImport: () => import(/* webpackChunkName:"demo" */ './demo.tsx'),
  },
]

export default routes
