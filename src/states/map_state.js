
import React, { Component, PureComponent, createContext } from 'react'

import { getViewableQuakes } from '../utilities/map_utils';
import { SESSION_KEY, setSessionVal, getSessionVals, SavePropsInStorage } from '../utilities/session/session'
import { MAP_OPTIONS } from '../constants/defaults';


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
    console.log(center, zoom)
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

    this.goToLastBounds = () => {
      const { zoom, center } = this.lastBounds
      this.setState({ center, zoom })
    }

    this.getMarkersInViewPort = (quakes) => getViewableQuakes(quakes, this.map)

    this.onIdle = () => {
      if (notGoCrazy > 15) {
        console.log('IDLE IDLE IDLE', this.state)
        alert('Things are going crazy!')
        notGoCrazy = 0
      }
      notGoCrazy = notGoCrazy + 1
      const { center: lastCenter, zoom: lastZoom } = this.state
      if (!this.map || !this.map.getCenter()) return
      const lat = this.map.getCenter().lat()
      const lng = this.map.getCenter().lng()
      const zoom = this.map.getZoom()

      // zoom or idle has changed
      if (lastZoom !== zoom || (lastCenter.lat !== lat && lastCenter.lng !== lng)) {
        this.setState({ zoom, center: { lat, lng } })
      }
    }

    this.setMapRef = map => this.map = map


    this.functions = {
      getMarkersInViewPort: this.getMarkersInViewPort,
      setMapRef: this.setMapRef,
      changeCenter: this.goToCircle,
      onIdle: this.onIdle,
      goToLastBounds: this.goToLastBounds,
    }
  }

  render() {
    console.log('MAP STATE STATE', this.state)
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