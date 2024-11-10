let = currentPage = 1;
const limit = 10;


//USER
document.getElementById('add-user-btn').addEventListener('click', function() {
  if (document.getElementById('container-add').style.display === 'none' || document.getElementById('container-add').style.display === '') {
    document.getElementById('container-add').style.display = 'block';
  }
});


//Trainer
document.getElementById('add-trainer-btn').addEventListener('click', function() {
  if (document.getElementById('container-add-trainer').style.display === 'none' || document.getElementById('container-add-trainer').style.display === '') {
    document.getElementById('container-add-trainer').style.display = 'block';
  }
})


//Program
document.getElementById('add-program-btn').addEventListener('click', function() {
  if (document.getElementById('container-add-program').style.display === 'none' || document.getElementById('container-add-program').style.display === '') {
    document.getElementById('container-add-program').style.display = 'block';
  }
})


//Article
document.getElementById('add-article-btn').addEventListener('click', function() {
  if (document.getElementById('container-add-article').style.display === 'none' || document.getElementById('container-add-article').style.display === '') {
    document.getElementById('container-add-article').style.display = 'block';
  }
})

//USER
document.getElementById('add-btn-1').addEventListener('click', function() {
  addUser();
});


//Trainer
document.getElementById('add-btn-2').addEventListener('click', function() {
  addTrainer();
})


//Program
document.getElementById('add-btn-3').addEventListener('click', function() {
  addProgram();
})


//Article
document.getElementById('add-btn-4').addEventListener('click', function() {
  addArticle();
})


//FUNCTION ADD
function addUser() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('contact-number');
  const address = document.getElementById('address');
  const password = document.getElementById('password');

  fetch('http://localhost/M1/Backend/controller.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action : 'addUser',
      nama: name.value,
      email: email.value,
      no_telp: phone.value,
      alamat: address.value,
      password: password.value
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success){
        alert("Add user success");
        location.reload();
      } else {
        alert("Add user failed");
      }
    });
}
function addTrainer() {
  const name = document.getElementById('name-trainer');
  const email = document.getElementById('email-trainer');
  const phone = document.getElementById('contact-number-trainer');
  const address = document.getElementById('address-trainer');
  const password = document.getElementById('password-trainer');

  fetch('http://localhost/M1/Backend/controller.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action : 'addTrainer',
      nama: name.value,
      email: email.value,
      no_telp: phone.value,
      alamat: address.value,
      password: password.value
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success){
        alert("Add trainer success");
        location.reload();
      } else {
        alert("Add trainer failed");
      }
    });
}

function addProgram() {
  const program = document.getElementById('program');
  const deskripsi = document.getElementById('deskripsi');
  const jadwal = document.getElementById('jadwal');
  const materi = document.getElementById('materi');

  fetch('http://localhost/M1/Backend/controller.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action : 'addProgram',
      nama_program: program.value,
      deskripsi: deskripsi.value,
      jadwal: jadwal.value,
      materi: materi.value
    })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success){
        alert("Add program success");
        location.reload();
      } else {
        alert("Add program failed");
      }
    })
}

function addArticle() {
  const judul = document.getElementById('judul-berita').value;
  const berita = document.getElementById('isi-berita').value;
  const tanggal = document.getElementById('tanggal').value;
  const foto = document.getElementById('foto-berita').files[0];
  const kategori = document.getElementById('kategori').value;

  const formData = new FormData();
  formData.append('action', 'addArticle');
  formData.append('judul_berita', judul);
  formData.append('isi_berita', berita);
  formData.append('tanggal_publikasi', tanggal);
  formData.append('id_kategori', kategori);
  formData.append('foto_berita', foto);

  fetch('http://localhost/M1/Backend/controller.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success){
        alert("Add article success");
        location.reload();
      } else {
        alert("Add article failed");
        console.log(data);
      }
    })
}

