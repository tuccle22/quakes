import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { quakeShades } from '../../constants/colors';
import './index.css'

const MagBar = ({ mag, style, ...events }) => {
    const bgColor = quakeShades[mag > 0 ? Math.round(mag) : 0]
    const background = { background: `linear-gradient(0deg, ${bgColor} ${mag * 10}%, #FFFFFF 50%)` }
    return (
      <div {...events}
        style={{...background, ...style}} 
        className='mag-bar'
      />
    )
}

MagBar.propTypes = {
  mag: PropTypes.number
}

export { MagBar }