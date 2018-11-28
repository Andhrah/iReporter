export default [
  {
    id: 1,
    createdOn: newDate(),
    createdBy: 1, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'resolved', // [draft, under investigation, resolved, rejected]
    Images: [Image, Image],
    Videos: [Image, Image],
    comment: 'Political corruption is a persistent phenomenon in Nigeria.',
  },

  {
    id: 2,
    createdOn: newDate(),
    createdBy: 5, // represents the user who created this record
    type: 'Intervention', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'draft', // [draft, under investigation, resolved, rejected]
    Images: [Image, Image],
    Videos: [Image, Image],
    comment: 'Government should do something about bad roads',
  },

  {
    id: 3,
    createdOn: newDate(),
    createdBy: 4, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.605874, 3.349149.', // Lat Long coordinates
    status: 'rejected', // [draft, under investigation, resolved, rejected]
    Images: [Image, Image],
    Videos: [Image, Image],
    comment: 'Corruption is the single greatest obstacle preventing Nigeria from achieving its enormous potential.',
  },
];
