import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import { useEffect, useRef, useState } from 'react'

const MAX_ZOOM = 17

function Map() {
  const [mapLongitude, setMapLongitude] = useState(-121.91599)
  const [mapLatitude, setMapLatitude] = useState(37.36765)
  const [mapZoom, setMapZoom] = useState(13)
  const [map, setMap] = useState({})

  const mapElement = useRef<HTMLDivElement | null>(null)

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1)
    }
  }

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1)
    }
  }

  // const updateMap = () => {
  //   map.setCenter([parseFloat(String(mapLongitude)), parseFloat(String(mapLatitude))])
  //   map.setZoom(mapZoom)
  // }

  useEffect(() => {
    let ttMap = tt.map({
      key: 'bMuk0LLJun9LTvbA5ts0poYsD3y6qfh9',
      // @ts-ignore
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    })
    setMap(ttMap)
    return () => ttMap.remove()
  }, [])

  return <div ref={mapElement} style={{ height: '500px', width: '500px' }}></div>
}

export default Map
