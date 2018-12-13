import pool from '../config';

const createIntervention = async intervention => {
  const { location, images, video, comment, createdBy } = intervention;
  const createdOn = new Date();
  const status = 'Under Investigation';
  let errors;
  let response;
  const db = await pool.connect();
  const sql =
    'INSERT INTO interventions (created_on, created_by, location, status, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [
    createdOn,
    createdBy,
    location,
    status,
    images,
    video,
    comment,
  ];
  try {
    return await db.query(sql, values).then(data => {
      response = data.rows;
    });
  } catch (e) {
    errors = new Error(e);
  } finally {
    const promise = new Promise((resolve, reject) => {
      console.log(response)
      resolve(response);
      reject(errors);
    });

    db.release();
    return promise;
  }
};

export default {
  createIntervention,
};
