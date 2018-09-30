import React, { PureComponent, Fragment } from 'react'
import { Container, Row, Col, ListGroup } from 'reactstrap'
import MapControl from '../../components/map_control'
import Sidebar from '../../containers/sidebar/sidebar'
import QuakeMap from '../../containers/quake_map'
import QuakeCardContainer, { QuakeCard } from '../../containers/quake_card/quake_card'
import QuakeCircle from '../../components/quake_circle/quake_circle'
import DatePicker from '../../components/date_picker/date_picker'
import MapButton from '../../atoms/map_button/map_button'
import Icon from '../../atoms/icon'

import { googleMapsApiKey } from '../../keys'
import 'material-design-icons'

import { withQuakeMapState } from '../../states/quake_map_state'

const QuakeMapWithState = withQuakeMapState(QuakeMap)
const SidebarWithState = withQuakeMapState(Sidebar)

class MapView extends PureComponent {
  render() {
    console.log('MAP_VIEW', this.props)
    return (
      <div className='full-height'>
        <Row noGutters className='full-height'>
          <Col sm='4'>
            <SidebarWithState>
              { props =>
                <Fragment>
                  <Container>
                    <Row style={{marginTop: '16px'}}>
                    <Col md={12}>
                      <DatePicker {...props} />
                    </Col>
                    </Row>
                  </Container>
                  <Container fluid>
                    <Row>
                      { props.viewableQuakes.map(quake =>
                        <Col xl={12} key={quake.id}>
                          <ListGroup>
                            <QuakeCardContainer {...quake}
                              changeCenter={props.changeCenter}
                              quakeFunctions={props.quakeFunctions}
                              render={ props => <QuakeCard {...props}/>}
                            />
                          </ListGroup>
                        </Col>
                      )}
                    </Row>
                  </Container>
                </Fragment>
              }
            </SidebarWithState>
          </Col>
          <Col sm='8' style={{boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}>
            <QuakeMapWithState
              defaultCenter={{lat: 49.38, lng: -66.94}}
              defaultZoom={3}
            >
              { props =>
                <React.Fragment>
                  { window.google && 
                    <React.Fragment>
                      <MapControl position={window.google.maps.ControlPosition.LEFT_TOP}>
                        <MapButton icon='arrow_back' onClick={props.goToLastBounds} />
                      </MapControl>
                      <MapControl position={window.google.maps.ControlPosition.TOP_CENTER}>
                        <MapButton onClick={props.goToLastBounds}>
                          <Icon icon='map' />
                        </MapButton>
                        <MapButton onClick={props.goToLastBounds}>
                          <Icon icon='satellite' />
                        </MapButton>
                      </MapControl>
                    </React.Fragment>
                  }
                  { props.viewableQuakes.map(quake =>
                    <QuakeCircle key={quake.id} {...quake}
                      quakeFunctions={props.quakeFunctions}
                      changeCenter={props.changeCenter}
                    />
                  )}
                </React.Fragment>
              }
            </QuakeMapWithState>
          </Col>
        </Row>
      </div>
    )
  }
}
export default MapView
