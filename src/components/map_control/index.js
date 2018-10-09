import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { MAP } from 'react-google-maps/lib/constants'

class MapControl extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div')
    this.map.controls[this.props.position].push(this.controlDiv)
  }
  
  static contextTypes = { [MAP]: PropTypes.object }

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex)
  }

  render() {
    const { children, style, ...events } = this.props
    return createPortal(
      <div {...events} style={style} className='map-control'>
        {children}
      </div>,
      this.controlDiv
    )
  }
}

export default MapControl