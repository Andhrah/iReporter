import db from '../config';

export const interventionSchema = (async () => {
  try {
    // connect to a postgreSQL server and if any error while connecting log it.
    await db.connect((err, client, release) => {
      if (err) {
        return console.log('Could not connect to the server, check your internet connection');
      }
      const intervention = `CREATE TABLE IF NOT EXISTS interventions(id serial PRIMARY KEY, 
      created_on DATE NOT NULL,
      created_by INT NOT NULL,
      intervention_reasons text[] NOT NULL,
      location VARCHAR(255) NOT NULL, 
      status VARCHAR(255) NOT NULL,
      images text[],
      videos text[],
      comment VARCHAR(1000));`;
      client.query(intervention, (error, response) => {
        if (error) {
          return console.log('Error creating interventions table', error);
        }
        console.log('intervention table >>>', response.rows);
        release();
      });
    });
  } catch (err) {
    console.log('InterventionSchema >>>', err);
  }
})();
