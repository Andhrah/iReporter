// get submit button
const createRedFlag = document.getElementById('report-red-flag');

// get checkboxes in the form
const corruptionMethodsCheckboxes = document.getElementsByClassName('corruption-method-input'),
      entityInvolvedCheckboxes = document.getElementsByClassName('entity-involved-input');

const others = document.getElementById('others'),
      otherMethods = document.getElementById('other-methods');

const otherEntity = document.getElementById('other-entity'),
      otherEntityInvolved = document.getElementById('other-entity-involved');

// get other input field value in the form
const comment = document.getElementById('comment'),
      corruptionDate = document.getElementById('when'),
      namesInvolved = document.getElementById('names-involved'),
      images = document.getElementById('images'),
      videos = document.getElementById('videos');
const userId = localStorage.getItem('userId');

// get div container for displaying error in submitting form
const corruptionMethodError = document.getElementById('corruption-method-error'),
      entityInvolvedError = document.getElementById('entity-involved-error');
      commentError = document.getElementById('comment-error');
      locationError = document.getElementById('location-error');
      corruptionDateError = document.getElementById('corruption-date-error');
      namesInvolvedError = document.getElementById('names-involved-error');

// add event listener to the checkbox with label of others
// and if the checkbox is checked, display an input field
others.addEventListener('click', () => {
  const otherMethodInput = document.getElementById('other-method-container');
  if (others.checked) {
    otherMethodInput.style.display = 'block';
  }
  else {
    otherMethodInput.style.display = 'none';
  }
});

otherEntity.addEventListener('click', () => {
  const otherEntityInput = document.getElementById('other-entity-container');
  if (otherEntity.checked) {
    otherEntityInput.style.display = 'block';
  }
  else {
    otherEntityInput.style.display = 'none';
  }
});

createRedFlag.addEventListener('click', (event) => {
  event.preventDefault();

  // declare an empty container for storing corruption methods value
  // and entity involved values
  const corruptionMethods = [];
  const entityInvolved = [];

  for(const checkbox of corruptionMethodsCheckboxes) {
    if (checkbox.checked) {
      console.log(checkbox);
      corruptionMethods.push(checkbox.value);
    } else {
      console.log('This checkbox wasnt checked');
    }
  }

  for(const checkbox of entityInvolvedCheckboxes) {
    if (checkbox.checked) {
      console.log(checkbox);
      entityInvolved.push(checkbox.value);
    } else {
      console.log('This checkbox wasnt checked');
    }
  }

  if (otherMethods.value !== '') {
    corruptionMethods.push(otherMethods.value);
  }

  if (otherEntityInvolved.value !== '') {
    entityInvolved.push(otherEntityInvolved.value);
  }

  console.log(corruptionMethods);
  console.log(entityInvolved);

  (async () => {
    const url = 'https://ireporter-1.herokuapp.com/api/v1/red-flags';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        createdOn: new Date().toDateString(),
        createdBy: userId,
        corruptionMethods,
        entityInvolved,
        location: '6.605874, 6.605874',
        comment: comment.value,
        corruptionDate: corruptionDate.value,
        namesInvolved: namesInvolved.value,
        images: images.value,
        videos: videos.value,
        status: 'Draft',
      }),
    };
    try {
      // check user's input and return error if its empty
      if (corruptionMethods.length === 0) {
        corruptionMethodError.style.display = 'block';
        return corruptionMethodError.innerHTML = 'Choose at least one out of the following Corruption Types'
      }
      corruptionMethodError.style.display = 'none';

      if (entityInvolved.length === 0) {
        entityInvolvedError.style.display = 'block';
        return entityInvolvedError.innerHTML = 'Choose at least one out of the following Entity or People Involved';
      }
      entityInvolvedError.style.display = 'none';
      
      if (comment.value === '') {
        commentError.style.display = 'block';
        return commentError.innerHTML = 'Description about corruption should not be empty';
      }


      if (corruptionDate.value === '') {
        corruptionDateError.style.display = 'block';
        return corruptionDateError.innerHTML = 'Please, corruption period cannot be empty';
      }
      corruptionDateError.style.display = 'none';

      if (namesInvolved.value === '') {
        namesInvolvedError.style.display = 'block';
        return namesInvolvedError.innerHTML = 'Write at least one name Involved or write the word "None"';
      }
      namesInvolvedError.style.display = 'none'

      // create red-flag record or make a post request
      const response = await fetch(url, options);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 201) {
        window.location.assign('all-red-flag.html');
      }
    } catch (err) {
      console.log(err);
    }
  })();
});
