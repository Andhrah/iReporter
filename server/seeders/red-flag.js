import db from '../config';

const insertText = `INSERT INTO red_flags(
  created_on, created_by, corruption_methods, entity_involved,
  location, corruption_date, names_involved, status, 
  images, videos, comment)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;

const insertValues = [
  new Date().toDateString(),
  1,
  ['Bribery', ' Abuse of power'],
  ['custom Officer', ' police'],
  '6.605874, 3.349149',
  new Date(2018, 12, 22),
  ['Jane doe', ' John Bull'],
  'Under Investigation',
  ['image1', ' image2'],
  ['video1', ' video2'],
  'Political corruption is a persistent phenomenon in Nigeria.',
];

(async () => {
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // Parameterized query
    const response = await client.query(insertText, insertValues);
    console.log(response.rows);
  } catch (err) {
    console.log('red-flag error', err);
  } finally {
    client.release();
  }
})();
