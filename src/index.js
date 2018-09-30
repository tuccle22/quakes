import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import Home from './home'
import registerServiceWorker from './utilities/registerServiceWorker';

render(
  <React.Fragment>
    <Helmet>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='theme-color' content='#f2f2f2' />
      <title>Quakes</title>
      <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossorigin='anonymous' />
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
    </Helmet>
    <Router>
      <Route path='/' component={Home} />
    </Router>
  </React.Fragment>,
  document.getElementById('root')
)
registerServiceWorker()
