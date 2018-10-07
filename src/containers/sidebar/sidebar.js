import React, { PureComponent } from 'react'

import './sidebar.css'

class Sidebar extends PureComponent {
  render() {
    return (
      <div className='sidebar-container'>
        {this.props.children}
      </div>
    )
  }
}
export default Sidebar
