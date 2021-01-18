import React from 'react'
import { Button } from 'antd'

import { withBreadcrumb } from '@/components'

interface DemoProps extends PageProps, StoreProps {
  id?: number
}

declare interface DemoState {
  count: number
  resData: unknown
  loading: boolean
}

@withBreadcrumb
export default class Demo extends React.Component<DemoProps, DemoState> {
  static defaultProps = {
    id: 123,
  }

  state: DemoState = {
    count: 1,
    resData: {},
    loading: false,
  }

  constructor(props: DemoProps) {
    super(props)
  }

  componentDidMount() {
    console.log(this)
    console.log(this.props.history.location.state)
    this.queryData()
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <div className="panel">
          <p className="title-block">state count : {count}</p>

          <div className="mt-16">
            <Button
              type="primary"
              onClick={() => {
                this.setState({ count: count + 1 })
              }}
            >
              add
            </Button>
          </div>
        </div>
      </div>
    )
  }

  queryData() {}
} // class Demo end
