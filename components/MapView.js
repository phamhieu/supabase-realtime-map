import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { nanoid } from 'nanoid'
import { RoundToFixDecimals } from "lib/utils"
import TextLog from "components/TextLog"

function MapView({ supabase, clientRef, center, zoom }) {
  const [log, setLog] = useState(undefined)
  const [positions, setPositions] = useState([])

  useEffect(() => {
    let newLog = `Ref: ${clientRef}\nStart listerning...`
    newLog += positions.map(item => { return `\nid=${item.id} lat=${RoundToFixDecimals(item.lat)} long=${RoundToFixDecimals(item.lng)}` })
    setLog(newLog)
  }, [positions, clientRef])

  useEffect(() => {
    if (!supabase) return

    // Listen to INSERT event on locations table
    // Use a unique topic: supabase.channel() returns an existing channel with the same topic
    const channel = supabase
      .channel(`locations-${nanoid()}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'locations' },
        payload => {
          const { new: newItem } = payload
          const { id, ref, latitude, longitude } = newItem
          if (ref === clientRef) {
            console.log('Change received!', payload)
            setPositions(prev => [...prev, { id, ref, lat: latitude, lng: longitude }])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, clientRef])

  function drawPolyline() {
    const temp = positions.map(item => {
      if (!item) return
      const { lat, lng } = item
      return [lat, lng]
    })
    const polyline = [center, ...temp]
    return <Polyline pathOptions={{ color: 'black' }} positions={polyline} />
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
      <TextLog log={log} />

      <style jsx>{`
        .map-view {
        }
      `}</style>
    </div>
  )
}
export default MapView