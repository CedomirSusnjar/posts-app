import { openDb } from './db.js';

async function setup() {
  // Open SQLite connection
  const db = await openDb();

  // Define table schema
  await db.exec(`CREATE TABLE favourites ( 
      title TEXT,
      author TEXT,
      urlToImage TEXT,
      name TEXT,
      publishedAt TEXT,
      description TEXT
    );
  `);

  // Close connection
  await db.close();
}

setup().catch((err) => {
  console.error(err.message);
});
