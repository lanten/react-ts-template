import { message as Message, Modal } from 'antd'

/**
 * 各种错误处理
 * @param err
 * @param sendData
 * @param options
 */
export function errorAction(err: any, sendData: any, options: RequestOptions) {
  const { code, message } = err
  const { errorType } = options

  switch (code) {
    case 100001:
      // do something...
      break

    case 100002:
      // do something...
      break

    default:
      if (errorType === 'toast') {
        Message.error(message)
      } else if (errorType === 'modal') {
        Modal.error({ title: '提示', content: message })
      }
      break
  }
}
