import React, { PureComponent } from 'react'
import { Circle } from 'react-google-maps'
import Radius from '../../atoms/radius/radius'
import { quakeShades, getMagColor } from '../../constants/colors'


const QuakeCircle = ({ radius, properties, ...rest }) => (  
      <Circle {...rest}
        defaultRadius={radius}
        defaultOptions={{
          strokeColor: getMagColor(properties.mag),
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: getMagColor(properties.mag),
          fillOpacity: 0.2,
        }}
      />
    )

export { QuakeCircle }