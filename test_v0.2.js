const slideContainer = document.querySelector('.carousel-slide');
const slides = document.querySelectorAll('.carousel-slide img, .carousel-slide iframe'); 
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = slides.length;
let slideInterval; 

slideContainer.style.transform = `translateX(${-currentIndex * 100}%)`;

function updateSlidePosition() {
    slideContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlidePosition();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1;
    }
    updateSlidePosition();
}

nextButton.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide(); 
});

prevButton.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide(); 
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlidePosition();
        stopAutoSlide(); 
    });
});

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3000); 
}

function stopAutoSlide() {
    clearInterval(slideInterval); 
}

function resetAutoSlide() {
    stopAutoSlide(); 
    startAutoSlide(); 
}

document.querySelector('.carousel-container').addEventListener('mouseout', () => {
    startAutoSlide();
});

document.querySelector('.carousel-container').addEventListener('mouseover', () => {
    stopAutoSlide();
});

dots[currentIndex].classList.add('active');
startAutoSlide();

function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'none';
}

function btnlogin() {
    window.location.href = "./Login/login.html";
}

const categoryDropdown = document.getElementById('category');
const articles = document.querySelectorAll('.article');

categoryDropdown.addEventListener('change', () => {
    const selectedCategory = categoryDropdown.value;

    articles.forEach(article => {
        if (selectedCategory === 'all') {
            article.style.display = 'flex';
        } else {
            if (article.getAttribute('data-category') === selectedCategory) {
                article.style.display = 'flex';
            } else {
                article.style.display = 'none';
            }
        }
    });
});

const daftarDataScience = document.getElementById('program-1');
const daftarDataEngineer = document.getElementById('program-2');
const daftarBackend = document.getElementById('program-3');
const daftarFrontend = document.getElementById('program-4');

daftarDataScience.addEventListener('click', () => {
    window.location.href = './Program/program_data_science.html';
});

daftarDataEngineer.addEventListener('click', () => {
    window.location.href = './Program/program_data_science.html';
});

daftarBackend.addEventListener('click', () => {     
    window.location.href = './Program/program_data_science.html';
});

daftarFrontend.addEventListener('click', () => {
    window.location.href = './Program/program_data_science.html';
});

const loginBtn = document.getElementById('btn-login');
const userIcon = document.getElementById('user');
const userMenu = document.getElementById('userMenu');
const adminDashboard = document.getElementById('admin');
const dashboard = document.getElementById('dashboard');

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost/M1/Backend/checkSession.php')
        .then(response => response.json())
        .then(data => {

        if (data.isLoggedIn) {
            loginBtn.style.display = 'none';
            userIcon.style.display = 'flex';

            if (data.role === '1') {
                adminDashboard.style.display = 'block';
                dashboard.style.display = 'none';
            } else if (data.role === '2') {
                adminDashboard.style.display = 'none';
                dashboard.style.display = 'block';
            }
        }
        })
    });

userIcon.addEventListener('click', function() {
    if (userMenu.style.display === 'none' || userMenu.style.display === '') {
        userMenu.style.display = 'block';
        userMenu.classList.add('animate-fade-in');
        userMenu.classList.remove('animate-fade-out');
    } else {
        closeMenu();
    }
});

document.addEventListener('click', function(event) {
    if (!userIcon.contains(event.target) && !userMenu.contains(event.target)) {
        closeMenu();
    }
});

function closeMenu() {
    if (userMenu.style.display === 'block') {
        userMenu.classList.remove('animate-fade-in');
        userMenu.classList.add('animate-fade-out');

        userMenu.addEventListener('animationend', function() {
            userMenu.style.display = 'none';
        }, { once: true });
    }
}

document.getElementById('profile').addEventListener('click', function() {
    window.location.href = './Profile/profile.html';
})

document.getElementById('dashboard').addEventListener('click', function() {
    window.location.href = './Dashboard/dashboard.html';
})

document.getElementById('admin').addEventListener('click', function() {
    window.location.href = './Dashboard/adminDashboard.html';
})

document.getElementById('logout').addEventListener('click', function() {
    fetch('http://localhost/M1/Backend/controller.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'logout' })
    })
    .then(response => response.json())
    .then(data => {
        userMenu.style.display = 'none';
        userIcon.style.display = 'none';
        loginBtn.style.display = 'block';
        alert(data.message);
    })
});

document.getElementById('program-nav').addEventListener('click', function(event) {
    event.preventDefault();
    const targetSection = document.querySelector('#program-title');
    
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

function loadCategories() {
    fetch('http://localhost/M1/Backend/controller.php/categories')
        .then(response => response.json())
        .then(categories => {
            const selectElement = document.getElementById('category');
            let optionsHTML = "<option value='all'>All</option>";

            if (categories && categories.length > 0) {
                categories.forEach(category => {
                    optionsHTML += `<option value="${category.id_kategori}">${category.nama_kategori}</option>`;
                });
            } else {
                optionsHTML = "<option value=''>No categories available</option>";
            }

            selectElement.innerHTML = optionsHTML;

            let selectedCategory = 'all';
            console.log(selectedCategory);

            selectElement.addEventListener('change', function(){
                const selectedCategory = selectElement.value;
                console.log(selectedCategory);
            })
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
}

async function fetchArticles() {
    try {

        const response = await fetch('http://localhost/M1/Backend/controller.php/mainArticle'); 
        const data = await response.json();

        if (data.error) {
        console.error(data.error);
        return;
        }
    
        const articleContainer = document.getElementById('article-container');
        articleContainer.innerHTML = '';  
        data.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('article');
        articleCard.dataset.category = article.category; 

        articleCard.innerHTML = `
            <img src="${article.foto_berita}" alt="${article.judul_berita}">
            <div class="article-content">
                <h3>${article.judul_berita}</h3>
                <p id="article-preview">${article.preview_text} ....</p>
                <a href="/M1/Article/article.html?id=${article.id_berita}">Baca Selengkapnya.</a>
            </div>
        `;
        
        articleContainer.appendChild(articleCard);
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        }
    }

    window.onload = loadCategories(), fetchArticles();
