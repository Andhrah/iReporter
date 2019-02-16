const login = document.getElementById('login');

login.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email/username').value,
        username = document.getElementById('email/username').value,
        password = document.getElementById('password').value;

  const loginError = document.getElementById('login-error'),
        email_usernameError = document.getElementById('email/username-error'),
        passwordError = document.getElementById('password-error');

  (async () => {
    const url = 'https://ireporter-1.herokuapp.com/api/v1/auth/login';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    }
    try {
      // check if the user's details are empty
      if (email === '') {
        email_usernameError.style.display = 'block';
        return email_usernameError.innerHTML = 'Email/Username is required';
      }
      email_usernameError.style.display = 'none';

      if (password === '') {
        passwordError.style.display = 'block';
        return passwordError.innerHTML = 'Password is required';
      }
      passwordError.style.display = 'none';

      // login user or make a post request
      const response = await fetch(url, options);
      const responseData = await response.json();

      // checking if email/username and password are correct
      if (responseData.status == 401) {
        loginError.style.display = 'block';
        return loginError.innerHTML = 'Incorrect Email/Username or Password';
      }
      loginError.style.display = 'none';

      // if email/username and password are correct
      // store the authorization token for access through other pages
      if (responseData.status === 200) {
        localStorage.setItem('Authorization', responseData.data[0].token);
        window.location.assign('index.html');
      }
    } catch (err) {
      console.log(err);
      loginError.style.display = 'block';
      return loginError.innerHTML = 'An Error Occured, Please check your internet connection and try again';
    } 
  })();
});
