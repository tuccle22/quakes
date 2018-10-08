export function getPercievedRadius(mag) {
  return (Math.floor(Math.exp(mag/1.01 - 0.13 ) + 0.5)) * 1000
}

export function getViewableQuakes(quakes, map) {
  return (map && map.getBounds() && quakes.filter(quake => {
    const [ lng, lat ] = quake.geometry.coordinates
    const radius = getPercievedRadius(quake.properties.mag)
    const circle = new window.google.maps.Circle({center: {lat, lng}, radius: radius})
    return map.getBounds().intersects(circle.getBounds())
  })) || []
}