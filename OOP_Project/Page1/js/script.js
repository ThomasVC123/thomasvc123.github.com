function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loader = document.querySelector('.loader'); 
  if (username.trim() === '') {
      showMessage('Please enter your username');
      return;
  }
  if (password.trim() === '') {
      showMessage('Please enter your password');
      return;
  }
  
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = storedUsers.find(user => user.username === username);

  if (currentUser && password === currentUser.password) {
    loader.style.display = 'block';
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', true);
      loader.style.display = 'none';
      showMessage('Login successful');
    }, 1000);
    setTimeout(() => {
      if (username === 'admin') {
        window.location.href = 'admin.html';
      } else if (username === 'kaat') {
        window.location.href = 'kaat.html';
      } else if (username === 'thomas') {
        window.location.href = 'thomas.html';
      }
    }, 2000);
  } else if (currentUser && password !== currentUser.password) {
    showMessage('Invalid password');
    return;
  } else {
    if (username === 'admin' || username === 'thomas') {
      const newPassword = prompt('Please set a new password');
      if (newPassword.trim() === '') {
        showMessage('Please enter a valid password');
        return;
      }
      storedUsers.push({ username, password: newPassword });
      localStorage.setItem('users', JSON.stringify(storedUsers));
      login();
    } else {
      showMessage('Invalid username');
      return;
    }
  }
}
