import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { RoundToFixDecimals } from "lib/utils"

function MapView({ supabase, clientRef, center, zoom }) {
  const [log, setLog] = useState(undefined)
  const [positions, setPositions] = useState([center])
  const mySubscription = useRef(false)

  useEffect(() => {
    setLog(`Ref: ${clientRef}\nStart listerning...`)
  }, [clientRef])

  useEffect(() => {
    let newLog = `Ref: ${clientRef}\nStart listerning...`
    newLog += positions.map(item => { return `\nreceived lat=${RoundToFixDecimals(item.lat)} long=${RoundToFixDecimals(item.lng)}` })
    setLog(newLog)
  }, [positions, clientRef])

  useEffect(() => {
    // Listen to INSERT event on locations table
    mySubscription.current = supabase
      .from('locations')
      .on('INSERT', payload => {
        const { new: newItem } = payload
        const { ref, latitude, longitude } = newItem
        if (ref === clientRef) {
          console.log('Change received!', payload)
          setPositions([...positions, { lat: latitude, lng: longitude }])
        }
      })
      .subscribe()

    return () => {
      if (mySubscription.current) supabase.removeSubscription(mySubscription.current)
    }
  }, [supabase, clientRef, positions, setPositions])

  function drawPolyline() {
    const polyline = positions.map(item => {
      if (!item) return
      const { lat, lng } = item
      return [lat, lng]
    })
    return <Polyline pathOptions={{ color: 'red' }} positions={polyline} />
  }

  return (
    <div className="map-view">
      <MapContainer center={center} zoom={zoom || 15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {drawPolyline()}
      </MapContainer>
      <textarea readOnly value={log} />

      <style jsx>{`
        .map-view {
        }
        .map-view textarea {
          width: 100%;
          height: 7rem;
        }
      `}</style>
    </div>
  )
}
export default MapView