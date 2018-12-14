import db from '../config';

import database from './database';

// const seedRedFlagTable = async incident => {
//   const client = await db.connect();
//   const sql =
//     `INSERT INTO red-flags(created_on, 
//     created_by, location, status, images, 
//     videos, comment) 
//     VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
//   return client
//     .query(sql, incident)
//     .then(results => {
//       console.log(results.rows);
//       client.release();
//     })
//     .catch(e => {
//       console.log(e);
//       client.release();
//     });
// };

const seedInterventionTable = async incident => {
  const client = await db.connect();
  const sql =
    `INSERT INTO interventions(created_on, 
    created_by, location, status, images, 
    videos, comment) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  return client
    .query(sql, incident)
    .then(results => {
      console.log(results.rows);
      client.release();
    })
    .catch(e => {
      console.log(e);
      client.release();
    });
};

// database.forEach(incident => seedRedFlagTable(incident));

database.forEach(incident => seedInterventionTable(incident));
