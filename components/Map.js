import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
    }
  })
  // console.log(position)
  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        {`lat: ${position.lat}`}<br />{`long: ${position.lng}`}
      </Popup>
    </Marker>
  )
}

function MapInput({ position }) {
  return (
    <>
      <MapContainer center={position} zoom={16} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          height: 20rem;
        }
      `}</style>
    </>
  )
}
export default MapInput