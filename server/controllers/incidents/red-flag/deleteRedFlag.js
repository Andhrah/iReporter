import db from '../../../models/red-flag';

const deleteRedFlag = (req, res) => {
  const redFlag = db.find(redFlagInDb => redFlagInDb.id === Number(req.params.id));
  if (!redFlag) {
    return res.json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  const index = db.indexOf(redFlag);
  db.splice(index, 1);
  res.json({
    status: 200,
    data: [{
      id: redFlag.id,
      message: 'red-flag record has been deleted',
    }],
  });
};

export default deleteRedFlag;
