import React, { PureComponent } from 'react'
import Radius from '../../atoms/radius/radius'
import { quakeShades } from '../../constants/colors'


class QuakeCircle extends PureComponent {
  
  onMouseOut = () => {
    const { onQuakeHover, id } = this.props
    onQuakeHover()
  }

  onMouseOver = () => {
    const { onQuakeHover, id, center, properties } = this.props
    onQuakeHover({ id, center, properties })
  }

  render() {
    const { onClick, isSelected, properties, ...rest } = this.props
    const color = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]
    return (
      <Radius {...rest}
        onClick={onClick}
        color={color} 
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
      />
    )
  }
}

export { QuakeCircle }