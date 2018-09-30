import React, { Component } from 'react'

import './map_button.css'

class MapButton extends Component {
  render() {
    const { icon, children, ...events } = this.props
    return (
      <div {...events} className='map_button'>
        <span>{children}</span>
      </div>
    )
  }
}

export default MapButton