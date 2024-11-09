let = currentPage = 1;
const limit = 10;


function loadUsers() {
  fetch('http://localhost/M1/Backend/controller.php/users')
    .then(response => response.json())
    .then(users => {
      const tableBody = document.getElementById('user-list');
      const tbody = document.querySelector('tbody');
      tableBody.appendChild(tbody);

      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.nama}</td>
          <td>${user.email}</td>
          <td>${user.no_telp}</td>
          <td>${user.alamat}</td>
          <td>${user.program}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editItem()">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteItem()">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
}

function loadTrainers() {
  fetch('http://localhost/M1/Backend/controller.php/trainers')
    .then(response => response.json())
    .then(trainers => {
      const tableBody = document.getElementById('trainer-list');
      const tbody = document.querySelector('tbody');
      tableBody.appendChild(tbody);

      trainers.forEach(trainer => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${trainer.id}</td>
          <td>${trainer.nama}</td>
          <td>${trainer.email}</td>
          <td>${trainer.no_telp}</td>
          <td>${trainer.alamat}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editItem()">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteItem()">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
}

function loadPrograms() {
  fetch('http://localhost/M1/Backend/controller.php/programs')
    .then(response => response.json())
    .then(programs => {
      const tableBody = document.getElementById('program-list');
      const tbody = document.querySelector('tbody');
      tableBody.appendChild(tbody);

      programs.forEach(program => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${program.id_program}</td>
          <td>${program.nama_program}</td>
          <td>${program.deskripsi}</td>
          <td>${program.jadwal}</td>
          <td>${program.biaya}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editItem()">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteItem()">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
}

function loadArticles() {
  fetch('http://localhost/M1/Backend/controller.php/adminArticle')
    .then(response => response.json())
    .then(articles => {
      const tableBody = document.getElementById('article-list');
      const tbody = document.querySelector('tbody');
      tableBody.appendChild(tbody);

      articles.forEach(article => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${article.id_berita}</td>
          <td>${article.judul_berita}</td>
          <td>${article.preview_text}</td>
          <td>${article.tanggal_publikasi}</td>
          <td>${article.nama_kategori}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editItem()">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteItem()">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
}

window.onload = loadUsers(), loadTrainers(), loadPrograms(), loadArticles();