import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { quakeShades } from '../../constants/colors';
import './mag-bar.css'

class MagBar extends PureComponent {
  render() {
    const { mag } = this.props
    const bgColor = quakeShades[mag > 0 ? Math.round(mag) : 0] 
    const style = { background: `linear-gradient(0deg, ${bgColor} ${mag * 10}%, #FFFFFF 50%)` }

    return (
      <div style={style} className='mag-bar' />
    )
  }
}

MagBar.propTypes = {
  mag: PropTypes.number
}

export { MagBar }