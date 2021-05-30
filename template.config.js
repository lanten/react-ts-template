/** 必填项验证 */
function requiredValidate(input) {
  if ([undefined, null, ''].includes(input)) {
    return '你必须必填写!'
  } else {
    return true
  }
}

/** 模板变量配置 */
module.exports.inquirerConfig = (CREATE_PROJECT_NAME) => {
  return [
    {
      type: 'input',
      name: 'PROJECT_NAME',
      message: '项目名称',
      default: CREATE_PROJECT_NAME,
      validate: requiredValidate,
    },
    {
      type: 'input',
      name: 'PROJECT_TITLE',
      message: '项目标题',
      default: (e) => e.PROJECT_NAME,
      validate: requiredValidate,
    },
    {
      type: 'checkbox',
      name: 'preInstalls',
      message: '选择需要预装的功能',
      default: ['USE_REDUX', 'USE_AXIOS', 'USE_GLOBAL_TOOLS', 'USE_REACT_ROUTER', 'USE_ANTD'],
      choices: [
        { value: 'USE_REDUX', name: '集成 Redux ($store)' },
        { value: 'USE_AXIOS', name: '是否启用 Axios ($api)' },
        // { value: 'USE_GLOBAL_TOOLS', name: '启用全局工具模块 ($tools)' },
        // { value: 'USE_REACT_ROUTER', name: '集成 react-router 及相关路由模块' },
        { value: 'USE_ANTD', name: '集成 Ant-Design 及定制主体配置 (将强制启用 less)' },
      ],
    },
    {
      type: 'list',
      name: 'styleHandler',
      message: '选择 css 预处理器',
      default: 'less',
      choices: ['less', 'sass', 'none'],
      when: (e) => !e.preInstalls.includes('USE_ANTD'),
    },
  ]
}

/** inquirer 选择结果后处理 */
module.exports.inquirerHandler = (res) => {
  const nextConfig = {}

  if (res.preInstalls.includes('USE_ANTD')) {
    res.styleHandler = 'less'
  }

  res.preInstalls.forEach((v) => {
    nextConfig[v] = 1
  })

  switch (res.styleHandler) {
    case 'less':
      nextConfig.USE_LESS = 1
      break

    case 'scss':
      nextConfig.USE_SCSS = 1
      break
  }

  return nextConfig
}

/** 模板生成相关配置 */
module.exports.default = (config) => {
  const { USE_AXIOS, USE_REDUX, USE_LESS } = config

  console.log({ config })

  const includes = [
    '.vscode',
    'config',
    'src',
    'typings',
    'tsconfig.json',
    '.gitignore',
    '.gitattributes',
    'README.md',
    'package.json.render.js',
    '.eslintignore',
    '.eslintrc.js',
    '.prettierrc',
    '.browserslistrc',
  ]

  const ignore = ['node_modules', 'template.config.json', 'config/tsconfig.json']

  if (!USE_AXIOS) {
    ignore.push('types/api.d.ts', 'src/api', 'src/api/**/*')
  }

  if (!USE_REDUX) {
    ignore.push('types/store.d.ts', 'src/store', 'src/store/**/*')
  }

  if (!USE_LESS) {
    ignore.push(
      'src/styles',
      'src/styles/**/*',
      'src/views/common',
      'src/views/common/**/*',
      'src/assets/images',
      'src/assets/images/**/*'
    )
  }

  return {
    includes,
    ignore,
  }
}
