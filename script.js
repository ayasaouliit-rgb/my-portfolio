const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  // Smooth section navigation.
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
    });
  });

  // Typing animation.
  const typeTarget = $("#type-target");
  const phrases = ["Web Developer", "Mobile Developer", "Full-Stack Developer"];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeTick() {
    if (!typeTarget) return;
    const current = phrases[phraseIndex];

    if (!deleting) {
      typeTarget.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeTick, 1300);
        return;
      }
      setTimeout(typeTick, 75);
    } else {
      typeTarget.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(typeTick, 45);
    }
  }
  typeTick();

  // Scroll reveal.
  const fadeElements = $$(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeElements.forEach((el) => observer.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add("visible"));
  }

  // Theme.
  const themeToggle = $("#mode-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light-mode");

  function updateThemeButton() {
    const light = document.body.classList.contains("light-mode");
    themeToggle.textContent = light ? "🌙" : "🌞";
    themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  }
  updateThemeButton();

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    updateThemeButton();
  });

  // Mobile menu.
  const mobilePanel = $("#mobilePanel");
  const hamburger = $("#hamburgerBtn");
  const closeButton = $("#closeMobileBtn");

  function openMobileMenu() {
    mobilePanel?.classList.add("open");
    mobilePanel?.setAttribute("aria-hidden", "false");
    hamburger?.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    mobilePanel?.classList.remove("open");
    mobilePanel?.setAttribute("aria-hidden", "true");
    hamburger?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  hamburger?.addEventListener("click", openMobileMenu);
  closeButton?.addEventListener("click", closeMobileMenu);
  mobilePanel?.addEventListener("click", (event) => {
    if (event.target === mobilePanel) closeMobileMenu();
  });

  // Escape closes the mobile menu.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  // Language toggle placeholder. Keeps the UI ready for a real translation dictionary.
  const languageButtons = [$("#languageToggle"), $("#mobileLanguageToggle")].filter(Boolean);
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const current = document.documentElement.lang || "en";
      const next = current === "en" ? "fr" : "en";
      document.documentElement.lang = next;
      languageButtons.forEach((btn) => btn.textContent = next === "en" ? "FR" : "EN");
      // If a translation system is added later, dispatch a standard event for it.
      window.dispatchEvent(new CustomEvent("languagechange", { detail: { language: next } }));
    });
  });

  // Contact form -> Node/Express API.
  const form = $("#contact-form");
  const status = $("#form-status");
  const sendButton = $("#send-button");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return; // Bot trap.

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setFormStatus("Please fill in all fields.", "error");
      return;
    }

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";
    setFormStatus("Sending your message...", "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim()
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Unable to send the message.");
      }

      form.reset();
      setFormStatus("Message sent successfully. Thank you!", "success");
    } catch (error) {
      console.error(error);
      setFormStatus(error.message || "Unable to send the message right now.", "error");
    } finally {
      sendButton.disabled = false;
      sendButton.textContent = "Send message";
    }
  });

  function setFormStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = type || "";
  }

  // Certificate carousel
const track = $("#certificateTrack");
const slides = track ? [...track.querySelectorAll(".certificate-preview")] : [];
const dots = $("#dots");

let slideIndex = 0;
let autoPlay = null;

if (track && slides.length) {

  // Create dots
  if (dots) {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = `dot${index === 0 ? " active" : ""}`;
      dot.setAttribute(
        "aria-label",
        `Show certificate ${index + 1}`
      );

      dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoPlay();
      });

      dots.appendChild(dot);
    });
  }

  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;

    track.style.transform =
      `translateX(-${slideIndex * 100}%)`;

    if (dots) {
      [...dots.children].forEach((dot, i) => {
        dot.classList.toggle(
          "active",
          i === slideIndex
        );
      });
    }
  }

  function startAutoPlay() {
    clearInterval(autoPlay);

    autoPlay = setInterval(() => {
      showSlide(slideIndex + 1);
    }, 5000);
  }

  function restartAutoPlay() {
    startAutoPlay();
  }

  $("#prevSlide")?.addEventListener("click", () => {
    showSlide(slideIndex - 1);
    restartAutoPlay();
  });

  $("#nextSlide")?.addEventListener("click", () => {
    showSlide(slideIndex + 1);
    restartAutoPlay();
  });

  track.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

  track.addEventListener("mouseleave", () => {
    startAutoPlay();
  });

  // Start
  showSlide(0);
  startAutoPlay();
}
  // Back to top.
  const backToTop = $("#backToTop");
  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Current year.
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
});

// =========================
// PROJECTS CAROUSEL
// =========================

const projectsTrack = document.getElementById("projectsTrack");
const projects = projectsTrack
  ? [...projectsTrack.querySelectorAll(".project")]
  : [];

const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const projectDots = document.getElementById("projectDots");

let projectIndex = 0;
let projectTimer = null;


if (projectsTrack && projects.length) {

  function getVisibleProjects() {
    if (window.innerWidth <= 700) {
      return 1;
    }

    if (window.innerWidth <= 980) {
      return 2;
    }

    return 3;
  }


  function getMaxIndex() {
    return Math.max(
      0,
      projects.length - getVisibleProjects()
    );
  }


  function updateProjectCarousel() {

    const visible = getVisibleProjects();

    const gap = 18;

    const cardWidth =
      projects[0].getBoundingClientRect().width;

    const moveAmount =
      cardWidth + gap;

    projectIndex = Math.min(
      projectIndex,
      getMaxIndex()
    );

    projectsTrack.style.transform =
      `translateX(-${projectIndex * moveAmount}px)`;

    updateProjectDots();
  }


  function updateProjectDots() {

    if (!projectDots) return;

    projectDots.innerHTML = "";

    const maxIndex = getMaxIndex();

    for (let i = 0; i <= maxIndex; i++) {

      const dot = document.createElement("button");

      dot.type = "button";

      dot.className =
        `project-dot${i === projectIndex ? " active" : ""}`;

      dot.setAttribute(
        "aria-label",
        `Show project ${i + 1}`
      );

      dot.addEventListener("click", () => {
        projectIndex = i;
        updateProjectCarousel();
        restartProjectAutoplay();
      });

      projectDots.appendChild(dot);
    }
  }


  function nextProject() {

    const maxIndex = getMaxIndex();

    if (projectIndex >= maxIndex) {
      projectIndex = 0;
    } else {
      projectIndex++;
    }

    updateProjectCarousel();
  }


  function previousProject() {

    const maxIndex = getMaxIndex();

    if (projectIndex <= 0) {
      projectIndex = maxIndex;
    } else {
      projectIndex--;
    }

    updateProjectCarousel();
  }


  function startProjectAutoplay() {

    clearInterval(projectTimer);

    projectTimer = setInterval(() => {
      nextProject();
    }, 5000);
  }


  function restartProjectAutoplay() {

    startProjectAutoplay();
  }


  projectNext?.addEventListener("click", () => {
    nextProject();
    restartProjectAutoplay();
  });


  projectPrev?.addEventListener("click", () => {
    previousProject();
    restartProjectAutoplay();
  });


  projectsTrack.addEventListener("mouseenter", () => {
    clearInterval(projectTimer);
  });


  projectsTrack.addEventListener("mouseleave", () => {
    startProjectAutoplay();
  });


  // Recalculate when the screen changes size
  window.addEventListener("resize", () => {
    updateProjectCarousel();
  });


  // Initial setup
  updateProjectCarousel();
  startProjectAutoplay();
}