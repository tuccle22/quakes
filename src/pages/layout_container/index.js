import React, { PureComponent } from 'react'

import './index.css'

class LayoutContainer extends PureComponent {
  render() {
    return (
      <div className='layout-container'>
        {this.props.children}
      </div>
    )
  }
}
export default LayoutContainer
