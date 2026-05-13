"use client";

import { useEffect, useMemo, useState } from "react";
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { CAMPUS_CENTER, CAMPUS_LOCATIONS, getLocationById } from "@/lib/campusLocations";
import styles from "./RoutePlanner.module.css";

const containerStyle = { width: "100%", height: "100%" };

type Props = {
  apiKey: string | undefined;
  initialDestinationId?: string;
};

function NoKeyFallback() {
  return (
    <div className={styles.fallback}>
      <p>
        Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in <code>.env.local</code> (project root) and restart{" "}
        <code>npm run dev</code> to see the route on the map.
      </p>
      <p>You can still choose From and To below; directions will appear once the key is configured.</p>
    </div>
  );
}

type InnerProps = {
  apiKey: string;
  initialDestinationId?: string;
};

function RoutePlannerInner({ apiKey, initialDestinationId }: InnerProps) {
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState(initialDestinationId ?? "");
  const [shuttle, setShuttle] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: [],
  });

  useEffect(() => {
    if (initialDestinationId) {
      setToId(initialDestinationId);
    }
  }, [initialDestinationId]);

  const fromLoc = useMemo(() => getLocationById(fromId), [fromId]);
  const toLoc = useMemo(() => getLocationById(toId), [toId]);

  useEffect(() => {
    if (!isLoaded || !fromLoc || !toLoc) {
      setDirections(null);
      setError(null);
      return;
    }
    if (fromLoc.id === toLoc.id) {
      setError("Choose two different places.");
      setDirections(null);
      return;
    }
    setError(null);
    const svc = new google.maps.DirectionsService();
    svc.route(
      {
        origin: { lat: fromLoc.lat, lng: fromLoc.lng },
        destination: { lat: toLoc.lat, lng: toLoc.lng },
        travelMode: shuttle ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          setDirections(null);
          setError("Directions could not be calculated. Try another pair or check API settings.");
        }
      }
    );
  }, [isLoaded, fromLoc, toLoc, shuttle]);

  useEffect(() => {
    if (!directions || !map) return;
    const leg = directions.routes[0]?.legs[0];
    if (!leg) return;
    const bounds = new google.maps.LatLngBounds();
    leg.steps.forEach((s) => {
      bounds.extend(s.start_location);
      bounds.extend(s.end_location);
    });
    map.fitBounds(bounds, 64);
  }, [directions, map]);

  const leg = directions?.routes[0]?.legs[0];

  if (loadError) {
    return <div className={styles.fallback}>Google Maps failed to load.</div>;
  }

  if (!isLoaded) {
    return <div className={styles.loading}>Loading navigation…</div>;
  }

  return (
    <div className={styles.grid}>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>
          <i className="bi bi-signpost-2" aria-hidden /> Plan your route
        </h2>

        <label className={styles.label} htmlFor="from-place">
          From
        </label>
        <select
          id="from-place"
          className={styles.select}
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
        >
          <option value="">Select starting point</option>
          {CAMPUS_LOCATIONS.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>

        <label className={styles.label} htmlFor="to-place">
          To
        </label>
        <select id="to-place" className={styles.select} value={toId} onChange={(e) => setToId(e.target.value)}>
          <option value="">Select destination</option>
          {CAMPUS_LOCATIONS.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>

        <div className={styles.modeLabel}>Travel mode</div>
        <div className={styles.modeRow}>
          <button
            type="button"
            className={`${styles.modeBtn} ${!shuttle ? styles.modeBtnActive : ""}`}
            onClick={() => setShuttle(false)}
          >
            <i className="bi bi-person-walking" aria-hidden /> Walking
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${shuttle ? styles.modeBtnActive : ""}`}
            onClick={() => setShuttle(true)}
          >
            <i className="bi bi-bus-front" aria-hidden /> Shuttle / vehicle
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {leg && (
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <i className="bi bi-clock" aria-hidden />
              <span>ETA</span>
            </div>
            <div className={styles.summaryBig}>{leg.duration?.text}</div>
            <div className={styles.summarySub}>Distance: {leg.distance?.text}</div>
          </div>
        )}

        {leg && (
          <ol className={styles.steps}>
            {leg.steps.map((s, i) => (
              <li key={i} className={styles.step}>
                <span dangerouslySetInnerHTML={{ __html: s.instructions }} />
                <div className={styles.stepMeta}>
                  {s.distance?.text} · {s.duration?.text}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className={styles.mapCol}>
        <div className={styles.mapBox}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={CAMPUS_CENTER}
            zoom={15}
            onLoad={setMap}
            options={{
              mapTypeControl: true,
              streetViewControl: false,
              fullscreenControl: true,
            }}
          >
            {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: false }} />}
          </GoogleMap>
        </div>

        <div className={styles.tips}>
          <h3>Navigation tips</h3>
          <ul>
            <li>Campus shuttle runs every 15 minutes during college hours.</li>
            <li>Walking is recommended for short hops inside the academic core.</li>
            <li>Main pathways are lit; use Library or Admin Block as landmarks.</li>
            <li>Pick both From and To to update the blue path automatically.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RoutePlanner({ apiKey, initialDestinationId }: Props) {
  const key = apiKey?.trim();
  if (!key) {
    return <NoKeyFallback />;
  }
  return <RoutePlannerInner apiKey={key} initialDestinationId={initialDestinationId} />;
}

export default RoutePlanner;
