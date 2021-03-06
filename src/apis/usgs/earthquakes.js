const BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'

async function getQuakesByTime(start, end) {
  try {
    const request = await fetch(`${BASE_URL}&starttime=${start}&endtime=${end}`)
    return await request.json()
  } catch(e) {
    console.error('Error retrieving getQuakesByTime', e)
  }
}

export { getQuakesByTime }
