import pool from '../config';

import database from './database';

const seedIncidentTable = async incident => {
  const client = await pool.connect();
  const sql =
    `INSERT INTO incidents(created_on, 
    created_by, type, location, status, images, 
    videos, comment) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
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

database.forEach(incident => seedIncidentTable(incident));