module.exports = ({ USE_ANTD }) => {
  return [
    USE_ANTD && `import { message as Message, Modal } from 'antd'`,
    USE_ANTD && ``,
    `/**`,
    ` * 各种错误处理`,
    ` * @param err`,
    ` * @param sendData`,
    ` * @param options`,
    ` */`,
    `export function errorAction(err: any, sendData: any, options: RequestOptions) {`,
    `  const { code } = err`,
    ``,
    `  switch (code) {`,
    `    case 100001:`,
    `      // do something...`,
    `      break`,
    ``,
    `    case 100002:`,
    `      // do something...`,
    `      break`,
    ``,
    `    default:`,
    ...(USE_ANTD
      ? [
          `      if (errorType === 'toast') {`,
          `        Message.error(message)`,
          `      } else if (errorType === 'modal') {`,
          `        Modal.error({ title: '提示', content: message })`,
          `      }`,
        ]
      : ['      // 未集成 Antd, 请自行添加提示组件']),
    `      break`,
    `  }`,
    `}`,
    ``,
  ]
}
