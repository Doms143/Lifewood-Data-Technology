import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet'

const MapAutoFit = ({ offices, focusedOffice }) => {
  const map = useMap()

  useEffect(() => {
    if (focusedOffice?.lat && focusedOffice?.lon) {
      map.flyTo([focusedOffice.lat, focusedOffice.lon], 5, { animate: true, duration: 0.9 })
      return
    }
    if (!offices?.length) return
    if (offices.length === 1) {
      map.flyTo([offices[0].lat, offices[0].lon], 5, { animate: true, duration: 0.9 })
      return
    }
    const bounds = L.latLngBounds(offices.map((office) => [office.lat, office.lon]))
    map.fitBounds(bounds.pad(0.22), { animate: true, duration: 0.9 })
  }, [map, offices, focusedOffice])

  return null
}

const OfficesMap = ({ offices = [], activeRegion = 'All Regions', showMeta = true, className = '', focusedOffice = null }) => {
  const officePin = useMemo(
    () =>
      L.divIcon({
        className: 'lifewood-leaflet-pin',
        html: '<span class="lifewood-leaflet-pin-dot"><span class="lifewood-leaflet-pin-core"></span></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -14],
      }),
    []
  )

  return (
    <div className={`lifewood-offices-map relative w-full h-[340px] sm:h-[410px] lg:h-[460px] overflow-hidden rounded-3xl border border-castleton/20 shadow-soft ${className}`}>
      <MapContainer center={[18, 15]} zoom={2} scrollWheelZoom zoomControl={false} className="h-full w-full">
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapAutoFit offices={offices} focusedOffice={focusedOffice} />
        {offices.map((office) => (
          <Marker key={`${office.name}-${office.lat}-${office.lon}`} position={[office.lat, office.lon]} icon={officePin}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-serpent">{office.name}</p>
                <p className="text-serpent/80">{office.region}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {showMeta ? (
        <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/60 bg-white/85 px-3 py-2 backdrop-blur-sm z-[420]">
          <p className="text-[11px] uppercase tracking-[0.08em] text-castleton">Map Focus</p>
          <p className="text-sm sm:text-base font-semibold text-serpent leading-tight">{activeRegion}</p>
          <p className="text-xs text-serpent/75">{offices.length} locations</p>
        </div>
      ) : null}
    </div>
  )
}

export default OfficesMap
