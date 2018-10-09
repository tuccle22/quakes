import React, { PureComponent, Fragment } from 'react'
import { Container, Row, Col, ListGroup } from 'reactstrap'
import MapControl from '../../components/map_control'
import Sidebar from '../../containers/sidebar/sidebar'
import { MapState } from '../../states/map_state'
import { QuakeState } from '../../states/quake_state'
import QuakeMap from '../../containers/quake_map'
import { QuakeCardState, QuakeCard } from '../../containers/quake_card/quake_card'
import { QuakeCircleState, QuakeCircle } from '../../components/quake_circle/quake_circle'
import DatePicker from '../../components/date_picker/date_picker'
import MapButton from '../../atoms/map_button/map_button'
import Icon from '../../atoms/icon'

import 'material-design-icons'
import { getPercievedRadius } from '../../utilities/map_utils';

class MapView extends PureComponent {
  render() {
    return (
        <Row noGutters className='full-height'>
          <Col sm='4'>
            <Sidebar>
              <QuakeState> 
                { ({ date, getQuakesByTime, quakeFunctions, quakes }) =>
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
                    <Container fluid>
                      <Row>
                        <MapState>
                          {({ getCirclesInViewPort, changeCenter }) =>
                            getCirclesInViewPort(quakes).map(quake =>
                              <Col xl={12} key={quake.id}>
                                <ListGroup>
                                  <QuakeCardState {...quake}
                                    changeCenter={changeCenter}
                                    quakeFunctions={quakeFunctions}>
                                    { props => 
                                      <QuakeCard {...props} />
                                    }
                                  </QuakeCardState>
                                </ListGroup>
                              </Col>
                            )
                          }
                        </MapState> 
                      </Row>
                    </Container>
                  </Fragment>
                }
              </QuakeState>
            </Sidebar>
          </Col>
          <Col sm='8' style={{boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}>
            <MapState> 
            {({ getCirclesInViewPort, changeCenter, ...mapProps }) => 
              <QuakeState> 
              {({init, quakes, quakeFunctions}) => 
                <QuakeMap {...mapProps}
                  onMounted={init}
                  defaultCenter={{lat: 49.38, lng: -66.94}}
                  defaultZoom={3}
                >
                  <React.Fragment>
                    { window.google && 
                      <React.Fragment>
                        <MapControl position={window.google.maps.ControlPosition.LEFT_TOP}>
                          <MapButton icon='arrow_back' onClick={mapProps.goToLastBounds} />
                        </MapControl>
                        <MapControl position={window.google.maps.ControlPosition.TOP_CENTER}>
                          <MapButton onClick={mapProps.goToLastBounds}>
                            <Icon icon='map' />
                          </MapButton>
                          <MapButton onClick={mapProps.goToLastBounds}>
                            <Icon icon='satellite' />
                          </MapButton>
                        </MapControl>
                      </React.Fragment>
                    }
                    { getCirclesInViewPort(quakes).map(({id, geometry, properties}) =>
                      <QuakeCircleState key={id} id={id}
                        center={{lat: geometry.coordinates[1], lng: geometry.coordinates[0]}} 
                        radius={getPercievedRadius(properties.mag)}
                        quakeFunctions={quakeFunctions} 
                        changeCenter={changeCenter}> 
                        { props => 
                          <QuakeCircle {...props} properties={properties}>
                            <span>test</span>
                          </QuakeCircle>
                        }
                      </QuakeCircleState>
                      )
                    }
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
