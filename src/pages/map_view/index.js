import React, { PureComponent, Fragment } from 'react'
import { InfoWindow } from 'react-google-maps'
import { Container, Row, Col, ListGroup } from 'reactstrap'
import MapControl from '../../components/map_control'
import Sidebar from '../../containers/sidebar/sidebar'
import { MapState } from '../../states/map_state'
import { QuakeState } from '../../states/quake_state'
import QuakeMap from '../../containers/quake_map'
import { QuakeItem } from '../../containers/quake_item/quake_item'
import { QuakeCircle } from '../../components/quake_circle/quake_circle'
import { QuakeDetails } from '../../containers/quake_details';
import DatePicker from '../../components/date_picker/date_picker'
import { MagBar } from '../../atoms/mag_bar'
import { LATITUDE, LONGITUDE, DEPTH } from '../../apis/usgs/earthquakes'
import { QuakePopover } from '../../containers/quake_popover'

import { getPercievedRadius } from '../../utilities/map_utils';
import { StoreFunctionsById } from '../../utilities/react_utils/react_utils';
import 'material-design-icons'

const MapView = () => (
  <Container fluid className='full-height'>
    <Row noGutters>
      <Col sm={4}>
        <Container fluid className='padding-top'>
          <Row>
            <Col sm={12}>
              <QuakeState>
                {({ date, getQuakesByTime }) =>
                  <DatePicker date={date}
                    getQuakesByTime={getQuakesByTime}
                  />
                }
              </QuakeState>
            </Col>
          </Row>
        </Container>
      </Col>
      <Col sm={8}>
        <Container fluid className='padding-top'>
          <Row>
            <Col sm={12}>
              
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
    <Row noGutters className='full-height'>
      <Col sm={4}>
        <Sidebar>
          <QuakeState> 
            {({ quakesFunctions, quakes, selectedQuake, onQuakeSelect, onQuakeHover }) =>
              <Fragment>
                <MapState>
                  {({ getCirclesInViewPort, goToCircle }) =>
                  <Fragment>
                    {selectedQuake && <QuakeDetails {...selectedQuake} />}
                    <Container fluid>
                      <Row>
                        { getCirclesInViewPort(quakes).map(({id, geometry, properties}) => {
                          const [lng, lat] = geometry.coordinates
                          return (
                            <Col xl={12} key={id}>
                              <ListGroup>                           
                                <StoreFunctionsById {...quakesFunctions} id={id}>
                                  {({ [quakesFunctions.stateName]: isHovered, 
                                      [quakesFunctions.funcName]: onHover 
                                  }) =>
                                    <QuakeItem id={id}
                                      center={{lat, lng}}
                                      onClick={() => {
                                        goToCircle({ lat, lng }, getPercievedRadius(properties.mag));
                                        onQuakeSelect({ id, center: {lat, lng}, properties })
                                      }}
                                      properties={properties}
                                      isHovered={isHovered}
                                      onMouseOut={() => { onHover(); onQuakeHover() }}
                                      onMouseOver={() => { onHover(); onQuakeHover({ center: { lat, lng }, id, properties}) }}
                                />
                              }
                                </StoreFunctionsById>
                              </ListGroup>
                            </Col>
                          )                              
                        })}
                      </Row>
                    </Container>
                  </Fragment>
                  }
                </MapState> 
              </Fragment>
            }
          </QuakeState>
        </Sidebar>
      </Col>
      <Col sm={8}>
        <MapState> 
        {({ getCirclesInViewPort, goToCircle, goToLastBounds, ...mapProps }) => 
          <QuakeState> 
          {({init, quakes, quakesFunctions, onQuakeSelect, onQuakeHover, selectedQuake, hoverQuake }) => 
            <QuakeMap {...mapProps}
              onMounted={init}
              defaultCenter={{lat: 49.38, lng: -66.94}}
              defaultZoom={3}>
              <React.Fragment>
                { (selectedQuake || hoverQuake) &&
                  <QuakePopover  // passing in both doesn't make sense
                    {...selectedQuake} {...hoverQuake} 
                    onCloseClick={() => { goToLastBounds(); onQuakeSelect() }}
                  />
                }
                { window.google && 
                  <React.Fragment>
                    <MapControl position={window.google.maps.ControlPosition.TOP_CENTER}>
                        <span>Map</span>
                        <div style={{
                          height: '19px', 
                          background: 'black', 
                          width: '1px', 
                          display: 'inline-block',
                          margin: '0px 8px'
                        }} />
                        <span>Satellite</span>
                    </MapControl>
                  </React.Fragment>
                }
                { getCirclesInViewPort(quakes).map(({id, geometry, properties}) => {
                  const [ lng, lat ] = geometry.coordinates
                  return (
                    <QuakeCircle key={id} id={id}
                      center={{ lat, lng }}
                      properties={properties}
                      onMouseOut={() => {
                        quakesFunctions.functions[id][quakesFunctions.funcName](false)
                        onQuakeHover()
                      }}
                      onMouseOver={() => {
                        quakesFunctions.functions[id][quakesFunctions.funcName](true)
                        onQuakeHover({ center: { lat, lng }, id, properties })
                      }}
                      radius={getPercievedRadius(properties.mag)}
                      properties={properties}
                      onClick={() => {
                        goToCircle({ lat, lng }, getPercievedRadius(properties.mag));
                        onQuakeSelect({ id, center: {lat, lng}, properties })
                      }}
                    />
                  )
                })}
              </React.Fragment>
            </QuakeMap>
          }
          </QuakeState>
          }
        </MapState>
      </Col>
    </Row>
  </Container>
)
export default MapView
