// pages/api/seed.js

import { openDb } from './db.js' 

async function setup() {
  // Open SQLite connection
  const db = await openDb()

  // Define table schema
  await db.exec(`CREATE TABLE favourites ( 
      title TEXT,
      author TEXT,
      urlToImage TEXT 
    );
  `)

  // Insert dummy data
//   await db.run(
//     'INSERT INTO posts (title, content) VALUES (?, ?)',
//     'Hello World', 
//     'My first blog post!'
//   )
  
  // Close connection
  await db.close()  
}

setup()
  .catch(err => {
    console.error(err.message)
 });