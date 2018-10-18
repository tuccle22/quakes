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


import 'material-design-icons'
import { getPercievedRadius } from '../../utilities/map_utils';
import { StoreFunctionsById } from '../../utilities/react_utils/react_utils';

class MapView extends PureComponent {
  render() {
    return (
        <Row noGutters className='full-height'>
          <Col sm='4'>
            <Sidebar>
              <QuakeState> 
                {({ date, getQuakesByTime, quakesFunctions, quakes, selectedQuake, onQuakeSelect, onQuakeHover }) =>
                  <Fragment>
                    <Container>
                      <Row style={{marginTop: '16px'}}>
                      <Col md={12}>
                        <DatePicker date={date} 
                          getQuakesByTime={getQuakesByTime}
                        />
                      </Col>
                      </Row>
                    </Container>
                    <MapState>
                      {({ getCirclesInViewPort, changeCenter }) =>
                      <Fragment>
                        {selectedQuake && <QuakeDetails selectedQuake={selectedQuake} />}
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
                                            changeCenter({lat, lng}, properties.mag);
                                            onQuakeSelect({ id, center: {lat, lng}, properties })
                                          }}
                                          properties={properties}
                                          isHovered={isHovered}
                                          onMouseOut={onHover}
                                          onMouseOver={onHover}
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
          <Col sm='8' style={{boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}>
            <MapState> 
            {({ getCirclesInViewPort, changeCenter, goToLastBounds, ...mapProps }) => 
              <QuakeState> 
              {({init, quakes, quakesFunctions, onQuakeSelect, onQuakeHover, selectedQuake, hoverQuake }) => 
                <QuakeMap {...mapProps}
                  onMounted={init}
                  defaultCenter={{lat: 49.38, lng: -66.94}}
                  defaultZoom={3}>
                  <React.Fragment>
                    { selectedQuake &&
                      <InfoWindow 
                        position={{ lat: selectedQuake.center.lat, lng: selectedQuake.center.lng}} 
                        onCloseClick={() => {
                          goToLastBounds()
                          onQuakeSelect()
                        }}>
                        <Container fluid>
                          <Row className='row-eq-height'>
                            <Col sm={2}>
                              <MagBar mag={selectedQuake.properties.mag} />
                            </Col>
                            <Col sm={10}>
                              <pre>
                                {JSON.stringify(selectedQuake.properties, null, 2)}
                              </pre>
                            </Col>
                          </Row>
                        </Container>
                      </InfoWindow>
                    }
                    { window.google && 
                      <React.Fragment>
                        <MapControl position={window.google.maps.ControlPosition.TOP_CENTER}>
                          <h5>Map</h5>
                        </MapControl>
                        <MapControl position={window.google.maps.ControlPosition.TOP_CENTER}>
                          <h5>Satellite</h5>
                        </MapControl>
                      </React.Fragment>
                    }
                    { getCirclesInViewPort(quakes).map(({id, geometry, properties}) => {
                      const [ lng, lat ] = geometry.coordinates
                      return (
                        <QuakeCircle key={id} id={id}
                          center={{ lat, lng }}
                          properties={properties}
                          onQuakeHover={quakesFunctions.functions[id][quakesFunctions.funcName]}
                          radius={getPercievedRadius(properties.mag)}
                          properties={properties}
                          onClick={() => {
                            changeCenter({ lat, lng }, properties.mag);
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
    )
  }
}
export default MapView
