const signup = document.getElementById('signup');

signup.addEventListener('click', (event) => {
  event.preventDefault();
  const firstname = document.getElementById('firstname').value,
        lastname = document.getElementById('lastname').value,
        othername = document.getElementById('othername').value,
        email = document.getElementById('email').value,
        phoneNumber = document.getElementById('phone-number').value,
        username = document.getElementById('username').value,
        password = document.getElementById('password').value,
        confirmPassword = document.getElementById('confirm-password').value;
  
  const signupError = document.getElementById('signup-error'),
        firstnameError = document.getElementById('firstname-error'),
        lastnameError = document.getElementById('lastname-error'),
        othernameError = document.getElementById('othername-error');
        emailError = document.getElementById('email-error'),
        phoneNumberError = document.getElementById('phone-number-error'),
        usernameError = document.getElementById('username-error'),
        passwordError = document.getElementById('password-error'),
        confirmPasswordError = document.getElementById('confirm-password-error');

  (async () => {
    const url = 'https://ireporter-1.herokuapp.com/api/v1/auth/signup';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        othername,
        email,
        phoneNumber,
        username,
        password,
      }),
    };
    try {
      // check if the user's details are empty
      const firstnameInput = document.getElementById('firstname');
      firstnameInput.addEventListener('click', () => {
        firstnameInput.style.borderColor = 'rgb(39, 69, 85)';
        firstnameError.style.display = 'none';
      })
      if (firstname === '' || firstname.length < 3) {
        firstnameInput.style.borderColor = 'rgb(204, 10, 10)';
        firstnameError.style.display = 'block';
        return firstnameError.innerHTML = 'First Name should not be less than 3 letters';
      };

      const lastnameInput = document.getElementById('lastname');
      lastnameInput.addEventListener('click', () => {
        lastnameInput.style.borderColor = 'rgb(39, 69, 85)';
        lastnameError.style.display = 'none';
      });
      if (lastname === '' || lastname.length < 3) {
        lastnameInput.style.borderColor = 'rgb(204, 10, 10)';
        lastnameError.style.display = 'block';
        return lastnameError.innerHTML = 'Last Name should not be less than 3 letters';
      };
      
      const othernameInput = document.getElementById('othername');
        othernameInput.addEventListener('click', () => {
        othernameInput.style.borderColor = 'rgb(39, 69, 85)';
        othernameError.style.display = 'none';
      });
      if (othername && othername.length < 3) {
        othernameInput.style.borderColor = 'rgb(204, 10, 10)';
        othernameError.style.display = 'block';
        return othernameError.innerHTML = 'Other Name should not be less than 3 letters';
      };

      const emailInput = document.getElementById('email');
        emailInput.addEventListener('click', () => {
        emailInput.style.borderColor = 'rgb(39, 69, 85)';
        emailError.style.display = 'none';
      });
      if (email === '') {
        emailInput.style.borderColor = 'rgb(204, 10, 10)';
        emailError.style.display = 'block';
        return emailError.innerHTML = 'Invalid email address';
      };

      const phoneNumberInput = document.getElementById('phone-number');
        phoneNumberInput.addEventListener('click', () => {
        phoneNumberInput.style.borderColor = 'rgb(39, 69, 85)';
        phoneNumberError.style.display = 'none';
      });
      if (phoneNumber === '' || phoneNumber.length < 11) {
        phoneNumberInput.style.borderColor = 'rgb(204, 10, 10)';
        phoneNumberError.style.display = 'block';
        return phoneNumberError.innerHTML = 'Invalid Phone Number';
      };

      const usernameInput = document.getElementById('username');
      usernameInput.addEventListener('click', () => {
        usernameInput.style.borderColor = 'rgb(39, 69, 85)';
        usernameError.style.display = 'none';
      });
      if (username === '' || username.length < 3) {
        usernameInput.style.borderColor = 'rgb(204, 10, 10)';
        usernameError.style.display = 'block';
        return usernameError.innerHTML = 'Username should not be less than 3 letters';
      };

      const passwordInput = document.getElementById('password');
      passwordInput.addEventListener('click', () => {
        passwordInput.style.borderColor = 'rgb(39, 69, 85)';
        passwordError.style.display = 'none';
      });
      if (password === '') {
        passwordInput.style.borderColor = 'rgb(204, 10, 10)';
        passwordError.style.display = 'block';
        return passwordError.innerHTML = 'Password is required';
      };

      const confirmPasswordInput = document.getElementById('confirm-password');
      confirmPasswordInput.addEventListener('click', () => {
        confirmPasswordInput.style.borderColor = 'rgb(39, 69, 85)';
        confirmPasswordError.style.display = 'none';
      });
      if (confirmPassword !== password) {
        confirmPasswordInput.style.borderColor = 'rgb(204, 10, 10)';
        confirmPasswordError.style.display = 'block';
        return confirmPasswordError.innerHTML = 'Password did not match';
      };

      // register user or make a post request
      const response = await fetch(url, options);
      const responseData = await response.json();

      // checking if email/username are already taken by other users
      if (email && responseData.error === 'Email is already taken') {
        emailError.style.display = 'block';
        return emailError.innerHTML = responseData.error;
      }
      emailError.style.display = 'none';

      if (username && responseData.error === 'Username is already taken') {
        usernameError.style.display = 'block';
        return usernameError.innerHTML = responseData.error;
      }
      usernameError.style.display = 'none';

      if (responseData.status === 201) {
        localStorage.setItem('Authorization', responseData.data[0].token);
        localStorage.setItem('userId', responseData.data[0].user[0].id);
        localStorage.setItem('firstName', responseData.data[0].user[0].firstname);
        localStorage.setItem('lastName', responseData.data[0].user[0].lastname);
        localStorage.setItem('email', responseData.data[0].user[0].email);
        localStorage.setItem('username', responseData.data[0].user[0].username);
        localStorage.setItem('phoneNumber', responseData.data[0].user[0].phone_number);
        window.location.assign('index.html');
      }
      console.log(responseData);
    } catch (err) {
      console.log(err);
      signupError.style.display = 'block';
      return signupError.innerHTML = 'An Error Occured, Please check your internet connection and try again'
    }
  })();
})
