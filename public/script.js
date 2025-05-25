const API_URL = '/api';

async function login(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } else {
    alert(data.message);
  }
}

async function register(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('Usuario registrado con éxito');
    window.location.href = 'login.html';
  } else {
    alert(data.error || 'Error');
  }
}

async function getUsers() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: token }
  });

  const users = await res.json();
  const div = document.getElementById('user-list');
  users.forEach(user => {
    const p = document.createElement('p');
    p.textContent = `${user.username} (${user.email})`;
    div.appendChild(p);
  });
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

if (window.location.pathname.includes('index.html')) {
  getUsers();
}