import React from 'react'
import { Button, Card } from 'antd'

import './error-page.less'

interface ErrorInfo {
  title: string
  img: string
  desc: string
  content: JSX.Element | string | null
}

interface Props extends PageProps<unknown, ErrorPageQuery> {}

declare global {
  interface ErrorPageQuery {
    /** 来源理由 name */
    name?: string
    /** 错误代码 */
    code?: 404 | 403 | 401
    /** 来源页 pathname */
    from?: string
  }
}

export default class ErrorPage extends React.Component<Props> {
  private ERROR_CODE_MAP: { [key: string]: ErrorInfo } = {
    404: {
      title: '对不起，页面没有找到！',
      img: require('@/assets/images/404.svg'),
      desc: 'Page Not Found',
      content: (
        <Button type="primary" onClick={() => history.go(-1)}>
          回到前一页
        </Button>
      ),
    },

    403: {
      title: '温馨提示：您没有使用该功能的权限',
      img: require('@/assets/images/403.svg'),
      desc: '请联系你的管理员!',
      content: (
        <Button type="primary" onClick={() => history.go(-1)}>
          回到前一页
        </Button>
      ),
    },
  }

  get errorInfo(): ErrorInfo {
    return this.ERROR_CODE_MAP[this.props.query.code || '404']
  }

  render() {
    return (
      <Card className="full-screen flex column center error-page">
        <div className="flex center-v">
          <img className="state-img" src={this.errorInfo.img} alt="Error 403" />
          <div>
            <h2 className="fs-32 text-title">{this.errorInfo.title}</h2>
            <p className="text-light mt-16 mb-24">{this.errorInfo.desc}</p>
            {this.errorInfo.content}
          </div>
        </div>
      </Card>
    )
  }
} // class ErrorPage end
