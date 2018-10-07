import React, { PureComponent} from 'react'
import GoogleMap from '../../atoms/google_map/google_map'
import { MAP_OPTIONS } from '../../constants/defaults';
import { googleMapsApiKey } from '../../keys'
const GoogleMapsBase = 'https://maps.googleapis.com/maps/api/js'

class QuakeMap extends PureComponent {
  constructor() {
    super()
    this.isReady = false
  }

  onIdle = () => {
    this.props.onIdle();
    if (this.isReady) {
      this.isReady = false
      this.props.onMounted();
    }
  }

  setMapRef = (map) => {
    this.props.setMapRef(map)
    this.isReady = true
  }

  render() {
    const { children, ...rest } = this.props

    // TODO: this doesn't work
    const options = window.google ? (
      { mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_CENTER
        }
      }
    ) : {}
    return (
      <GoogleMap {...rest}
        googleMapURL={`${GoogleMapsBase}?key=${googleMapsApiKey}&libraries=geometry`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        options={options}
        defaultOptions={{styles: MAP_OPTIONS, mapTypeId: 'satellite'}}
        onIdle={this.onIdle}
        onMapMounted={this.setMapRef}
      >
        {children}
      </GoogleMap>
    )
  }
}

export default QuakeMap
