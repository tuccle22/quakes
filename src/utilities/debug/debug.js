import React, { PureComponent } from 'react'

class DEBUG extends PureComponent {
  render() {
    const { children, ...rest } = this.props
    return (
      children(...rest)
    )
  }
}

export { DEBUG }