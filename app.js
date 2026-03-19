const slides = Array.from(document.querySelectorAll(".slide"));
const counter = document.getElementById("slideCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotNav = document.getElementById("dotNav");

let currentIndex = 0;
let wheelLock = false;

function pad(num) {
  return String(num).padStart(2, "0");
}

function renderDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot-button";
    dot.setAttribute("aria-label", `跳转到第 ${index + 1} 页`);
    dot.addEventListener("click", () => goToSlide(index));
    dotNav.appendChild(dot);
  });
}

function updateUI() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentIndex);
  });

  const dots = dotNav.querySelectorAll(".dot-button");
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-current", index === currentIndex);
  });

  counter.textContent = `${pad(currentIndex + 1)} / ${pad(slides.length)}`;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
  document.title = `${slides[currentIndex].dataset.title} · 科研效率 AI 工具 Deck`;
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  updateUI();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) {
    event.preventDefault();
    nextSlide();
  }

  if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) {
    event.preventDefault();
    prevSlide();
  }

  if (event.key === "Home") {
    event.preventDefault();
    goToSlide(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    goToSlide(slides.length - 1);
  }
});

window.addEventListener(
  "wheel",
  (event) => {
    if (window.innerWidth <= 680 || wheelLock) {
      return;
    }

    if (Math.abs(event.deltaY) < 16) {
      return;
    }

    wheelLock = true;
    if (event.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    window.setTimeout(() => {
      wheelLock = false;
    }, 700);
  },
  { passive: true }
);

renderDots();
updateUI();
