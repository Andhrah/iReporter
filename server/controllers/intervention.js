import db from '../config';
import interventionSchema from '../models';

export const createIntervention = async (req, res) => {
  const {
    intervention_reasons,
    location,
    images,
    videos,
    comment,
  } = req.body;

  const insertText = `INSERT INTO interventions(
    created_on, created_by, intervention_reasons, location, 
    status, images, videos, comment) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const insertValues = [
    new Date(),
    req.id,
    `{${intervention_reasons}}`,
    location,
    'Under Investigation',
    `{${images}}`,
    `{${videos}}`,
    comment,
  ];
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // querying or requesting information from the database
    const response = await db.query(insertText, insertValues);
    if (response) {
      return res.status(201).json({
        status: 201,
        data: [{
          id: response.rows[0].id,
          message: 'Created intervention record',
        }],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      error: 'An Error occured while creating intervention record',
    });
  } finally {
    client.release();
  }
};


// Get all the interventions from the Database
export const getAllInterventions = async (req, res) => {
  // connect to a postgreSQL server.
  const client = await db.connect();
  // SELECT every thing from intervention table in the database
  const findAll = 'SELECT * FROM interventions';
  try {
    // querying or requesting information from the database
    const response = await client.query(findAll);
    if (response.rows.length === 0){
      return res.status(200).json({
        status: 200,
        error: 'There are no Intervention Record at the moment'
      })
    }
    return res.status(200).json({
      status: 200,
      data: response.rows, // All the interventions from the DB
    });
  } 
  catch (err) {
    console.log('>>>>>>>>', err);
    return res.status(500).json({
      status: 500,
      error: 'Oop! intervention does not exist, Please try again',
    });
  }
  finally {
    client.release();
  }
}

// Get a specific intervention from the Database
export const getSpecificIntervention = async (req, res) => {
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  // SELECT every thing from intervention table where id is req.params
  const findById = 'SELECT * FROM interventions WHERE id = $1';
  const value = [ id ];
  try {
    // querying or requesting information from the database
    const response = await client.query(findById, value);
    console.log(response.rows);
    if (response.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Not Found',
      })
    }
    return res.status(200).json({
      status: 200,
      data: response.rows,
    })
  } catch (err) {
    console.log('>>>', err);
    return res.status(500).json({
      status: 500,
      error: 'Oop! intervention does not exist, Please try again'
    })
  } finally {
    client.release();
  }
}

// Edit the location of a specific intervention record in the database.
export const editLocationIntervention = async (req, res) => {
  const { location } = req.body;
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // UPDATE location record from intervention table where id is req.params
    const updateLocation = 'UPDATE interventions SET location = $1 WHERE id = $2 RETURNING *';
    const values = [location, id];
    // querying or requesting information from the database
    const response = await db.query(updateLocation, values);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        id: response.rows[0].id,
        message: 'Updated Intervention record\'s location',
      }],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: 'Oop! intervention does not exist, Failed to update location, Please try again',
    });
  } finally {
    client.release();
  }
};

export const editCommentIntervention = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // UPDATE comment record from intervention table where id is req.params
    const updateComment = 'UPDATE interventions SET comment = $1 WHERE id = $2 RETURNING *';
    const values = [comment, id];
    // querying or requesting information from the database
    const response = await client.query(updateComment, values);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        id: response.rows[0].id,
        message: 'Updated Intervention record\'s comment',
      }],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Oop! Intervention does not exist, Failed to update comment, Please try again',
    });
  } finally {
    client.release();
  }
};

export const deleteIntervention = async (req, res) => {
  const { id } = req.params;
  // connect to a postgreSQL server.
  const client = await db.connect();
  try {
    // DELETE intervention record from intervention table where id is req.params
    const deleteIntervention = 'DELETE FROM interventions WHERE id = $1';
    const value = [id];
    // querying or requesting information from the database
    const response = await client.query(deleteIntervention, value);
    if (response.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        message: 'Intervention record has been deleted',
      }],
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Oop! Intervention does not exist, Failed to delete intervention record, Please try again',
    });
  } finally {
    client.release();
  }
};
