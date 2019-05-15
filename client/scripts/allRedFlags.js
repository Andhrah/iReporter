window.onload = () => {

  const gridContainer = document.getElementById('red-flag-grid-container');
  (async () => {

    console.log('Am working');
    const url = 'https://ireporter-1.herokuapp.com/api/v1/red-flags';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
      },
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.error === 'Failed to authenticate token') {
      window.location.assign('signin.html');
    }
    console.log(responseData.data.length);

    if (responseData.status === 200 && responseData.data.length !== 0) {
      const data = responseData.data;
      console.log(data);

      let totalRedFlag = 0;

      data.forEach(redFlag => {

        const redFlagId = redFlag.id;
        const userId = localStorage.getItem('userId');

        if (redFlag.id === userId) {
          totalRedFlag++;
        }
        
        const incidentContainer = document.createElement('div');
        incidentContainer.classList.add('incident-container-all', 'list', 'all-red-flags');
        
        const imageContainer = document.createElement('div')
        imageContainer.setAttribute('id', 'image-small');
        const images = document.createElement('img');
        images.classList.add('red-flag-image');
        images.setAttribute('alt', 'red-flag incident');
        // if (redFlag.images[0])
        images.setAttribute('src', '../UI/assests/images/ireporterLogo.png');
        // images.setAttribute('src', redFlag.images[0]);
        imageContainer.appendChild(images);

        incidentContainer.appendChild(imageContainer);
        
        const username  = localStorage.getItem('username');
        const createdBy = document.createElement('div');
        createdBy.classList.add('author');
        createdBy.setAttribute('id', 'created-by');
        const createdOn = document.createElement('em');
        createdOn.setAttribute('id', 'created-on');
        const text = new Date(redFlag.created_on).toDateString();
        createdOn.textContent =  `created on ${text}`;
        createdBy.appendChild(createdOn);
        createdBy.append(` by ${username}`);

        incidentContainer.appendChild(createdBy);

        const location = document.createElement('div');
        location.classList.add('location');
        const locationParagraph = document.createElement('p');
        locationParagraph.append('Location:');
        location.appendChild(locationParagraph);
        const locationSpan = document.createElement('span');
        locationParagraph.appendChild(locationSpan);
        const locationSpanEm = document.createElement('em');
        locationSpanEm.append(redFlag.location);
        locationParagraph.appendChild(locationSpanEm);

        incidentContainer.appendChild(location);

        const status = document.createElement('div');
        status.classList.add('status');
        const statusParagraph = document.createElement('p');
        statusParagraph.append('Status:');
        status.appendChild(statusParagraph);
        const statusSpan = document.createElement('span');
        statusParagraph.appendChild(statusSpan);
        const statusSpanEm = document.createElement('em');
        statusSpanEm.append(redFlag.status);
        statusSpan.appendChild(statusSpanEm);

        incidentContainer.appendChild(status);

        const comment = document.createElement('div');
        comment.classList.add('comment');
        const corruptionMethod = document.createElement('h4');
        corruptionMethod.append(redFlag.corruption_methods);
        comment.appendChild(corruptionMethod);
        const commentParagraph = document.createElement('p');
        commentParagraph.append(redFlag.comment.substring(0, 100));
        comment.appendChild(commentParagraph);

        incidentContainer.appendChild(comment);

        const readMore = document.createElement('div');
        const anchor = document.createElement('a');
        anchor.setAttribute('id', redFlagId);
        anchor.classList.add('read-more');
        anchor.setAttribute('onclick', 'recordId(this)');
        anchor.setAttribute('href', 'red-flag.html')
        anchor.append('Read more ');
        readMore.appendChild(anchor);
        const buttonIcon = document.createElement('i');
        buttonIcon.classList.add('fas');
        buttonIcon.classList.add('fa-angle-right');
        anchor.appendChild(buttonIcon);

        incidentContainer.appendChild(readMore);

        gridContainer.appendChild(incidentContainer);
        console.log(incidentContainer);
      });

      localStorage.setItem('totalRedFlag', totalRedFlag);
      console.log(totalRedFlag);
    };
  })();
};
