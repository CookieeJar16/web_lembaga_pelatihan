const kartu = document.getElementById('kartu-peserta');
const saveButton = document.getElementById('save-btn');
const seeCard = document.getElementById('see-card');
const nama = document.getElementById('name');
const email = document.getElementById('email');
const contactNumber = document.getElementById('contact-number');
const address = document.getElementById('address');
const saveBtn = document.getElementById('save-btn');
const nameCard = document.getElementById('nameCard');
const emailCard = document.getElementById('emailCard');
const contactNumberCard = document.getElementById('contactCard');
const addressCard = document.getElementById('addressCard');

document.getElementById('back').addEventListener('click', function() {
    window.location.href = '../index.html';
});

document.getElementById('editProfile').addEventListener('click', function() {
    if(saveButton.style.display === 'none' || saveButton.style.display === '') {
        seeCard.style.display = 'none';
        saveButton.style.display = 'block';
        document.getElementById('name').disabled = false;
        document.getElementById('contact-number').disabled = false;
        document.getElementById('address').disabled = false;
        document.getElementById('pic-profile').addEventListener('mouseover', function() {
            document.getElementById('editPic').style.display = 'block';
            document.getElementById('editPic').style.cursor = 'pointer';
            document.getElementById('usericon').style.opacity = '20%';
        document.getElementById('pic-profile').addEventListener('mouseout', function() {
            document.getElementById('editPic').style.display = 'none';
            document.getElementById('usericon').style.opacity = '100%';
            });
        });
    } else {
        seeCard.style.display = 'block';
        saveButton.style.display = 'none';
        document.getElementById('name').disabled = true;
        document.getElementById('contact-number').disabled = true;
        document.getElementById('address').disabled = true;
    }
});


document.getElementById('see-card').addEventListener('click', function() {
    if(kartu.style.display === 'none' || kartu.style.display === '') {
        kartu.style.display = 'block';
        kartu.classList.add('animate-fade-in');
        kartu.classList.remove('animate-fade-out');
    }
})

kartu.addEventListener('click', function() {
    if(kartu.style.display === 'block') 
        kartu.style.display = 'none'; 
})

document.addEventListener('DOMContentLoaded', function() {
    fetchProfile();
});

saveBtn.addEventListener('click', function() {
    updateProfile();
});

function form(){
    nama.value = data.nama || '';
    email.value = data.email || '';
    contactNumber.value = data.no_telp || '';
    address.value = data.alamat || '';
}

function updateProfile() {
    const data = {
        action: 'updateProfile',
        nama : nama.value,
        no_telp : contactNumber.value,
        alamat : address.value
    };

    fetch('http://localhost/M1/Backend/controller.php',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    if (data.message) {
        console.log(data.message);
        alert("Profile updated successfully");
        location.reload();
    } else if (data.error) {
        console.error(data.error);
        alert("Error updating profile: " + data.error);
    }
    })
    .catch(error => console.error('Error:', error));
}

function fetchProfile() {
    fetch(`http://localhost/M1/Backend/controller.php/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            nama.value = data.nama;
            email.value = data.email;
            contactNumber.value = data.no_telp;
            address.value = data.alamat;
            nameCard.innerText = `Nama     : ${data.nama}`;
            emailCard.innerText = `Email    : ${data.email}`;
            contactNumberCard.innerText = `Nomor Hp : ${data.no_telp}`;
            addressCard.innerText = `Alamat   : ${data.alamat}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}