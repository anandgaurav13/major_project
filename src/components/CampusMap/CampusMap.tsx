"use client";

import { useCallback, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  CAMPUS_CENTER,
  CAMPUS_LOCATIONS,
  type CampusCategory,
  type CampusLocation,
  filterLocations,
} from "@/lib/campusLocations";
import styles from "./CampusMap.module.css";

const mapLibraries: ("geometry" | "places")[] = [];

const containerStyle = {
  width: "100%",
  height: "100%",
};

type Props = {
  apiKey: string | undefined;
};

const filters: { id: CampusCategory; label: string; icon: string }[] = [
  { id: "all", label: "All Locations", icon: "bi-geo-alt" },
  { id: "department", label: "Departments", icon: "bi-building" },
  { id: "hostel", label: "Hostels", icon: "bi-building-gear" },
  { id: "facility", label: "Facilities", icon: "bi-bank" },
  { id: "admin", label: "Administration", icon: "bi-briefcase" },
];

function NoKeyFallback() {
  return (
    <div className={styles.fallback}>
      <p className={styles.fallbackTitle}>Map preview unavailable</p>
      <p className={styles.fallbackText}>
        Next.js only reads <code>.env</code>, <code>.env.local</code>, etc. — not <code>.env.example</code>. Add
        <code> NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to <code>.env.local</code> in the project root (same folder as{" "}
        <code>package.json</code>), then stop and run <code>npm run dev</code> again.
      </p>
      <ul className={styles.fallbackList}>
        {CAMPUS_LOCATIONS.map((loc) => (
          <li key={loc.id}>
            <strong>{loc.title}</strong> — {loc.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CampusMapInner({ apiKey }: { apiKey: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CampusCategory>("all");
  const [selected, setSelected] = useState<CampusLocation | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: mapLibraries,
  });

  const filtered = useMemo(
    () => filterLocations(CAMPUS_LOCATIONS, category, query),
    [category, query]
  );

  const onMapLoad = useCallback((m: google.maps.Map) => {
    setMap(m);
    const bounds = new google.maps.LatLngBounds();
    CAMPUS_LOCATIONS.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    m.fitBounds(bounds, 56);
  }, []);

  const focusLocation = useCallback(
    (loc: CampusLocation) => {
      setSelected(loc);
      if (map) {
        map.panTo({ lat: loc.lat, lng: loc.lng });
        map.setZoom(17);
      }
    },
    [map]
  );

  if (loadError) {
    return (
      <div className={styles.fallback}>
        <p className={styles.fallbackTitle}>Could not load Google Maps</p>
        <p className={styles.fallbackText}>
          Check billing, API key restrictions, and that Maps JavaScript API is enabled.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className={styles.loading}>Loading map…</div>;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <label className={styles.searchLabel} htmlFor="map-search">
          Find on campus
        </label>
        <div className={styles.searchRow}>
          <i className={`bi bi-search ${styles.searchIcon}`} aria-hidden />
          <input
            id="map-search"
            className={styles.searchInput}
            placeholder="e.g. library, UIET, hostel…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.filterLabel}>
          <i className="bi bi-funnel" aria-hidden /> Filter
        </div>
        <div className={styles.chips}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`${styles.chip} ${category === f.id ? styles.chipActive : ""}`}
              onClick={() => setCategory(f.id)}
            >
              <i className={`bi ${f.icon}`} aria-hidden />
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.listHeader}>
          <span>
            {filtered.length} location{filtered.length === 1 ? "" : "s"}
          </span>
          <button type="button" className={styles.resetBtn} onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
        <ul className={styles.list}>
          {filtered.map((loc) => (
            <li key={loc.id}>
              <button
                type="button"
                className={`${styles.listItem} ${selected?.id === loc.id ? styles.listItemActive : ""}`}
                onClick={() => focusLocation(loc)}
              >
                <span className={styles.listTitle}>{loc.title}</span>
                <span className={styles.listMeta}>{loc.category}</span>
                <span className={styles.listDesc}>{loc.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.mapWrap}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={CAMPUS_CENTER}
          zoom={15}
          onLoad={onMapLoad}
          options={{
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            mapTypeControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
          }}
        >
          {filtered.map((loc) => (
            <Marker
              key={loc.id}
              position={{ lat: loc.lat, lng: loc.lng }}
              title={loc.title}
              onClick={() => focusLocation(loc)}
            />
          ))}
          {selected && (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
              <div className={styles.info}>
                <strong>{selected.title}</strong>
                <p>{selected.description}</p>
                <a className={styles.infoLink} href={`/routes?to=${encodeURIComponent(selected.id)}`}>
                  Directions →
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <div className={styles.legend}>
          <div className={styles.legendTitle}>Legend</div>
          <div className={styles.legendRow}>
            <span className={styles.dotDept} /> Departments
          </div>
          <div className={styles.legendRow}>
            <span className={styles.dotHostel} /> Hostels
          </div>
          <div className={styles.legendRow}>
            <span className={styles.dotFac} /> Facilities
          </div>
          <div className={styles.legendRow}>
            <span className={styles.dotAdm} /> Administration
          </div>
        </div>
      </div>
    </div>
  );
}

export function CampusMap({ apiKey }: Props) {
  const key = apiKey?.trim();
  if (!key) {
    return <NoKeyFallback />;
  }
  return <CampusMapInner apiKey={key} />;
}

export default CampusMap;
