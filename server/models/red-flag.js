export default [
  // SCHEMA SETUP
  {
    id: 1,
    createdOn: new Date().toString(),
    createdBy: 1, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'Resolved', // [draft, under investigation, resolved, rejected]
    Images: ['image1', 'image2'],
    Videos: ['video1', 'video2'],
    comment: 'Political corruption is a persistent phenomenon in Nigeria.',
  },
  {
    id: 2,
    createdOn: new Date().toString(),
    createdBy: 5, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'Draft', // [draft, under investigation, resolved, rejected]
    Images: ['image1', 'image2'],
    Videos: ['video1', 'video2'],
    comment: 'Government should do something about corruption in the public hospitals',
  },
  {
    id: 3,
    createdOn: new Date().toString(),
    createdBy: 4, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'Rejected', // [draft, under investigation, resolved, rejected]
    Images: ['image1', 'image2'],
    Videos: ['video1', 'video2'],
    comment: 'Corruption is the single greatest obstacle preventing Nigeria from achieving its enormous potential.',
  },
  {
    id: 4,
    createdOn: new Date().toString(),
    createdBy: 3, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'Under Investigation', // [draft, under investigation, resolved, rejected]
    Images: ['image1', 'image2'],
    Videos: ['video1', 'video2'],
    comment: 'Corruption has become the order of the day in Nigeria',
  },
  {
    id: 5,
    createdOn: new Date().toString(),
    createdBy: 2, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'Under Investigation', // [draft, under investigation, resolved, rejected]
    Images: ['image1', 'image2'],
    Videos: ['video1', 'video2'],
    comment: 'Bribery and Emblezzlement have dominated the common sense of people today',
  },
];