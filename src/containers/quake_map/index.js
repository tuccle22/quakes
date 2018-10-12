import React, { PureComponent} from 'react'
import GoogleMap from '../../atoms/google_map/google_map'
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
        onIdle={this.onIdle}
        onMapMounted={this.setMapRef}
      >
        {children}
      </GoogleMap>
    )
  }
}

export default QuakeMap
