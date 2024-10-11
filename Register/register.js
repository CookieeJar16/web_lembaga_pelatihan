const registerForm = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const registerEmailInput = document.getElementById("registerEmail");
const registerPasswordInput = document.getElementById("registerPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

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

registerForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let isValid = true;

  if (usernameInput.value.trim() === "") {
    shakeElement(usernameInput);
    isValid = false;
}

  if (registerEmailInput.value.trim() === "" || !isValidEmail(registerEmailInput.value.trim())) {
    shakeElement(registerEmailInput);
    isValid = false;
}

if (registerPasswordInput.value.trim() === "") {
  shakeElement(registerPasswordInput);
  isValid = false;
}

if (confirmPasswordInput.value.trim() !== registerPasswordInput.value.trim()) {
  shakeElement(confirmPasswordInput);
  isValid = false;
}
if (isValid) {
  const userData = {
    username: usernameInput.value.trim(),
    email: registerEmailInput.value.trim(),
    password: registerPasswordInput.value.trim(),
};
sessionStorage.setItem('account', JSON.stringify(userData));
sessionStorage.setItem('isLoggedIn', true);

alert('Register berhasil!');

window.location.href = '../Login/login.html';
}
});