import db from '../../../models/red-flag';

const createRedFlag = (req, res) => {
  const {
    createdOn,
    createdBy,
    type,
    location,
    status,
    images,
    video,
    comment,
  } = req.body;
  const lastRedFlag = db[db.length - 1];
  const newRedFlag = {
    id: lastRedFlag.id + 1,
    createdOn,
    createdBy,
    type,
    location,
    status,
    images,
    video,
    comment,
  };
  db.push(newRedFlag);
  res.json({
    state: 201,
    data: [{
      id: newRedFlag.id,
      message: 'Red-Flag created successfully',
    }],
  });
};

export default createRedFlag;
