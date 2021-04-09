module.exports = (config) => {
  const { USE_AXIOS, USE_REDUX, USE_LESS } = config

  const includes = [
    '.vscode',
    'config',
    'src',
    'typings',
    'tsconfig.json',
    '.gitignore',
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
