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

//Loader code________________________________________________________________________________________
//JavaScript to Handle Transition
window.addEventListener("load", function () {
  // Check if the session already has "loaderShown"
  if (!sessionStorage.getItem("loaderShown")) {
      setTimeout(() => {
          document.getElementById("loader").classList.add("hidden");
          document.getElementById("content").classList.remove("hidden");
          // Set the flag in sessionStorage
          sessionStorage.setItem("loaderShown", "true");
      }, 2300); // Loader disappears after 2.3 seconds
  } else {
      // Directly show the content if the loader was already shown in this session
      document.getElementById("loader").classList.add("hidden");
      document.getElementById("content").classList.remove("hidden");
  }
});

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
