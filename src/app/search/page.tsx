import Link from "next/link";
import { searchCampus } from "@/lib/searchKnowledge";
import styles from "./app.module.css";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SearchPage({ searchParams }: Props) {
  const raw = searchParams.q;
  const q = typeof raw === "string" ? raw : "";
  const result = searchCampus(q);

  return (
    <div className={styles.page}>
      <h1>Search result</h1>
      <p className={styles.query}>
        {q ? (
          <>
            Showing guidance for: <strong>{q}</strong>
          </>
        ) : (
          "Enter a search from the home page."
        )}
      </p>
      <div className={styles.result}>{result}</div>
      <Link href="/" className={styles.back}>
        ← Back to home
      </Link>
    </div>
  );
}
