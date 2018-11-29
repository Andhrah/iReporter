import db from '../../../models/red-flag';

const editComment = (req, res) => {
  const redFlag = db.find(redFlagInDb => redFlagInDb.id === Number(req.params.id));
  if (!redFlag) {
    return res.json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  redFlag.comment = req.body.comment;
  res.json({
    status: 200,
    data: [{
      id: redFlag.id,
      message: 'Updated red-flag record\'s comment',
    }],
  });
};

export default editComment;
