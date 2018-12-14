import pool from '../config';

const createIntervention = async intervention => {
  const { location, images, video, comment, createdBy } = req.body;
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

const findAll = async () => {
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
    const promise = new Promise((resolve, reject) => {
      resolve(response);
      reject(errors);
    });

    client.release();
    return promise;
  }
};

const findById = async id => {
  let errors;
  let response;
  const client = await pool.connect();

  const sql = 'SELECT * FROM interventions WHERE id = $1';
  const values = [id];
  try {
    return await client.query(sql, values).then(results => {
      response = results.rows;
      return response;
    });
  } catch (err) {
    errors = new Error(err);
  } finally {
    const promise = new Promise((resolve, reject) => {
      resolve(response);
      reject(errors);
    });

    client.release();
    return promise;
  }
};

const findByIdAndEditLocation = async (id, location) => {
  let errors;
  let response;
  const client = await pool.connect();

  const sql = 'UPDATE interventions SET location = $1 WHERE id = $2 RETURNING *';
  const values = [location, id];
  try {
    return await client.query(sql, values).then(results => {
      response = results.rows;
    });
  } catch (err) {
    errors = new Error(err);
  } finally {
    const promise = new Promise((resolve, reject) => {
      resolve(response);
      reject(errors);
    });

    client.release();
    return promise;
  }
};

const findByIdAndEditComment = async (id, comment) => {
  let errors;
  let response;
  const client = await pool.connect();

  const sql = 'UPDATE interventions SET comment = $1 WHERE id = $2 RETURNING *';
  const values = [comment, id];
  try {
    return await client.query(sql, values).then(results => {
      response = results.rows;
    });
  } catch (err) {
    errors = new Error(err);
  } finally {
    const myPromise = new Promise((resolve, reject) => {
      resolve(response);
      reject(errors);
    });

    client.release();
    return myPromise;
  }
};

const findByIdAndDelete = async id => {
  let errors;
  let response;
  const client = await pool.connect();

  const sql = 'DELETE FROM interventions WHERE id = $1 RETURNING *';
  const values = [id];
  try {
    return await client.query(sql, values).then(results => {
      response = results.rows;
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
  findById,
  findByIdAndEditLocation,
  findByIdAndEditComment,
  findByIdAndDelete,
};
