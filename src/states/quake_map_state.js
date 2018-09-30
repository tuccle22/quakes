
import React, { PureComponent } from 'react'
import moment from 'moment'

import { getQuakesByTime } from '../apis/usgs/earthquakes'
import { getPercievedRadius, getViewableQuakes, hasMapMoved } from '../utilities/map_utils'
import { SESSION_KEY, setSessionVal, getSessionVals, SavePropsInStorage } from '../utilities/session/session'

const [
  center = { lat: 51.38, lng: -66.94 }, 
  zoom = 3,
  viewableQuakes = []
] = getSessionVals([
  'center',
  'zoom',
  'viewableQuakes',
])

export const QuakeMapContext = React.createContext({
  center,
  zoom,
  viewableQuakes,
  quakeFunctions: {},
})

export const withQuakeMapState = Component => props => (
  <QuakeMapContext.Consumer>
    { state => 
      <Component {...props} {...state} />
    }
  </QuakeMapContext.Consumer>
)

let notGoCrazy = 0

class QuakeMapState extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      center,
      zoom,
      date: moment(),
      quakes: [],
      viewableQuakes: [],
    }

    this.map = undefined
    this.lastBounds = { center, zoom }

    this.getQuakesByTime = async date => {
      const selectedDate = moment(date).format('YYYY-MM-DD')
      const datePlusOne = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
      const { features } = await getQuakesByTime(selectedDate, datePlusOne)
      const quakes = features.sort((a, b) => (a.properties.mag > b.properties.mag ? -1 : 1))
      const viewableQuakes = getViewableQuakes(quakes, this.map)
      this.setState({ date, quakes, viewableQuakes })
    }

    this.changeCenter = (newCenter, radius) => {
      const zoom = this.map.getZoom()
      this.lastBounds = { zoom, center: newCenter }

      const newCenterBounds = new window.google.maps.Circle({
        center: newCenter,
        radius: getPercievedRadius(radius)
      })
      this.map.fitBounds(newCenterBounds.getBounds())
      const viewableQuakes = getViewableQuakes(this.state.quakes, this.map)
      this.setState({ zoom: zoom, center: newCenter, viewableQuakes })
    }

    this.goToLastBounds = () => {
      const { zoom, center } = this.lastBounds
      this.map.setZoom(zoom),
      this.map.panToCenter(center)
      const viewableQuakes = getViewableQuakes(this.state.quakes, this.map)
      const lat = this.map.getCenter().lat()
      const lng = this.map.getCenter().lng()
      const currZoom = this.map.getZoom()
      this.setState({ lat, lng, currZoom }, () => this.setState({viewableQuakes}))
    }

    this.onIdle = () => {
      console.log('IDLE IDLE IDLE', this.state)
      if (notGoCrazy > 15) {
        alert('Things are going crazy!')
        notGoCrazy = 0
      }
      notGoCrazy = notGoCrazy + 1
      const { center: lastCenter, zoom: lastZoom, quakes, viewableQuakes } = this.state
      if (!this.map || !this.map.getCenter()) return
      const lat = this.map.getCenter().lat()
      const lng = this.map.getCenter().lng()
      const zoom = this.map.getZoom()
      
      // zoom or idle has changed
      if (lastZoom !== zoom || (lastCenter.lat !== lat && lastCenter.lng !== lng)) {
        const viewableQuakes = getViewableQuakes(quakes, this.map)
        this.setState({ zoom, center: { lat, lng }, viewableQuakes })
      }
    }

    this.onMapMounted = async map => {
      this.map = map; 
      
      const { date } = this.state
      const selectedDate = moment(date).format('YYYY-MM-DD')
      const datePlusOne = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
      
      const { features } = await getQuakesByTime(selectedDate, datePlusOne) || []
      const quakes = features.sort((a, b) => (a.properties.mag > b.properties.mag ? -1 : 1))
      this.setState({ quakes, viewableQuakes: quakes })
    }


    this.functions = {
      onMapMounted: this.onMapMounted,
      changeCenter: this.changeCenter,
      getQuakesByTime: this.getQuakesByTime,
      onIdle: this.onIdle,
      goToLastBounds: this.goToLastBounds,
      quakeFunctions: {}
    }
  }

  render() {

    return (
      <QuakeMapContext.Provider value={{...this.state, ...this.functions}}>
        <SavePropsInStorage {...this.state}>
          {() => this.props.children}
        </SavePropsInStorage>
      </QuakeMapContext.Provider>
    )
  }
}
export default QuakeMapState
