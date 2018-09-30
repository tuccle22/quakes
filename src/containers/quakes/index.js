import React, { PureComponent } from 'react'

class Quakes extends PureComponent {

  render() {
    console.log('QUAKES', this.props)
    const { children, ...rest} = this.props
    return (
      children(rest)
    )
  }
}

export default Quakes