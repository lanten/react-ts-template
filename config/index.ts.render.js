module.exports = (config) => {
  const { CLI_PACKAGE_NAME, USE_REDUX, USE_CENTRALIZED_API, USE_GLOBAL_TOOLS } = config

  const hanProvide = USE_REDUX || USE_CENTRALIZED_API || USE_GLOBAL_TOOLS

  const content = [
    `import path from 'path'`,
    `import { ReactTsConfigPartial } from '${CLI_PACKAGE_NAME}'`,
    `import { env, publicPath, COMMON_ENV } from './env.config'`,
    `import { afterWebpackConfig } from './webpack.config'`,
    ``,
    `const rootPath = process.cwd()`,
    ``,
    `const config: ReactTsConfigPartial = {`,
    `  projectName: COMMON_ENV.PROJECT_NAME,`,
    `  projectTitle: COMMON_ENV.PROJECT_TITLE,`,
    `  host: 'localhost',`,
    `  port: 18081,`,
    `  htmlTemplate: path.resolve(rootPath, 'src/index.html'),`,
    `  devServerOptions: {`,
    `    disableHostCheck: true,`,
    `    publicPath,`,
    `  },`,
    ``,
    `  entry: {`,
    `    app: path.resolve(rootPath, 'src/index.tsx'),`,
    `  },`,
    ``,

    hanProvide && [
      `  provide: {`,
      USE_REDUX && `    $store: path.resolve(rootPath, 'src/store'),`,
      USE_CENTRALIZED_API && `    $api: path.resolve(rootPath, 'src/api'),`,
      USE_GLOBAL_TOOLS && `    $tools: path.resolve(rootPath, 'src/tools'),`,
      `  },`,
      ``,
    ],
    `  COMMON_ENV,`,
    ``,
    `  env,`,
    `  afterWebpackConfig,`,
    `}`,
    ``,
    `export default config`,
    ``,
  ]

  return {
    fileName: 'index.ts',
    ignore: false,
    content,
  }
}
