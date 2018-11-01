import React, { PureComponent } from 'react'

import { getViewableQuakes } from '../utilities/map_utils';
import {getSessionVals, SavePropsInStorage } from '../utilities/session/session'
import { getPercievedRadius } from '../utilities/map_utils'
import { MAP_OPTIONS } from '../constants/defaults';
import { MAP } from 'react-google-maps/lib/constants'

const [ center = { lat: 51.38, lng: -66.94 }, zoom = 3 ] = getSessionVals(['center', 'zoom'])

const { Consumer, Provider } = React.createContext({})

const MapState = ({children, ...props}) => (
  <Consumer>
    { state => children({...state, ...props}) }
  </Consumer>
)

let notGoCrazy = 0

class MapStateProvider extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      center,
      zoom,
      mapTypeControlOptions: {},
      styles: MAP_OPTIONS,
      mapTypeId: 'satellite'
    }

    this.map = undefined
    this.lastBounds = { center, zoom }


    this.saveBounds = () => {
      const zoom = this.map.getZoom()
      const lat = this.map.getCenter().lat()
      const lng = this.map.getCenter().lng()
      this.lastBounds = { center: { lat, lng }, zoom }
    }

    this.goToCircle = (center, radius) => {
      this.saveBounds()
      const newCenterBounds = new window.google.maps.Circle({ center, radius })
      this.goToBounds({bounds: newCenterBounds.getBounds()})
      this.map.setZoom(this.map.getZoom() - 1)
      this.setState({ zoom: this.map.getZoom() - 1})

    }
    
    /**
     * Goes to the last saved bounds
     */
    this.goToLastBounds = () => this.goToBounds({...this.lastBounds})

    /**
     * Either goes to bounds through a bounds window.google.maps. object or center & zoom
     * @param bounds - google maps bounds object
     * @param center - { lat, lng }
     * @param zoom - number
     */
    this.goToBounds = ({ bounds, center, zoom }) => {
      if (bounds) {
        this.map.fitBounds(bounds)
        this.setState({
          center: {
            lat: this.map.getCenter().lat(),
            lng: this.map.getCenter().lng()
          }
        })
      } else {
        this.map.setCenter(center)
        this.map.setZoom(zoom)
        this.setState({ center, zoom })
      }
    }

    this.getCirclesInViewPort = quakes => getViewableQuakes(quakes, this.map)

    this.onIdle = () => {
      if (notGoCrazy > 50) {
        alert('Things are going crazy!')
        notGoCrazy = 0
      }
      notGoCrazy = notGoCrazy + 1
      const { center: lastCenter, zoom: lastZoom } = this.state
      const lat = this.map.getCenter().lat()
      const lng = this.map.getCenter().lng()
      const zoom = this.map.getZoom()

      // zoom or idle has changed
      if (lastZoom !== zoom || (lastCenter.lat !== lat && lastCenter.lng !== lng)) {
        this.setState({ zoom, center: { lat, lng } })
      }
    }

    this.setMapRef = map => this.map = this.map ? this.map : map.context[MAP]

    this.functions = {
      getCirclesInViewPort: this.getCirclesInViewPort,
      setMapRef: this.setMapRef,
      goToCircle: this.goToCircle,
      onIdle: this.onIdle,
      goToLastBounds: this.goToLastBounds,
    }
  }

  render() {
    return (
      <Provider value={{ ...this.state, ...this.functions }}>
        <SavePropsInStorage {...this.state}>
          {this.props.children}
        </SavePropsInStorage>
      </Provider>
    )
  }
}

export { MapStateProvider, MapState }
