const routes: RouteConfig[] = [
  {
    name: 'error-page',
    title: '出错了',
    hasBreadcrumb: true,
    asyncImport: () => import(/* webpackChunkName:"error-page" */ './error-page'),
  },
]

export default routes
