import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Circle } from 'react-google-maps'

class Radius extends PureComponent {
  render() {
    const { center, radius, onMouseOver, onMouseOut, color, onClick } = this.props
    return (
      <Circle
        center={center}
        defaultRadius={radius}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        defaultOptions={{
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.2,
        }}
      />
    )
  }
}
Radius.propTypes = {
  center: PropTypes.objectOf(PropTypes.number),
  radius: PropTypes.number.isRequired,
};
export default Radius
