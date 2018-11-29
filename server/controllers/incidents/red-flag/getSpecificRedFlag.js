import db from '../../../models/red-flag';

const getSpecificRedFlag = (req, res) => {
  const redFlag = db.find(redflagInDb => redflagInDb.id === Number(req.params.id));
  if (!redFlag) {
    return res.json({
      status: 404,
      error: 'Red-flag not found',
    });
  }
  res.json({
    status: 200,
    data: [redFlag],
  });
};

export default getSpecificRedFlag;
