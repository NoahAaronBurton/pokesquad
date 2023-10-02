const loginButton = document.getElementById('submit');

const loginFormHandler = async (event) => {
  console.log('log in button clicked')
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
       const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        if (response.status === 422) {
          const error = await response.json();
          console.log(error)
          alert(error.message);
        } else {
          alert(response.statusText)
        }
      }
    }
  };
  
  
  
loginButton.addEventListener('click', loginFormHandler);
  
