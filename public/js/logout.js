const logout = async () => {
    // Make a POST request to destroy the session on the back end
     const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If successfully logged out, redirect to the login page
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  //todo: update event listener when front end view is ready
  document.querySelector('#logout').addEventListener('click', logout);