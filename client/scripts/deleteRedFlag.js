const deleteRedFlagModal = document.getElementById('delete');

const deleteModal = document.getElementById('deleteModal'),
      deleteRedFlag = document.getElementById('delete-red-flag'),
      cancel = document.getElementById('cancel'),
      deleteSpan = document.getElementById('close-delete-modal');

deleteRedFlagModal.onclick = () => {
  console.log('Am working, Modal is working');
  deleteModal.style.display = 'block';
};

deleteRedFlag.onclick = () => {
  deleteRedFlag.style.display = 'none';
  cancel.style.display = 'none';
  const id = localStorage.getItem('id');
  (async () => {
    const url = `https://ireporter-1.herokuapp.com/api/v1/red-flags/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
      },
    };

    // Delete red-flag record's in database
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    // if the red-flag was deleted, return to all red-flag page
    if (responseData.status === 200) {
      location.assign('all-red-flag.html');
    }
  })();
};

// when a user clicks on the cancel button, close the modal
cancel.onclick = () => {
  deleteModal.style.display = 'none';
};

// when a user clicks on the cancel symbol, close the modal
deleteSpan.onclick = () => {
  deleteModal.style.display = 'none';
};
