// NAVBAR TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');

  // Change icon
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// CAROUSEL
// ===== CAROUSEL (Smooth Infinite Loop) =====
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');

let index = 1;
let slideWidth = slideImages[0].clientWidth;

// Clone first and last slide for infinite loop
const firstClone = slideImages[0].cloneNode(true);
const lastClone = slideImages[slideImages.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slides.firstElementChild);

const allSlides = document.querySelectorAll('.slides img');
slides.style.transform = `translateX(-${slideWidth * index}px)`;

// Adjust width on window resize
window.addEventListener('resize', () => {
  slideWidth = slideImages[0].clientWidth;
  slides.style.transition = 'none';
  slides.style.transform = `translateX(-${slideWidth * index}px)`;
});

// Move to slide
function moveToSlide() {
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(-${slideWidth * index}px)`;
}

// Reset position for clones
function resetSlide() {
  if (allSlides[index].isSameNode(firstClone)) {
    slides.style.transition = 'none';
    index = 1;
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (allSlides[index].isSameNode(lastClone)) {
    slides.style.transition = 'none';
    index = allSlides.length - 2;
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
  }
}

// Buttons
document.querySelector('.next').addEventListener('click', () => {
  if (index >= allSlides.length - 1) return;
  index++;
  moveToSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
  if (index <= 0) return;
  index--;
  moveToSlide();
});

slides.addEventListener('transitionend', resetSlide);

// Auto-slide every 4s
setInterval(() => {
  if (index >= allSlides.length - 1) return;
  index++;
  moveToSlide();
}, 4000);


// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});

//for academic readmore content reveal and hide toggle//
// Toggle card details on "Learn More" click
// Toggle card details (only one open at a time)
document.querySelectorAll('.toggle-card').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.academics-card');
    const allCards = document.querySelectorAll('.academics-card');

    // Close all other cards first
    allCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('active');
        c.querySelector('.toggle-card').textContent = 'details';
      }
    });

    // Toggle current card
    card.classList.toggle('active');
    button.textContent = card.classList.contains('active') ? 'Show Less' : 'Learn More';
  });
});
// ... other JS (like navbar toggle, contact etc.)

// New fail-safe carousel
window.addEventListener("load", () => {
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let index = 0;

  function showSlide(i) {
    slides.style.transform = `translateX(-${i * 100}%)`;
  }

  next.addEventListener("click", () => {
    index = (index + 1) % slide.length;
    showSlide(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slide.length) % slide.length;
    showSlide(index);
  });

  // Auto-slide every 5s
  setInterval(() => {
    index = (index + 1) % slide.length;
    showSlide(index);
  }, 5000);
});

//academic readmore modal toggle end//
