
import React, { PureComponent } from 'react'
import moment from 'moment'

import { getQuakesByTime } from '../apis/usgs/earthquakes'
import { getSessionVals, SavePropsInStorage } from '../utilities/session/session'

const [ date = moment(), quakes = [], quakeFunctions = {} ] = getSessionVals(['date, quakes, quakeFunctions'])

const { Consumer, Provider } = React.createContext()

const QuakeState = ({ children, ...props }) => (
  <Consumer>
    { state => children({ ...state, ...props })}
  </Consumer>
)

class QuakeStateProvider extends PureComponent {

  state = { date, quakes, quakeFunctions }

  getQuakesByTime = async date => {
    const selectedDate = moment(date).format('YYYY-MM-DD')
    const datePlusOne = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
    const { features } = await getQuakesByTime(selectedDate, datePlusOne)
    const quakes = features.sort((a, b) => (a.properties.mag > b.properties.mag ? -1 : 1))
    this.setState({ date, quakes })
  }

  componentDidMount() {
    this.getQuakesByTime(this.state.date)
  }
  
  init = () => {
    this.getQuakesByTime(this.state.date)
  }

  render() {
    return (
      <Provider 
        value={{ ...this.state, 
          getQuakesByTime: this.getQuakesByTime,
          init: this.init
        }}
      >
        <SavePropsInStorage {...this.state}>
          {this.props.children}
        </SavePropsInStorage>
      </Provider>
    )
  }
}
export { QuakeStateProvider, QuakeState }
