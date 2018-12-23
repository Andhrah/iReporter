import db from '../config';

const insertText = `INSERT INTO interventions(
  created_on, created_by, intervention_reasons, location, 
  status, images, videos, comment)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;

const insertValues = [
  new Date().toDateString(),
  1,
  ['Bad Road', ' Economy'],
  '6.605874, 3.349149',
  'Resolved',
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
    console.log('Intervention error', err);
  } finally {
    client.release();
  }
})();
