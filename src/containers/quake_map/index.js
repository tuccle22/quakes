import React, { PureComponent} from 'react'
import GoogleMap from '../../atoms/google_map/google_map'
import { MAP_OPTIONS } from '../../constants/defaults';
import { googleMapsApiKey } from '../../keys'
const GoogleMapsBase = 'https://maps.googleapis.com/maps/api/js'

class QuakeMap extends PureComponent {
  constructor(props) {
    super(props)
    console.log('QUAKE MAP CONSTRUCTOR', props)
  }
  render() {
    console.log('QuakeMap Props', this.props)
    const { defaultCenter, defaultZoom, ...rest } = this.props

    // TODO: this doesn't work
    const options = window.google ? (
      { styles: MAP_OPTIONS, mapTypeId: 'satellite',
        mapTypeControlOptions: {
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
      >
        {this.props.children(this.props)}
      </GoogleMap>
    )
  }
}
export default QuakeMap
