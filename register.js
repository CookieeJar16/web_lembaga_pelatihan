//registration validation
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

// Periksa apakah konfirmasi password sama dengan password
if (confirmPasswordInput.value.trim() !== registerPasswordInput.value.trim()) {
  shakeElement(confirmPasswordInput);
  isValid = false;
}
if (!isValid) {
  event.preventDefault();
}
});