import intervention from '../../models/intervention';

export const createIntervention = (req, res) => {
  const { location, images, video, comment } = req.body;
  console.log(req.body);
  const newIntervention = {
    location,
    images,
    video,
    comment,
    createdBy: 2,
  };
  console.log(newIntervention);
  intervention.createIntervention(newIntervention).then(result => {
    console.log(result);
    return res.status(201).json({
      status: 201,
      data: result,
    });
  }).catch((err) => {
    console.log('>>>>>>>>', err);
    res.status(404).json({
      status: 404,
      // Get all the red-flags from the DB(data structure)
    });
  });
};
