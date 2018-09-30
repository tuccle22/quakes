import React, { PureComponent, Fragment } from 'react'
import Navbar from './containers/navbar/navbar'
import MapView from './pages/map_view'
import LayoutContainer from './pages/layout_container'
import QuakeMapState from './states/quake_map_state'

import './index.css'

class Home extends PureComponent {
  render() {
    return (
      <Fragment>
        <Navbar />
        <LayoutContainer>
          <QuakeMapState>
            <MapView />
          </QuakeMapState>
        </LayoutContainer>
      </Fragment>
    )
  }
}
export default Home
