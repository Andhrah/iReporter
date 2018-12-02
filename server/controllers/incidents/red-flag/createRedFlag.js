import db from '../../../models/red-flag';

const createRedFlag = (req, res) => {
  const {
    type,
    location,

    images,
    video,
    comment,
  } = req.body;
  const lastRedFlag = db[db.length - 1];
  const newRedFlag = {
    id: lastRedFlag.id + 1,
    createdOn: new Date(),
    createdBy: 6,
    type,
    location,
    status: 'Under Investigation',
    images,
    video,
    comment,
  };
  db.push(newRedFlag);
  res.json({
    status: 201,
    data: [{
      id: newRedFlag.id,
      message: 'Red-Flag created successfully',
    }],
  });
};

export default createRedFlag;
