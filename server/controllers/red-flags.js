import db from '../config';
import redFlag from '../models';

export const createRedFlag = async (req, res) => {
  const {
    corruptionMethods,
    entityInvolved,
    location,
    corruptionDate,
    namesInvolved,
    images,
    videos,
    comment,
  } = req.body;

  const newRedFlag = `INSERT INTO red_flags(
    created_on, created_by, corruption_methods, entity_involved, 
    location, corruption_date, names_involved, status, 
    images, videos, comment) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
  const insertValues = [
    new Date().toDateString(),
    req.id,
    `{${corruptionMethods}}`,
    `{${entityInvolved}}`,
    location,
    new Date(corruptionDate).toDateString(),
    `{${namesInvolved}}`,
    'Draft',
    `{${images}}`,
    `{${videos}}`,
    comment,
  ];
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // querying or requesting information from the database
    const response = await client.query(newRedFlag, insertValues);
    if (response) {
      return res.status(201).json({
        status: 201,
        data: [{
          id: response.rows[0].id,
          message: 'Red-flag has been created',
        }],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: 'An Error occured while creating red-flag record',
    });
  } finally {
    client.release();
  }
};

// Get all the red-flag from the Database
export const getAllRedFlags = async (req, res) => {
  // connect to a postgreSQL server.
  const client = await db.connect();
  // SELECT every thing from red-flag table in the database
  const findAll = 'SELECT * FROM red_flags';
  try {
    // querying or requesting information from the database
    const response = await client.query(findAll);
    if (response.rows.length === 0) {
      return res.status(200).json({
        status: 200,
        message: 'No Red-Flag Record at the moment',
      });
    }
    return res.status(200).json({
      status: 200,
      data: response.rows, // All the red-flags from the DB
    });
  } catch (err) {
    console.log('>>>>>>>>', err);
    return res.status(500).json({
      status: 500,
      error: 'Oops! red-flag does not exist, Please try again'
    });
  } finally {
    client.release();
  }
};

export const getSpecificRedFlag = async (req, res) => {
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  // SELECT every thing from red-flag table where id is req.params
  const findById = 'SELECT * FROM red_flags WHERE id = $1';
  const value = [id];
  try {
    // querying or requesting information from the database
    const response = await client.query(findById, value);
    if (response.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Red-Flag Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: response.rows,
    });
  } catch (err) {
    console.log('>>>', err);
    return res.status(500).json({
      status: 500,
      error: 'Oop! red-flag does not exist, Please try again',
    });
  } finally {
    client.release();
  }
};

export const editRedFlagLocation = async (req, res) => {
  const { location } = req.body;
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // UPDATE location record from red-flag table where id is req.params
    const updateLocation = 'UPDATE red_flags SET location = $1 WHERE id = $2 RETURNING *';
    const values = [location, id];
    // querying or requesting information from the database
    const response = await db.query(updateLocation, values);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'Red-Flag Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        id: response.rows[0].id,
        message: 'Updated Red-Flag record\'s location',
      }],
    });
  } catch (err) {
    console.log('>>>>>>>', err);
    res.status(500).json({
      status: 500,
      error: 'Oop! red-flag does not exist, Failed to update location, Please try again',
    });
  } finally {
    client.release();
  }
};

export const editRedFlagComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // UPDATE comment record from red-flag table where id is req.params
    const updateComment = 'UPDATE red_flags SET comment = $1 WHERE id = $2 RETURNING *';
    const values = [comment, id];
    // querying or requesting information from the database
    const response = await client.query(updateComment, values);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'Red_Flag Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        id: response.rows[0].id,
        message: 'Updated Red-Flag record\'s comment',
      }],
    });
  } catch (error) {
    console.log('>>>', error);
    res.status(500).json({
      status: 500,
      error: 'Oop! Red-Flag does not exist, Failed to update comment, Please try again',
    });
  } finally {
    client.release();
  }
};

export const deleteRedFlag = async (req, res) => {
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // DELETE red-flag record from red-flag table where id is req.params
    const removeIntervention = 'DELETE FROM red_flags WHERE id = $1';
    const value = [id];
    // querying or requesting information from the database
    const response = await client.query(removeIntervention, value);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'Red-Flag Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        message: 'Red-Flag record has been deleted',
      }],
    });
  } catch (err) {
    console.log('>>>', err);
    res.status(500).json({
      status: 500,
      error: 'Oop! Red-Flag does not exist, Failed to delete red-flag record, Please try again',
    });
  } finally {
    client.release();
  }
};
