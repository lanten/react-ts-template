module.exports = (config) => {
  const { CLI_PACKAGE_NAME, PROJECT_NAME, PROJECT_TITLE, USE_AXIOS, USE_GLOBAL_TOOLS } = config

  const hanProvide = USE_AXIOS || USE_GLOBAL_TOOLS

  return [
    `import path from 'path'`,
    `import { ReactTsConfigPartial } from '${CLI_PACKAGE_NAME}'`,
    `import { env, COMMON_ENV, EnvVariables } from './env.config'`,
    ``,
    `const rootPath = process.cwd()`,
    ``,
    `const projectName = '${PROJECT_NAME}'`,
    `const projectTitle = '${PROJECT_TITLE}'`,
    ``,
    `const config: ReactTsConfigPartial = {`,
    `  projectName,`,
    `  projectTitle,`,
    `  port: 18081,`,
    `  htmlTemplate: path.resolve(rootPath, 'src/index.html'),`,
    `  devServerOptions: {`,
    `    publicPath: '',`,
    `  },`,
    ``,
    `  entry: {`,
    `    app: path.resolve(rootPath, 'src/index.tsx'),`,
    `  },`,
    ``,

    hanProvide && [
      `  provide: {`,
      USE_AXIOS && `    $api: path.resolve(rootPath, 'src/api'),`,
      USE_GLOBAL_TOOLS && `    $tools: path.resolve(rootPath, 'src/tools'),`,
      `  },`,
      ``,
    ],

    `  COMMON_ENV: {`,
    `    PROJECT_NAME: projectName,`,
    `    PROJECT_TITLE: projectTitle,`,
    `    ...COMMON_ENV,`,
    `  } as EnvVariables,`,
    ``,
    `  env,`,
    `}`,
    ``,
    `export default config`,
  ]
}
