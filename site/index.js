function scrollToContact(event) {
  event.preventDefault();
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });
}

// Make all internal links smooth scroll
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Initialize Swiper
const swiper = new Swiper(".swiper", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 1000,
  effect: "slide",
});
