import React from 'react'
import { Button } from 'antd'
import { Link, LinkProps } from 'react-router-dom'
import { ButtonProps } from 'antd/es/button'

export interface LinkButtonProps extends ButtonProps {
  to: LinkProps['to']
  replace?: LinkProps['replace']
}

export class LinkButton extends React.Component<LinkButtonProps> {
  render() {
    const { to, replace, target, ...btnProps } = this.props
    return (
      <Link to={to} replace={replace} target={target}>
        <Button {...btnProps} />
      </Link>
    )
  }
} // class LinkButton end
