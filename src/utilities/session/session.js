export const SESSION_KEY = {
  MAP_INIT: 'last-map-init'
}

export const getSessionVal = (key, defaultVal) => {
  const jsonVal = sessionStorage.getItem(key)
  try {
    return jsonVal ? JSON.parse(jsonVal) : defaultVal
  } catch (err) {
    console.info(`The value of the ${key} could not be parsed`, err)
    return defaultVal
  }
}

export const getSessionVals = (keys) => keys.map(_ => getSessionVal(_))

export const setSessionVal = (key, val) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error(`The value for ${key} could not be set`, err)
  }
}

export const SavePropsInStorage = ({children, ...props}) => {
  for (const key in props) setSessionVal(key, props[key])
  return children
}