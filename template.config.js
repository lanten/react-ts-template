module.exports = (config) => {
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

  if (!config.USE_CENTRALIZED_API) {
    ignore.push('types/api.d.ts', 'src/api', 'src/api/**/*')
  }

  if (!config.USE_GLOBAL_TOOLS) {
    ignore.push('types/tools.d.ts', 'src/tools', 'src/tools/**/*')
  }

  if (!config.USE_REDUX) {
    ignore.push('types/store.d.ts', 'src/store', 'src/store/**/*')
  }

  return {
    includes,
    ignore,
  }
}
