const registerForm = document.getElementById("registerForm");
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

if (registerEmailInput.value.trim() === "" || !isValidEmail(registerEmailInput.value.trim())) {
  shakeElement(registerEmailInput);  
  registerEmailInput.style.border = "1px solid red";  
}

if (registerPasswordInput.value.trim() === "") {
  shakeElement(registerPasswordInput); 
}

if (confirmPasswordInput.value.trim() !== registerPasswordInput.value.trim()) {
  shakeElement(confirmPasswordInput);
}

if (isValid) {
  fetch('http://localhost/M1/Backend/controller.php',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'register',
      email: registerEmailInput.value,
      password: registerPasswordInput.value
    })
  })
  .then(response => response.json())
  .then(data => 
    {
      if (data.success) {
        alert("Registrasi Berhasil");
        location.href = "../Login/login.html";
      } else {
        alert("Registrasi Gagal");
      }
    })
  .catch(error =>
    console.error('Error:', error)
  );
}
});

