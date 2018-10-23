import React, { PureComponent, Fragment } from 'react'
import Navbar from './containers/navbar/navbar'
import MapView from './pages/map_view'
import LayoutContainer from './pages/layout_container'
import { MapStateProvider } from './states/map_state'
import { QuakeStateProvider } from './states/quake_state'

import './index.css'

const Home = () => (
  <Fragment>
    <Navbar />
    <LayoutContainer>
      <MapStateProvider>
        <QuakeStateProvider>
          <MapView />
        </QuakeStateProvider>
      </MapStateProvider>
    </LayoutContainer>
  </Fragment>
)
export default Home
