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