import dynamic from "next/dynamic";
import { getGoogleMapsBrowserKey } from "@/lib/mapsEnv";
import styles from "./app.module.css";

const RoutePlanner = dynamic(() => import("@/components/RoutePlanner/RoutePlanner"), { ssr: false });

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function RoutesPage({ searchParams }: Props) {
  const raw = searchParams.to;
  const initialTo = typeof raw === "string" ? raw : undefined;
  const apiKey = getGoogleMapsBrowserKey();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Navigation and routes</h1>
        <p>Pick a start and end point; the map updates with walking or shuttle-friendly driving routes.</p>
      </header>
      <RoutePlanner apiKey={apiKey} initialDestinationId={initialTo} />
    </div>
  );
}
