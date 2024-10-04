//password toggle
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

//login validation
const form = document.getElementById("signInForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const iconErrorEmail = document.getElementById("iconErrorEmail");
const iconErrorPassword = document.getElementById("iconErrorPassword");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function shakeElement(element){
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 500);
}

form.addEventListener("submit", function(event) {
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
      isValid = false;
  }
  if (passwordInput.value.trim() === "") {
      passwordError.style.display = "block";
      passwordInput.classList.add("error");
      iconErrorPassword.style.display = "inline";
      shakeElement(passwordInput);
      isValid = false;
  }

    if (!isValid) {
        event.preventDefault();
    }
});
