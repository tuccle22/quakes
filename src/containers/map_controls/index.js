import React, { PureComponent, Fragment } from 'react'
import MapControl from '../../components/map_control'
import MapButton from '../../atoms/map_button'
import Icon from '../../atoms/icon'

class MapControls extends PureComponent {
  render() {
    return (
      <Fragment>
        { window.google &&
          <React.Fragment>
            <MapControl position={window.google.maps.ControlPosition.LEFT_TOP}>
              <MapButton icon='arrow_back' onClick={props.goToLastBounds}>
                <Icon icon='keyboard_arrow-left' />
              </MapButton>
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
      </Fragment>
    )
  }
}

export default MapControls