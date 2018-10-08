
import React, { PureComponent } from 'react'

import { getViewableQuakes } from '../utilities/map_utils';
import {getSessionVals, SavePropsInStorage } from '../utilities/session/session'
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

    this.goToCircle = (center, radius) => {
      // this whole thing has ot to be wrong
      const zoom = this.map.getZoom()
      this.lastBounds = { center, zoom }
      
      const newCenterBounds = new window.google.maps.Circle({center, radius})
      this.map.fitBounds(newCenterBounds.getBounds())
      
      this.setState({ center, zoom })
    }

    this.goToLastBounds = () => this.goToBounds(this.lastBounds)


    this.goToBounds = ({
      center = this.state.center,
      zoom = this.state.zoom
    }) => {
      // the map references doesn't update when state changes 
      this.map.setCenter(center)
      this.map.setZoom(zoom)
      this.setState({ center, zoom })
    }

    this.getCirclesInViewPort = (quakes) => {
      const viewableQuakes = getViewableQuakes(quakes, this.map)

      return viewableQuakes
    }

    this.onIdle = () => {
      if (notGoCrazy > 15) {
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

    this.setMapRef = map => this.map = map.context[MAP]


    this.functions = {
      getCirclesInViewPort: this.getCirclesInViewPort,
      setMapRef: this.setMapRef,
      changeCenter: this.goToCircle,
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
