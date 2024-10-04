// img slider
const carouselRow = document.querySelector('.slide-row');
const carouselSlide = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('dot');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 1;
var width;

function slideWidth(){
  width = carouselSlide[0].clientWidth;
}
slideWidth();
window.addEventListener('resize', slideWidth);
carouselRow.style.transform = 'translateX(' + (- width * index) + 'px)';

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
function nextSlide() {
  if (index >= carouselSlide.length - 1) {return};
  carouselRow.style.transition = "transform 0.4s ease-in-out";
  index++;
  carouselRow.style.transform = 'translateX(' + (- width * index) + 'px)';
  dotsLabel();
}
function prevSlide() {
  if (index <= 0) {return};
  carouselRow.style.transition = "transform 0.4s ease-in-out";
  index--;
  carouselRow.style.transform = 'translateX(' + (- width * index) + 'px)';
  dotsLabel();
}

carouselRow.addEventListener('transitionend', function() {
  if (carouselSlide[index].id === 'firstImageDuplicate') {
    carouselRow.style.transition = 'none';
    index = carouselSlide.length - index;
carouselRow.style.transform = 'translateX(' + (- width * index) + 'px)';
dotsLabel();
  }

  if (carouselSlide[index].id === 'lastImageDuplicate') {
    carouselRow.style.transition = 'none';
    index = carouselSlide.length - 2;
carouselRow.style.transform = 'translateX(' + (- width * index) + 'px)';
dotsLabel();  
  }
});

function autoslide() {
  deleteInterval = setInterval(timer, 5000);
  function timer() {
    nextSlide();
  }
}
autoslide();

function dotsLabel(){
  for(i = 0; i < dots.length; i++){
    dots[i].className = dots[i].className.replace(' active', '');
  }
  dots[index - 1].className += ' active';
}

const mainContainer = document.querySelector('.slide-container');
mainContainer.addEventListener('mouseover', function(){
  clearInterval(deleteInterval);
});

mainContainer.addEventListener('mouseout', autoslide);

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = 'none';
}

function btnlogin() {
  window.location.href = "login.html";
}

//filter artikel
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