import db from '../../models/red-flag';

export const createRedFlag = (req, res) => {
  const { type, location, images, video, comment } = req.body;
  const lastRedFlag = db[db.length - 1];
  const newRedFlag = {
    id: lastRedFlag.id + 1,
    createdOn: new Date().toString(),
    createdBy: 6,
    type,
    location,
    status: 'Under Investigation',
    images,
    video,
    comment,
  };
  db.push(newRedFlag);
  return res.status(201).json({
    status: 201,
    data: [
      {
        id: newRedFlag.id,
        message: 'Red-Flag created successfully',
        newRedFlag,
      },
    ],
  });
};

export const getRedFlags = (req, res) => {
  return res.status(200).json({
    status: 200,
    data: db, // Get all the red-flags from the DB(data structure)
  });
};

export const getSpecificRedFlag = (req, res) => {
  const redFlag = db.find(
    redflagInDb => redflagInDb.id === Number(req.params.id)
  );
  if (!redFlag) {
    return res.status(404).json({
      status: 404,
      error: 'Red-flag not found',
    });
  }
  return res.status(200).json({
    status: 200,
    data: [redFlag],
  });
};

export const editLocation = (req, res) => {
  const redFlag = db.find(
    redFlagInDb => redFlagInDb.id === Number(req.params.id)
  );
  if (!redFlag) {
    return res.status(404).json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  redFlag.location = req.body.location;
  return res.status(200).json({
    status: 200,
    data: [
      {
        id: redFlag.id,
        message: "Updated red-flag record's location",
        redFlag,
      },
    ],
  });
};

export const editComment = (req, res) => {
  const redFlag = db.find(
    redFlagInDb => redFlagInDb.id === Number(req.params.id)
  );
  if (!redFlag) {
    return res.status(404).json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  redFlag.comment = req.body.comment;
  return res.status(200).json({
    status: 200,
    data: [
      {
        id: redFlag.id,
        message: "Updated red-flag record's comment",
        redFlag,
      },
    ],
  });
};

export const deleteRedFlag = (req, res) => {
  const redFlag = db.find(
    redFlagInDb => redFlagInDb.id === Number(req.params.id)
  );
  if (!redFlag) {
    return res.status(404).json({
      status: 404,
      error: 'Red-flag Not Found',
    });
  }
  const index = db.indexOf(redFlag);
  db.splice(index, 1);
  return res.status(200).json({
    status: 200,
    data: [
      {
        id: redFlag.id,
        message: 'red-flag record has been deleted',
        db,
      },
    ],
  });
};
