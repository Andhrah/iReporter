import pool from '../config';

const createIntervention = async intervention => {
  const { location, images, video, comment, createdBy } = intervention;
  const createdOn = new Date();
  const status = 'Under Investigation';
  let errors;
  let response;
  const db = await pool.connect();
  const sql =
    'INSERT INTO interventions(created_on, created_by, location, status, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [
    createdOn,
    createdBy,
    location,
    status,
    images.split(','),
    video.split(','),
    comment,
  ];
  try {
    return await db.query(sql, values).then(data => {
      response = data.rows;
      return response;
    });
  } catch (err) {
    errors = new Error(err);
    console.log(errors);
  } finally {
    const promise = new Promise((resolve, reject) => {
      console.log(response);
      resolve(response);
      reject(errors);
      return promise;
    });

    db.release();
  }
};

export const findAll = async () => {
  let errors;
  let response;
  const client = await pool.connect();

  const sql = 'SELECT * FROM interventions';
  try {
    return await client.query(sql).then(results => {
      response = results.rows;
      return response;
    });
  } catch (e) {
    errors = new Error(e);
  } finally {
    const myPromise = new Promise((resolve, reject) => {
      resolve(response);
      reject(errors);
    });

    client.release();
    return myPromise;
  }
};

export default {
  createIntervention,
  findAll,
};
