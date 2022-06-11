// @ts-nocheck

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

function Map() {
  const [mapLongitude, setMapLongitude] = useState<number>(0)
  const [mapLatitude, setMapLatitude] = useState<number>(0)
  const [kebabPoints, setKebabPoints] = useState([])

  const mapElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapLatitude(position.coords.latitude)
        setMapLongitude(position.coords.longitude)
      })
    } else {
      throw new Error('no coords here!')
    }
  }, [])

  useEffect(() => {
    if (kebabPoints.length) {
      const map = tt.map({
        key: process.env.REACT_APP_TOMTOM_KEY as string,
        container: mapElement.current as HTMLDivElement,
        center: [mapLongitude, mapLatitude],
        zoom: 13,
      })
      kebabPoints.forEach((point) => {
        const popup = new tt.Popup({
          anchor: 'bottom',
          offset: 45,
        }).setHTML(`
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; color: #222222;">
            <p style="font-size: 16px; margin: 15px 0;">${point.poi.name}</p>
            <button style="padding: 10px 15px; border: 1px solid #000; border-radius: 5px;" type="button" onclick="window.sessionStorage.setItem('kebabName', '${point.poi.name}')">Select</button>
        </div>
        `)

        new tt.Marker({
          color: '#ff0000',
          width: 40,
          height: 40,
        })
          .setLngLat([point.position.lon, point.position.lat])
          .setPopup(popup)
          .addTo(map)
      })
    }
  }, [JSON.stringify(kebabPoints)])

  useEffect(() => {
    if (mapLatitude && mapLongitude) {
      axios
        .get(
          `https://api.tomtom.com/search/2/search/kebab.json?countrySet=pl-PL&lat=${mapLatitude}&lon=${mapLongitude}&radius=15000&minFuzzyLevel=1&maxFuzzyLevel=2&categorySet=7315&view=Unified&relatedPois=child&key=${process.env.REACT_APP_TOMTOM_KEY}`
        )
        .then((response) => {
          setKebabPoints(response.data.results)
        })
    }
  }, [mapLatitude, mapLongitude])

  return <div ref={mapElement} className="w-full h-96" />
}

export default Map
