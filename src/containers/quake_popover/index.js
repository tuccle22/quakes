import React, { PureComponent, Fragment } from 'react'
import { InfoWindow } from 'react-google-maps'
import { Container, Row, Col } from 'reactstrap' 

import { MagBar } from '../../atoms/mag_bar'
import { quakeShades, textColor } from '../../constants/colors'

// import './index.css'

class QuakePopover extends PureComponent {

  render() {

    const { center, properties, isHovered, onCloseClick } = this.props
    const [ City, Country ] = properties.place.split(" ").slice(-2)

    // some magnitudes can be less than 0...who knew?
    const bgColor = quakeShades[properties.mag > 0 ? Math.round(properties.mag) : 0]
    return (
      <InfoWindow
        position={{ lat: center.lat, lng: center.lng }}
        onCloseClick={onCloseClick}>
        <Container fluid>
          <Row className='row-eq-height'>
            <Col sm={2}>
              <MagBar mag={properties.mag} />
            </Col>
            <Col sm={10}>
              <pre>
                {JSON.stringify(properties, null, 2)}
              </pre>
            </Col>
          </Row>
        </Container>
      </InfoWindow>
    )
  }
}

export { QuakePopover }