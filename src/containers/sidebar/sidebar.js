import React, { PureComponent } from 'react'

import './sidebar.css'

class Sidebar extends PureComponent {
  render() {
    const { header } = this.props
    return (
      <div className='sidebar-container'>
        {header}
        {this.props.children(this.props)}
      </div>
    )
  }
}
export default Sidebar
