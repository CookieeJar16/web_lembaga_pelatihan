document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
      const accordionContent = button.nextElementSibling;
      
      button.classList.toggle('active');

      if (button.classList.contains('active')) {
          accordionContent.style.display = 'block';
      } else {
          accordionContent.style.display = 'none';
      }
  });
});

const program = document.getElementById("tg-program");
const silabus = document.getElementById("silabus");
const mentor = document.getElementById("mentor");
const jadwal = document.getElementById("jadwal");
const daftarKelas = document.getElementById("daftar-kelas");

program.addEventListener("click", () => {
  window.location.href = "#container-1";
});

silabus.addEventListener("click", () => {
  window.location.href = "#silabus-1";
});

mentor.addEventListener("click", () => {
  window.location.href = "#mentor-1";
});

jadwal.addEventListener("click", () => {
  window.location.href = "#jadwal-1";
});

daftarKelas.addEventListener("click", () => {
  alert("Terima Kasih Sudah Mendaftar");
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