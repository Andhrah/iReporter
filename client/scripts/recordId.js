const  recordId = (record) => {
  localStorage.setItem('id', record.id);
  const id = localStorage.getItem('id');
  console.log(id);
};
