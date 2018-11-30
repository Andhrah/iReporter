import db from '../../../models/red-flag';

const deleteRedFlag = (req, res) => {
  let redFlag = db.find(redFlagInDb => redFlagInDb.id === Number(req.paras.id));
  if (!redFlag) {
    return res.json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  redFlag = '';
  res.json({
    status: 200,
    data: [{
      id: redFlag.id,
      message: 'red-flag record has been deleted',
    }],
  });
};

export default deleteRedFlag;
