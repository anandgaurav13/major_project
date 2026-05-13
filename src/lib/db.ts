import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "database.db");

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (dbInstance) return dbInstance;
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    );
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY,
      name TEXT,
      location TEXT
    );
    CREATE TABLE IF NOT EXISTS internships (
      id INTEGER PRIMARY KEY,
      title TEXT,
      company TEXT
    );
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY,
      message TEXT
    );
  `);
  dbInstance = db;
  return db;
}

export function seedDefaultAdminIfEmpty(): void {
  const db = getDb();
  const count = db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number };
  if (count.c === 0) {
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", "123");
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("student", "123");
  }
}
