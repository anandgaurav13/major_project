import dynamic from "next/dynamic";
import { getGoogleMapsBrowserKey } from "@/lib/mapsEnv";
import styles from "./app.module.css";

const CampusMap = dynamic(() => import("@/components/CampusMap/CampusMap"), { ssr: false });

export default function MapPage() {
  const apiKey = getGoogleMapsBrowserKey();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Campus map</h1>
        <p>Interactive map of BBAU Vidya Vihar Campus, Raebareli Road, Lucknow.</p>
      </header>
      <p className={styles.lead}>
        Use the sidebar to search, filter by type, and jump to any pin. Click a marker for details and a shortcut to
        turn-by-turn directions.
      </p>
      <CampusMap apiKey={apiKey} />
    </div>
  );
}
