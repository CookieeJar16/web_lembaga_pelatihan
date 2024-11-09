const password = document.getElementById('password');
const pwtoggle = document.getElementById('showPw');
const pwhide = document.getElementById('hidePw');

pwtoggle.addEventListener('click', showPassword);
pwhide.addEventListener('click', hidePassword);

function showPassword() {
  if (password.type == 'password') {
    password.type = 'text';
    pwhide.style.display = 'block';
    pwtoggle.style.display = 'none';
  } else {
    password.type = 'password';
  }
}

function hidePassword() {
  if (password.type == 'text') {
    password.type = 'password';
    pwtoggle.style.display = 'block';
    pwhide.style.display = 'none';
  } else {
    password.type = 'text';
  }
}

const form = document.getElementById("signInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const iconErrorEmail = document.getElementById("iconErrorEmail");
const iconErrorPassword = document.getElementById("iconErrorPassword");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.includes("admin")) {
    return true;
  }

  return emailRegex.test(email);
}

function shakeElement(element){
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 500);
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let isValid = true;

  emailError.style.display = "none";
  emailInput.classList.remove("error");
  passwordError.style.display = "none";
  passwordInput.classList.remove("error");

  if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value.trim())) {
      emailError.style.display = "block";
      emailInput.classList.add("error");
      iconErrorEmail.style.display = "inline";
      shakeElement(emailInput);
      return;
  }
  if (passwordInput.value.trim() === "") {
      passwordError.style.display = "block";
      passwordInput.classList.add("error");
      iconErrorPassword.style.display = "inline";
      shakeElement(passwordInput);
      return;
  }

  if (isValid) {
    fetch('http://localhost/M1/Backend/controller.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'login',
        email: emailInput.value,
        password: passwordInput.value
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Login Berhasil");
        window.location.href = "../index.html";
      } else {
        alert("Email atau Password yang anda masukkan salah");
      }
    })
    .catch(error => {
      console.error(error);
    });
  } 
});

