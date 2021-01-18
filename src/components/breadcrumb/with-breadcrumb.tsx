import React from 'react'
import Breadcrumb from './breadcrumb'

export default function (Component: React.ComponentClass<any>): any {
  return class extends React.Component<PageProps> {
    render() {
      return (
        <>
          <Breadcrumb match={this.props.match} title={this.props.title || ''} />
          <Component {...this.props} />
        </>
      )
    }
  }
}
