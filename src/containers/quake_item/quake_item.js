import React, { PureComponent } from 'react'
import { Container, Row, Col, ListGroupItem, Badge } from 'reactstrap'
import classNames from 'classnames'
import { quakeShades, textColor } from '../../constants/colors'
import { MagBar } from '../../atoms/mag_bar'

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
    const { onClick, properties, isHovered } = this.props
    const [ City, Country ] = properties.place.split(" ").slice(-2)

    // some magnitudes can be less than 0...who knew?
    const bgColor = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]
    const txtColor = textColor(bgColor)
    const cssClasses = classNames({'quake-item': true, 'quake-item-hover': isHovered})
    return (
      <Container onClick={onClick}
        onMouseOver={this.onMouseOver} 
        onMouseOut={this.onMouseOut}
        className={cssClasses}
        style={{backgroundColor: isHovered ? bgColor : 'inherit'}}>
        <Row>
          <Col md={1}>
            <MagBar mag={properties.mag} />
          </Col>
          <Col md={11}>
            <Badge style={{ backgroundColor: bgColor, color: txtColor }}>
              MAG {properties.mag.toFixed(2)}
            </Badge> &nbsp;
            {City} {Country}
          </Col>
        </Row>
      </Container>
    )
  }
}

export { QuakeItem }