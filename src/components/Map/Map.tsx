import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function Map() {
  const [mapLongitude, setMapLongitude] = useState<number>(0)
  const [mapLatitude, setMapLatitude] = useState<number>(0)
  const [kebabPoints, setKebabPoints] = useState([])

  const mapElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    return () => {
      axios
        .get(
          `https://api.tomtom.com/search/2/search/kebab.json?countrySet=pl-PL&lat=${mapLatitude}&lon=${mapLongitude}&radius=5000&minFuzzyLevel=1&maxFuzzyLevel=2&categorySet=7315&view=Unified&relatedPois=child&key=bMuk0LLJun9LTvbA5ts0poYsD3y6qfh9`
        )
        .then((response) => setKebabPoints(response.data.results))
    }
  }, [mapLatitude, mapLongitude])

  console.log(kebabPoints)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setMapLatitude(position.coords.latitude)
      setMapLongitude(position.coords.longitude)
    })
  } else {
    throw new Error('no coords here!')
  }

  const addMarker = (map: tt.Map) => {
    const markers: tt.Marker[] = []
    kebabPoints.forEach((point) => {
      // @ts-ignore
      const popup = new tt.Popup({ anchor: 'bottom', offset: 45 }).setText(point.poi.name)

      const marker = new tt.Marker({
        color: '#ff0000',
        width: '40px',
        height: '40px',
      })
        // @ts-ignore
        .setLngLat([point.position.lon, point.position.lat])
        .setPopup(popup)
        .addTo(map)
      markers.push(marker)
    })
    return markers
  }

  useEffect(() => {
    let map = tt.map({
      key: 'bMuk0LLJun9LTvbA5ts0poYsD3y6qfh9',
      // @ts-ignore
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: 13,
    })
    addMarker(map)

    return () => map.remove()
  }, [mapLatitude, mapLongitude])

  return <div ref={mapElement} style={{ height: '500px', width: '100%' }}></div>
}

export default Map
