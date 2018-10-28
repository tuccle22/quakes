import React, { PureComponent } from 'react'
import moment from 'moment'
import { InfoWindow } from 'react-google-maps'
import { Container, Row, Col, Badge } from 'reactstrap' 

import { MagBar } from '../../atoms/mag_bar'
import { quakeShades, textColor } from '../../constants/colors'
import { getPercievedRadius } from '../../utilities/map_utils'

// import './index.css'

class QuakePopover extends PureComponent {

  render() {

    const { center, properties, isHovered, onCloseClick } = this.props
    const [ City, Country ] = properties.place.split(" ").slice(-2)
    const [ Distance, Direction, ...rest ] = properties.place.split(" ")

    // some magnitudes can be less than 0...who knew?
    const bgColor = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]
    const txtColor = textColor(bgColor)
    console.log(getPercievedRadius(properties.mag))
    console.log(center)
    const anchorCoords = window.google.maps.geometry.spherical.computeOffset(
      new window.google.maps.LatLng(center), getPercievedRadius(properties.mag), 0
    )
    console.log(anchorCoords)
    return (
      <InfoWindow defaultOptions={{ disableAutoPan: true}}
        position={{ lat: anchorCoords.lat(), lng: anchorCoords.lng() }}
        onCloseClick={onCloseClick}>
        <Container style={{minWidth: '250px'}} fluid>
          <Row className='row-eq-height'>
            <Col sm={2}>
              <MagBar mag={properties.mag} />
            </Col>
            <Col sm={10}>
              <Row style={{whiteSpace: 'nowrap'}}>
                <h6>
                  <Badge style={{ backgroundColor: bgColor, color: txtColor }}>
                    MAG {properties.mag.toFixed(2)}
                  </Badge> &nbsp;
                  {City} {Country}
                </h6>
              </Row>
              <Row>
                <Col sm={6}>
                  {Distance} {Direction}
                </Col>
                <Col sm={6}>
                  {moment(properties.time).format("LT")}
                </Col>
              </Row>
              <Row>
              </Row>
            </Col>
          </Row>
        </Container>
      </InfoWindow>
    )
  }
}

export { QuakePopover }