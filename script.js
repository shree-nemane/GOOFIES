//-------------------
const carousel = document.getElementById("carousel-inner");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let index = 0;
const totalSlides = carousel.children.length;
const intervalTime = 4000; // Auto-slide interval in milliseconds
let autoSlideInterval;

function updateSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlide();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Event listeners for manual navigation
nextButton.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevButton.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Pause auto sliding when hovering over the carousel
carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

// Start auto sliding on page load
startAutoSlide();

//--------------------------------------------------------------------------------------


//Prank cmd-------------------------------

function downloadAndRun() {
  let link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`@echo off\nstart cmd`);
  link.download = "open_cmd.bat";  // Batch script file
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("He..He..Hee Enjoy😁");
}
