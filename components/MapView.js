import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function MapView({ supabase, clientRef, center, zoom }) {
  const [log, setLog] = useState(undefined)
  const mySubscription = useRef(false)

  useEffect(() => {
    setLog(`Ref: ${clientRef}\nStart listerning...`)
  }, [clientRef])

  useEffect(() => {
    // Listen to INSERT event on locations table
    mySubscription.current = supabase
      .from('locations')
      .on('INSERT', payload => {
        const { new: newItem } = payload
        const { ref } = newItem
        console.log("INSERT payload", payload)
        if (ref === clientRef) {
          console.log('Change received!', payload)
        }
      })
      .subscribe()

    return () => {
      if (mySubscription.current) supabase.removeSubscription(mySubscription.current)
    }
  }, [supabase, clientRef])

  return (
    <div className="map-view">
      <MapContainer center={center} zoom={zoom || 15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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