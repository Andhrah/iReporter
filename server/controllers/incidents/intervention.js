import intervention from '../../models/intervention';

export const createIntervention = (req, res) => {
  const { location, images, video, comment } = req.body;
  const newIntervention = {
    location,
    images,
    video,
    comment,
    createdBy: 2,
  };
  // console.log(newIntervention);
  intervention.createIntervention(newIntervention).then(data => {
    return res.status(201).json({
      status: 201,
      data,
    });
  }).catch((err) => {
    console.log('>>>>>>>>', err);
    res.status(404).json({
      status: 404,
      // Get all the intervention from the DB
    });
  });
};

// Get all the interventions from the DB(data structure)
export const getInterventions = (req, res) => {
  intervention.findAll().then(results => {
    if (results.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Red-flag Not Found',
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
