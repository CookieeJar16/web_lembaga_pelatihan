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
