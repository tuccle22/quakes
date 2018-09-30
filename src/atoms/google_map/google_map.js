import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import { MAP_OPTIONS } from '../../constants/defaults';

/**
 * This wraps the google map component to reduce boiler plate code
 * on subsequent google maps
 */
const GoogleMapWrapper = (
  {onMapMounted, defaultOptions = MAP_OPTIONS, children, ...props}
) => (
  <GoogleMap
    {...props}
    ref={onMapMounted}
    defaultClickableIcons
    defaultOptions={defaultOptions}>
    {children}
  </GoogleMap>
);
export default withScriptjs(withGoogleMap(GoogleMapWrapper));
