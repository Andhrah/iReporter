import db from '../../models/red-flag';

export const createRedFlag = (req, res) => {
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

export const getRedFlags = (req, res) => {
  res.json({
    status: 200,
    data: db, // Get all the red-flags from the DB(data structure)
  });
};

export const getSpecificRedFlag = (req, res) => {
  const redFlag = db.find(redflagInDb => redflagInDb.id === Number(req.params.id));
  if (!redFlag) {
    res.json({
      status: 404,
      error: 'Red-flag not found',
    });
  }
  res.json({
    status: 200,
    data: [redFlag], 
  });
};

export const editLocation = (req, res) => {
  const redFlag = db.find(redFlagInDb => redFlagInDb.id === Number(req.params.id));
  if (!redFlag) {
    res.json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  redFlag.location = req.body.location;
  res.json({
    status: 200,
    data: [{
      id: redFlag.id,
      message: 'Updated red-flag record\'s location',
    }],
  });
};

export const editComment = (req, res) => {
  const redFlag = db.find(redFlagInDb => redFlagInDb.id === Number(req.params.id));
  if (!redFlag) {
    res.json({
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

export const deleteRedFlag = (req, res) => {
  const redFlag = db.find(redFlagInDb => redFlagInDb.id === Number(req.params.id));
  if (!redFlag) {
    res.json({
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
