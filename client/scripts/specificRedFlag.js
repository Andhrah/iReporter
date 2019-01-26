window.onload = () => {
  const incidentContainer = document.getElementById('single-red-flag');
  const id = localStorage.getItem('id');
  console.log(id);
  (async () => {
    console.log('Am working :)');
    const url = `https://ireporter-1.herokuapp.com/api/v1/red-flags/${id}`;
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

    if (responseData.status === 200 && responseData.data.length !== 0) {
      const data = responseData.data;
      localStorage.setItem('comment', data[0].comment);
      localStorage.setItem('location', data[0].location);
      console.log(data);

      const imageLg = document.getElementById('image-lg');
      imageLg.setAttribute('src', '../UI/assests/images/ireporterLogo.png');
      // imageLg.setAttribute('src', data[0].images[0]);

      const username  = localStorage.getItem('username');
      const author = document.getElementById('created-by');
      const createdOn = document.getElementById('created-on');
      createdOn.append(`created on ${new Date(data[0].created_on).toDateString()}`)
      author.append(` by ${username}`);

      const location = document.getElementById('location-paragraph');
      const locationSpanEm = document.getElementById('lacation-span-em');
      locationSpanEm.append(data[0].location);

      const status = document.getElementById('statusEm');
      status.append(data[0].status);

      const corruptionMethods = document.getElementById('corruption-methods');
      corruptionMethods.append(`Corruption Method(s): ${data[0].corruption_methods}`);
      const corruptionDate = document.getElementById('corruption-date');
      corruptionDate.append(new Date(data[0].corruption_date).toDateString());

      const comment = document.getElementById('main-comment');
      comment.append(data[0].comment);
    };
  })();
};
