module.exports = (config) => {
  const { USE_AXIOS, USE_GLOBAL_TOOLS, USE_REDUX } = config

  const includes = [
    '.vscode',
    'config',
    'src',
    'types',
    'tsconfig.json',
    '.gitignore',
    'README.md',
    'package.json',
    '.eslintignore',
    '.eslintrc.js',
    '.prettierrc',
    '.browserslistrc',
    '.browserslistrc',
  ]

  const ignore = ['node_modules', 'template.config.json']

  if (!USE_AXIOS) {
    ignore.push('types/api.d.ts', 'src/api', 'src/api/**/*')
  }

  if (!USE_GLOBAL_TOOLS) {
    ignore.push('types/tools.d.ts', 'src/tools', 'src/tools/**/*')
  }

  if (!USE_REDUX) {
    ignore.push('types/store.d.ts', 'src/store', 'src/store/**/*')
  }

  return {
    includes,
    ignore,
  }
}
