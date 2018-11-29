import db from '../../../models/red-flag';

const getRedFlags = (req, res) => {
  res.json({
    status: 200,
    data: db, //Get all the red-flags from the DB(data structure)
  });
};

export default getRedFlags;
