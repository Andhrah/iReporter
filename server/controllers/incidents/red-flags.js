import redFlag from '../../models/red-flag';
import pool from '../../config';

export const createRedFlag = async (req, res) => {
  const {
    location,
    images,
    videos,
    comment,
  } = req.body;

  const sql = 'INSERT INTO red_flags(created_on, created_by, location, status, images, videos, comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
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
        message: 'Red-flag has been created',
        data: data.rows,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: 'Error occured',
    });
  }
};


// Get all the red-flag from the DB(data structure)
export const getRedFlags = (req, res) => {
  redFlag.findAll().then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: results, // Get all the red-flag from the DB
    });
  })
    .catch(err => {
      console.log('>>>>>>>>', err);
      return res.status(404).json({
        status: 404,
      });
    });
};

export const getSpecificRedFlag = (req, res) => {
  const { id } = req.params;
  redFlag.findById(id).then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: results,
    });
  }).catch(err => res.status(404).json({
    status: 404,
    error: 'Red-flag not found',
  }));
};

export const editLocationRedFlag = (req, res) => {
  redFlag.findByIdAndEditLocation(req.params.id, req.body.location)
    .then(results => {
      if (results.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Red-flag Not Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: results,
      });
    }).catch(err => res.status(500).json({
      status: 500,
      error: 'Red-flag Not Found',
    }));
};

export const editCommentRedFlag = (req, res) => {
  redFlag.findByIdAndEditComment(req.params.id, req.body.comment)
    .then(results => {
      if (results.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Red-flag Not Found',
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

export const deleteRedFlag = (req, res) => {
  redFlag.findById(req.params.id).then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag Not Found',
      });
    }
    redFlag.findByIdAndDelete(req.params.id)
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
          error: 'Red-flag Not Found',
        });
      });
  });
};
