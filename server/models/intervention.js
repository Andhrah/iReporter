import db from '../config';

export const interventionSchema = (async () => {
  const client = await db.connect();
  try {
    const intervention = `CREATE TABLE IF NOT EXISTS interventions(id serial PRIMARY KEY, 
    created_on DATE NOT NULL,
    created_by INT NOT NULL,
    intervention_reasons text[] NOT NULL,
    location VARCHAR(255) NOT NULL, 
    status VARCHAR(255) NOT NULL, 
    images text[],
    videos text[],
    comment VARCHAR(1000));`;
    const response = await client.query(intervention);
    console.log('intervention table >>>', response.rows);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
})();
