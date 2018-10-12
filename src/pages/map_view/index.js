import React, { PureComponent, Fragment } from 'react'
import { InfoWindow } from 'react-google-maps'
import { Container, Row, Col, ListGroup } from 'reactstrap'
import MapControl from '../../components/map_control'
import Sidebar from '../../containers/sidebar/sidebar'
import { MapState } from '../../states/map_state'
import { QuakeState } from '../../states/quake_state'
import QuakeMap from '../../containers/quake_map'
import { QuakeItemState, QuakeItem } from '../../containers/quake_item/quake_item'
import { QuakeCircleState, QuakeCircle } from '../../components/quake_circle/quake_circle'
import { QuakeDetails } from '../../containers/quake_details';
import DatePicker from '../../components/date_picker/date_picker'
import { MagBar } from '../../atoms/mag_bar'


import 'material-design-icons'
import { getPercievedRadius } from '../../utilities/map_utils';

class MapView extends PureComponent {
  render() {
    return (
        <Row noGutters className='full-height'>
          <Col sm='4'>
            <Sidebar>
              <QuakeState> 
                {({ date, getQuakesByTime, quakeFunctions, quakes, selectedQuake, onQuakeSelect }) =>
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
                        <QuakeDetails selectedQuake={selectedQuake} />
                        <Container fluid>
                          <Row>
                            <React.Fragment>
                              { getCirclesInViewPort(quakes).map(quake =>
                                <Col xl={12} key={quake.id}>
                                  <ListGroup>
                                    <QuakeItemState {...quake}
                                      onQuakeSelect={onQuakeSelect}
                                      changeCenter={changeCenter}
                                      quakeFunctions={quakeFunctions}>
                                      { props => 
                                        <React.Fragment>
                                          <QuakeItem {...props} />
                                        </React.Fragment>
                                      }
                                    </QuakeItemState>
                                  </ListGroup>
                                </Col>
                              )}
                            </React.Fragment>
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
              {({init, quakes, quakeFunctions, onQuakeSelect}) => 
                <QuakeMap {...mapProps}
                  onMounted={init}
                  defaultCenter={{lat: 49.38, lng: -66.94}}
                  defaultZoom={3}>
                  <React.Fragment>
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
                        <QuakeCircleState key={id} id={id}
                          center={{lat, lng}} 
                          radius={getPercievedRadius(properties.mag)}
                          quakeFunctions={quakeFunctions} 
                          properties={properties}
                          changeCenter={changeCenter}
                          onQuakeSelect={onQuakeSelect}
                          goToLastBounds={goToLastBounds}> 
                          { props => 
                            <QuakeCircle {...props} properties={properties}>
                                <InfoWindow position={{ lat, lng }} onCloseClick={() => {
                                  onQuakeSelect(); goToLastBounds(); }
                                }>
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
                            </QuakeCircle>
                          }
                        </QuakeCircleState>
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
