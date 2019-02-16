window.onload = () => {
  const profile = document.getElementById('profile');

  const usernameContainer = document.createElement('div');
  usernameContainer.classList.add('details');
  const usernameParagraph = document.createElement('p');
  const usernameParagraphText = document.createElement('strong');
  usernameParagraphText.append('Username:');
  usernameParagraph.appendChild(usernameParagraphText);
  const username = document.createElement('p');
  const savedUsername = localStorage.getItem('username');
  username.append(savedUsername);
  usernameContainer.appendChild(usernameParagraph);
  usernameContainer.appendChild(username);

  profile.appendChild(usernameContainer);
  console.log(usernameContainer);

  const namesContainer = document.createElement('div');
  namesContainer.classList.add('details');
  const namesParagraph = document.createElement('p');
  const namesParagraphText = document.createElement('strong');
  namesParagraphText.append('Name:');
  namesParagraph.appendChild(namesParagraphText);
  const names = document.createElement('p');
  const savedFirstname = localStorage.getItem('firstName');
  const savedLastname = localStorage.getItem('lastName');
  const bothNames = `${savedFirstname} ${savedLastname}`;
  names.append(bothNames);
  namesContainer.appendChild(namesParagraph);
  namesContainer.appendChild(names);

  profile.appendChild(namesContainer);
  console.log(namesContainer);

  const emailContainer = document.createElement('div');
  emailContainer.classList.add('details');
  const emailParagraph = document.createElement('p');
  const emailParagraphText = document.createElement('strong');
  emailParagraphText.append('Email:');
  emailParagraph.appendChild(emailParagraphText);
  const email = document.createElement('p');
  const savedEmail = localStorage.getItem('email');
  email.append(savedEmail);
  emailContainer.appendChild(emailParagraph);
  emailContainer.appendChild(email);

  profile.appendChild(emailContainer);
  console.log(emailContainer);

  const phoneNumberContainer = document.createElement('div');
  phoneNumberContainer.classList.add('details');
  const phoneNumberParagraph = document.createElement('p');
  const phoneNumberParagraphText = document.createElement('strong');
  phoneNumberParagraphText.append('Phone Number:');
  phoneNumberParagraph.appendChild(phoneNumberParagraphText);
  const phoneNumber = document.createElement('p');
  const savedphoneNumber = localStorage.getItem('phoneNumber');   
  phoneNumber.append(savedphoneNumber);
  phoneNumberContainer.appendChild(phoneNumberParagraph);
  phoneNumberContainer.appendChild(phoneNumber);

  profile.appendChild(phoneNumberContainer);
  console.log(phoneNumberContainer);

  const totalRecord = document.getElementById('total-record');
  const totalRedFlag = localStorage.getItem('totalRedFlag');
  totalRecord.append(totalRedFlag);

}