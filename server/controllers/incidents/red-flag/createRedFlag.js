import db from '../../../models/red-flag';

const createRedflag = (req, res) => {
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
    id: lastRedFlag + 1,
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
    message: 'Red-Flag created successfully',
  });
};

export default createRedflag;
