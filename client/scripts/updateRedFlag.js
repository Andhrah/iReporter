// Get the modal
const modal = document.getElementById('myModal');
// Get the button that opens the modal
const editBtn = document.getElementById('edit-btn');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];
// When the user clicks on the edit-button, open the modal 
editBtn.onclick = () => {
  console.log('Am working, Modal is working');
  modal.style.display = 'block';
};
// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = 'none';
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};


//////////////////////////////////////
// modal for editing Comment
/////////////////////////////////////
const commentModal = document.getElementById('commentModal'),
      editComment = document.getElementById('edit-btn-comment'),
      commentSpan = document.getElementById('close'),
      mainComment = document.getElementById('comment'),
      saveComment = document.getElementById('save-btn-comment');

editComment.onclick = () => {
  modal.style.display = 'none';
  commentModal.style.display = "block";
  mainComment.append(localStorage.getItem('comment'));
  console.log('comment edited');
};

saveComment.onclick = () => {
  const id = localStorage.getItem('id');
  (async () => {
    const url = `https://ireporter-1.herokuapp.com/api/v1/red-flags/${id}/comment`;
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        comment: mainComment.value,
      }),
    };

    // Edit red-flag record's comment or make a patch request to save in database
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.status === 200) {
      location.reload(true);
    }
  })();
}

// when a user clicks on the cancel symbol, close the modal
commentSpan.onclick = () => {
  commentModal.style.display = 'none';
};


///////////////////////////////////////
// modal for editing Location
//////////////////////////////////////
const locationModal = document.getElementById('locationModal'),
      editLocation = document.getElementById('edit-btn-location'),
      locationSpan = document.getElementById('close-location-modal'),
      mainLocation = document.getElementById('location'),
      saveLocation = document.getElementById('save-btn-location');

editLocation.onclick = () => {
  modal.style.display = 'none';
  console.log(locationModal);
  locationModal.style.display = "block";
  // mainLocation.append(localStorage.getItem('location'));
  console.log('location edited');
};

saveLocation.onclick = () => {
  if (mainLocation.value === ''){
    const locationError = document.getElementById('location-error');
    locationError.innerHTML = 'Location should not be empty';
    mainLocation.style.borderColor = 'rgb(204, 10, 10)';
  } else {
    mainLocation.style.display = 'rgb(39, 69, 85)';
  }
  const id = localStorage.getItem('id');
  (async () => {
    const url = `https://ireporter-1.herokuapp.com/api/v1/red-flags/${id}/location`;
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        location: mainLocation.value,
      }),
    };

    // Edit red-flag record's comment or make a patch request to save in database
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    // reload page if update was sucessfull
    if (responseData.status === 200) {
      location.reload(true);
    }
  })();
}

// when a user clicks on the cancel symbol, close the modal
locationSpan.onclick = () => {
  locationModal.style.display = 'none';
};