//FUNCTION EDIT
function editUser(id){
  if(document.getElementById('container-edit').style.display === 'none' || document.getElementById('container-edit').style.display === '') {
    document.getElementById('container-edit').style.display = 'block';
      document.getElementById('edit-btn-1').addEventListener('click', function() {
        const name = document.getElementById('edit-name');
        const email = document.getElementById('edit-email');
        const phone = document.getElementById('edit-contact-number');
        const address = document.getElementById('edit-address');
        const password = document.getElementById('edit-password');

        const data = {
          action: 'editUser',
          id: id,
          nama: name.value,
          email: email.value,
          no_telp: phone.value,
          alamat: address.value,
          password: password.value
        };
      
        fetch('http://localhost/M1/Backend/controller.php', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if (data.error){
              alert(data.error);
            } else {
              alert("Edit user success");
              location.reload();
            }
          })
          .catch(error => console.error('Error:', error));
            })
          }
  } 

function editTrainer(id){
  if(document.getElementById('container-edit-trainer').style.display === 'none' || document.getElementById('container-edit-trainer').style.display === '') {
    document.getElementById('container-edit-trainer').style.display = 'block';
      document.getElementById('edit-btn-2').addEventListener('click', function() {
        const name = document.getElementById('edit-name-trainer');
        const email = document.getElementById('edit-email-trainer');
        const phone = document.getElementById('edit-contact-number-trainer');
        const address = document.getElementById('edit-address-trainer');
        const password = document.getElementById('edit-password-trainer');

        const data = {
          action: 'editTrainer',
          id: id,
          nama: name.value,
          email: email.value,
          no_telp: phone.value,
          alamat: address.value,
          password: password.value
        };
      
        fetch('http://localhost/M1/Backend/controller.php', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if (data.error){
              alert(data.error);
            } else {
              alert("Edit trainer success");
              location.reload();
            }
          })
          .catch(error => console.error('Error:', error));
            })
          }
}

function editProgram(id){
  if(document.getElementById('container-edit-program').style.display === 'none' || document.getElementById('container-edit-program').style.display === '') {
    document.getElementById('container-edit-program').style.display = 'block';
      document.getElementById('edit-btn-3').addEventListener('click', function() {
        const program = document.getElementById('edit-program');
        const deskripsi = document.getElementById('edit-deskripsi');
        const jadwal = document.getElementById('edit-jadwal');
        const materi = document.getElementById('edit-materi');

        const data = {
          action: 'editProgram',
          id: id,
          nama_program: program.value,
          deskripsi: deskripsi.value,
          jadwal: jadwal.value,
          materi: materi.value
        };
      
        fetch('http://localhost/M1/Backend/controller.php', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if (data.error){
              alert(data.error);
            } else {
              alert("Edit program success");
              location.reload();
            }
          })
          .catch(error => console.error('Error:', error));
            })
          }
}

function editArticle(id){
  if(document.getElementById('container-edit-article').style.display === 'none' || document.getElementById('container-edit-article').style.display === '') {
    document.getElementById('container-edit-article').style.display = 'block';
      document.getElementById('edit-btn-4').addEventListener('click', function() {
        const judul = document.getElementById('edit-judul-berita').value;
        const berita = document.getElementById('edit-isi-berita').value;
        const tanggal = document.getElementById('edit-tanggal').value;
        const foto = document.getElementById('edit-foto-berita').files[0];
        const kategori = document.getElementById('edit-kategori').value;
            
        const formData = new FormData();
        formData.append('action', 'editArticle');
        formData.append('id_berita', id);
        formData.append('judul_berita', judul);
        formData.append('isi_berita', berita);
        formData.append('tanggal_publikasi', tanggal);
        formData.append('id_kategori', kategori);
        formData.append('foto_berita', foto);
            
        fetch('http://localhost/M1/Backend/controller.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.success){
              alert("Add article success");
              location.reload();
            } else {
              alert("Add article failed");
              console.log(data);
            }
          })
      })
  }
}


//FUNCTION LOAD
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
              <button class="action-btn edit-btn" onclick="editUser(${user.id})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Delete</button>
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
              <button class="action-btn edit-btn" onclick="editTrainer(${trainer.id})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteTrainer(${trainer.id})">Delete</button>
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
          <td>${program.materi}</td>
          <td>
              <button class="action-btn edit-btn" onclick="editProgram(${program.id_program})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteProgram(${program.id_program})">Delete</button>
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
              <button class="action-btn edit-btn" onclick="editArticle(${article.id_berita})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteArticle(${article.id_berita})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
}

window.onload = loadUsers(), loadTrainers(), loadPrograms(), loadArticles();