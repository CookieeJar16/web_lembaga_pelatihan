document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const formMessage = document.getElementById('formMessage');

  if (name && email && message) {
      formMessage.textContent = 'Thank you, ' + name + '! Your message has been sent successfully.';
      formMessage.style.color = 'green';
      document.getElementById('contactForm').reset();
  } else {
      formMessage.textContent = 'Please fill out all fields!';
      formMessage.style.color = 'red';
  }
});

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = 'none';
}

function btnlogin() {
  window.location.href = "../Login/login.html";
}