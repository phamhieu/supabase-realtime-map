import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('components/Map'),
  { ssr: false }
)

function MapInput() {
  return (
    <div className="map-input">
      <Map position={[1.3489728457596013, 103.77043978311998]} />

      <style jsx>{`
        .map-input {
          margin-top: 3rem;
          width: 40%;
        }
        `}</style>
    </div>
  )
}
export default MapInput