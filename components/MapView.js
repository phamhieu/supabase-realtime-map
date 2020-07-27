import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function MapView({ supabase, clientRef, center, zoom }) {
  const [log, setLog] = useState(undefined)

  useEffect(() => {
    setLog(`Ref: ${clientRef}\nStart listerning...`)
  }, [clientRef])

  console.log("clientRef", clientRef)
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