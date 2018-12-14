import intervention from '../../models/intervention';
import pool from '../../config';

export const createIntervention = async (req, res) => {
  const {
    location,
    images,
    video,
    comment,
  } = req.body;

  const sql = 'INSERT INTO interventions(created_on, created_by, location, status, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [
    new Date(),
    2,
    location,
    'Under Investigation',
    images.split(','),
    video.split(','),
    comment,
  ];
  try {
    const data = await pool.query(sql, values);
    if (data) {
      return res.status(201).json({
        status: 201,
        message: 'incident has been created',
        data,
      });
    }
  } catch (err) {
    console.log(err);
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
      return res.status(404).json({
        status: 404,
      });
    });
};

export const getSpecificIntervention = (req, res) => {
  const { id } = req.params;
  intervention.findById(id).then(results => {
    console.log(results);
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
  }).catch(err => res.status(404).json({
    status: 404,
    error: 'Intervention not found',
  }));
};

export const editLocationIntervention = (req, res) => {
  intervention.findByIdAndEditLocation(req.params.id, req.body.location)
    .then(results => {
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
      error: 'Intervention Not Found',
    }));
};

export const editCommentIntervention = (req, res) => {
  console.log(req.body.comment);
  intervention.findByIdAndEditComment(req.params.id, req.body.comment)
    .then(results => {
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
    })
    .catch(err => res.status(404).json({
      status: 404,
      error: 'error occured',
    }));
};

export const deleteIntervention = (req, res) => {
  intervention.findById(req.params.id).then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Intervention Not Found',
      });
    }
    intervention.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.status(200).json({
          status: 200,
          dataDeleted: result,
          message: 'deleted successfully',
        });
      })
      .catch(err => {
        return res.status(404).json({
          status: 404,
          error: 'Intervention Not Found',
        });
      });
  });
};
