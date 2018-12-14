import intervention from '../../models/intervention';
import pool from '../../config';

export const createIntervention = async (req, res) => {
  const {
    location,
    images,
    videos,
    comment,
  } = req.body;

  const sql = 'INSERT INTO interventions(created_on, created_by, location, status, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [
    new Date(),
    req.id,
    location,
    'Under Investigation',
    `{${images}}`,
    `{${videos}}`,
    comment,
  ];
  try {
    const data = await pool.query(sql, values);
    if (data) {
      return res.status(201).json({
        status: 201,
        data: [{
          id: data.rows[0].id,
          message: 'Created intervention record',
        }],
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: 'Error occured',
    });
  }
};


// Get all the interventions from the DB(data structure)
export const getInterventions = (req, res) => {
  intervention.findAll().then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: results, // Get all the interventions from the DB
    });
  })
    .catch(err => {
      console.log('>>>>>>>>', err);
      return res.status(500).json({
        status: 500,
        error: 'Oop! something went wrong',
      });
    });
};

export const getSpecificIntervention = (req, res) => {
  const { id } = req.params;
  intervention.findById(id).then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: results,
    });
  }).catch(err => res.status(500).json({
    status: 500,
    error: 'Oop! something went wrong',
  }));
};

export const editLocationIntervention = async (req, res) => {
  const { location } = req.body;
  const { id } = req.params;
  try {
    const sql = 'UPDATE interventions SET location = $1 WHERE id = $2 RETURNING *';
    const values = [location, id];
    const response = await pool.query(sql, values);
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
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Oop! something went wrong',
    });
  }
};

export const editCommentIntervention = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  try {
    const sql = 'UPDATE interventions SET comment = $1 WHERE id = $2 RETURNING *';
    const values = [comment, id];
    const response = await pool.query(sql, values);
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
      error: 'Oop! something went wrong',
    });
  }
};

export const deleteIntervention = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM interventions WHERE id = $1 RETURNING *';
    const values = [id];
    const response = await pool.query(sql, values);
    console.log(response);
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
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'Oop! something went wrong',
    });
  }
};
