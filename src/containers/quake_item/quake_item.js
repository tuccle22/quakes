import React, { PureComponent, Fragment } from 'react'
import { ListGroupItem, Badge } from 'reactstrap';
import { quakeShades, textColor } from '../../constants/colors'

import './quake-item.css'

class QuakeItem extends PureComponent {
  
  onMouseOut = () => this.props.onMouseOut()

  onMouseOver = () => {
    const { isHovered, onMouseOver, id, properties, center } = this.props
    const quake = { id, properties, center }
    onMouseOver({isHovered, quake})
  }

  onClick = () => {
    const { onClick, id, properties, center } = this.props
    onClick({id, properties, center })
  }
  
  render() {

    const { onClick, properties, isHovered, onMouseOut, onMouseOver } = this.props
    const [City, Country] = properties.place.split(" ").slice(-2)

    // some magnitudes can be less than 0...who knew?
    const bgColor = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]
    const txtColor = textColor(bgColor)
    return (
      <ListGroupItem onClick={onClick}
        onMouseOver={this.onMouseOver} 
        onMouseOut={this.onMouseOut}
        className="justify-content-between"
        style={{backgroundColor: isHovered ? bgColor : 'inherit'}}>
        <Badge style={{ backgroundColor: bgColor, color: txtColor }}>
          MAG {properties.mag.toFixed(2)}
        </Badge> &nbsp;
        {City} {Country}
      </ListGroupItem>
    )
  }
}

export { QuakeItem }