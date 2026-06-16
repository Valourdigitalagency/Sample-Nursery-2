const navToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
const prev = document.querySelector(".slider__arrow--prev");
const next = document.querySelector(".slider__arrow--next");
const tabs = Array.from(document.querySelectorAll(".messages__tab"));
const messageTitle = document.querySelector("#messageTitle");
const messageBody = document.querySelector("#messageBody");
const headerPills = Array.from(document.querySelectorAll(".header-pill"));
const socials = document.querySelector(".socials");
const sideTabs = document.querySelector(".side-tabs");
const logoSrc = "photos/logo-crest.png";
const photoSrcs = {
  classroomBlocks: "photos/photo-1-classroom-blocks.png",
  outdoorGroup: "photos/photo-2-outdoor-group.png",
  teacherKids: "photos/photo-3-teacher-kids.png",
  groupOutdoor: "photos/photo-4-group-outdoor.png",
  learningActivity: "photos/photo-5-learning-activity.png",
  schoolGate: "photos/photo-6-school-gate.png.png",
  classroomWide: "photos/photo-7-classroom-wide.png",
  heroGirl: "photos/1.png",
  aboutBoy: "photos/about-school-boy.png",
};

const themeMap = {
  "index.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "academics.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "campus.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "admission.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "events.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "gallery.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "contact.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "enquiry.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "payment.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
  "careers.html": {
    colors: {
      a: "#AFA79F",
      b: "#440381",
      c: "#9B7EDE",
    },
    bodyFont: "Nunito, sans-serif",
    headingFont: "Fredoka, sans-serif",
  },
};

const primaryNav = [
  { label: "Home", href: "index.html" },
  { label: "About Us", href: "about.html" },
  { label: "Teachers Speak", href: "index.html#teachers" },
  { label: "Parents Speak", href: "index.html#parents" },
  { label: "Infrastructure", href: "campus.html" },
  { label: "Contact Us", href: "contact.html" },
];

const messages = {
  chairperson: {
    title: "Chairperson's Message",
    image: photoSrcs.teacherKids,
    body: [
      "VALOUR SCHOOL is built on warmth, curiosity, and a child-centered start to learning. We believe early education should feel joyful, safe, and full of discovery.",
      "Our teachers create a caring environment where children grow through play, stories, songs, movement, and positive daily routines.",
      "- Chairperson",
    ],
  },
  vice: {
    title: "Vice Chairperson's Message",
    image: photoSrcs.groupOutdoor,
    body: [
      "A strong nursery school helps children feel confident, social, and ready to learn. We focus on habits, values, and creative thinking from the very beginning.",
      "Every classroom experience is designed to support the whole child with kindness, structure, and encouragement.",
      "- Vice Chairperson",
    ],
  },
  principal: {
    title: "Principal's Message",
    image: photoSrcs.learningActivity,
    body: [
      "At VALOUR SCHOOL, we want each child to enjoy the magic of early learning while building the confidence to take small, steady steps forward.",
      "We partner with families to create a happy school journey, where every child is seen, supported, and celebrated.",
      "- Principal",
    ],
  },
};

let activeSlide = 0;

function currentPageFile() {
  const path = window.location.pathname.split("/").pop().toLowerCase();
  return path || "index.html";
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((part) => part + part).join("")
    : clean;
  const num = Number.parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex({ r, g, b }) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((part) => part.toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixColor(hexA, hexB, amount) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}

function renderPrimaryNav() {
  if (!navMenu) return;

  const activeFile = currentPageFile();
  navMenu.innerHTML = primaryNav
    .map((item) => {
      const isCurrent = item.href.toLowerCase() === activeFile;
      const classes = [isCurrent ? "is-current" : ""].filter(Boolean).join(" ");
      return `<a class="${classes}" href="${item.href}">${item.label}</a>`;
    })
    .join("");
}

function applyTheme() {
  const page = currentPageFile();
  const theme = themeMap[page] || themeMap["index.html"];
  const root = document.documentElement;
  const colors = theme.colors || themeMap["index.html"].colors;

  root.style.setProperty("--page-a", colors.a);
  root.style.setProperty("--page-b", colors.b);
  root.style.setProperty("--page-c", colors.c);
  root.style.setProperty("--page-deep", colors.b);
  root.style.setProperty("--page-soft", mixColor(colors.c, "#ffffff", 0.84));
  root.style.setProperty("--body-font", theme.bodyFont);
  root.style.setProperty("--heading-font", theme.headingFont);

  document.body.dataset.page = page.replace(".html", "");
}

function dockHeaderNav() {
  const headerInner = document.querySelector(".site-header__inner");
  const navShell = document.querySelector(".nav-shell");
  if (!headerInner || !navShell || !navMenu) return;

  if (!headerInner.contains(navToggle) && navToggle) {
    headerInner.appendChild(navToggle);
  }

  if (!headerInner.contains(navMenu)) {
    headerInner.appendChild(navMenu);
  }

  navShell.classList.add("nav-shell--hidden");
}

function applyLogo() {
  document.querySelectorAll(".brand__logo, .footer__brand img").forEach((img) => {
    img.src = logoSrc;
    img.alt = "VALOUR SCHOOL crest";
  });
}

function renderSideTab() {
  if (!sideTabs) return;
  sideTabs.innerHTML = '<a class="side-tabs__item side-tabs__item--enquire" href="enquiry.html">Enquire Now</a>';
  sideTabs.classList.add("side-tabs--visible");
}

function renderFooter() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer__wave" aria-hidden="true"></div>
    <div class="container footer__grid">
      <section class="footer__column">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="index.html#teachers">Teachers Speak</a></li>
          <li><a href="index.html#parents">Parents Speak</a></li>
          <li><a href="campus.html">Infrastructure</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </section>
      <section class="footer__column footer__column--location">
        <h3>Location</h3>
        <div class="footer__contact-row">
          <span class="footer__icon" aria-hidden="true">⌖</span>
          <p>
            No.39, MG Ramachandaran Road, Kalakshetra Colony,<br />
            Besant Nagar, Adyar, Chennai,<br />
            Tamilnadu, 600090
          </p>
        </div>
      </section>
      <section class="footer__column footer__column--franchise">
        <h3>Franchise</h3>
        <div class="footer__contact-row">
          <span class="footer__icon" aria-hidden="true">☎</span>
          <p>
            +91-9043222349<br />
            +91-9962990999
          </p>
        </div>
        <div class="footer__contact-row">
          <span class="footer__icon" aria-hidden="true">✉</span>
          <p>chennai.adyar@kangarookids.co.in</p>
        </div>
      </section>
    </div>
    <div class="container footer__bottom">
      <p>Copyright © 2026 Valour School</p>
      <div class="footer__social">
        <span>Follow Us</span>
        <a href="#" aria-label="Facebook">f</a>
        <a href="#" aria-label="Instagram">ig</a>
        <a href="#" aria-label="YouTube">▶</a>
      </div>
    </div>
  `;

  applyLogo();
}

function applyPageImageFocus(img, src) {
  img.src = src;
  const focusMap = {
    [photoSrcs.aboutBoy]: "center 35%",
    [photoSrcs.schoolGate]: "center 42%",
    [photoSrcs.classroomBlocks]: "center 45%",
    [photoSrcs.classroomWide]: "center 34%",
    [photoSrcs.groupOutdoor]: "center 30%",
    [photoSrcs.teacherKids]: "center 35%",
    [photoSrcs.outdoorGroup]: "center 28%",
    [photoSrcs.learningActivity]: "center 40%",
  };
  img.style.objectPosition = focusMap[src] || "center center";
}

function applyPhotos() {
  const page = currentPageFile();

  const sliderMap = [photoSrcs.schoolGate, photoSrcs.teacherKids, photoSrcs.classroomBlocks];
  const sliderFocus = ["center 42%", "center 32%", "center 45%"];

  document.querySelectorAll(".slide img").forEach((img, index) => {
    const src = sliderMap[index] || sliderMap[0];
    img.src = src;
    img.style.objectPosition = sliderFocus[index] || "center center";
  });

  document.querySelectorAll(".page-hero__image img").forEach((img) => {
    const srcByPage = {
      "index.html": photoSrcs.heroGirl,
      "about.html": photoSrcs.aboutBoy,
      "academics.html": photoSrcs.classroomBlocks,
      "campus.html": photoSrcs.schoolGate,
      "admission.html": photoSrcs.groupOutdoor,
      "events.html": photoSrcs.outdoorGroup,
      "gallery.html": photoSrcs.teacherKids,
      "careers.html": photoSrcs.teacherKids,
      "contact.html": photoSrcs.learningActivity,
      "enquiry.html": photoSrcs.learningActivity,
      "payment.html": photoSrcs.classroomBlocks,
    };

    applyPageImageFocus(img, srcByPage[page] || photoSrcs.classroomBlocks);
  });

  document.querySelectorAll(".gallery-grid img").forEach((img, index) => {
    const galleryMap = [
      photoSrcs.classroomBlocks,
      photoSrcs.outdoorGroup,
      photoSrcs.teacherKids,
      photoSrcs.groupOutdoor,
      photoSrcs.learningActivity,
      photoSrcs.schoolGate,
      photoSrcs.classroomWide,
    ];
    const focusMap = ["center 45%", "center 35%", "center 25%", "center 35%", "center 40%", "center 42%", "center 35%"];
    const src = galleryMap[index % galleryMap.length];
    img.src = src;
    img.style.objectPosition = focusMap[index % focusMap.length];
  });
}

function showSlide(index) {
  if (!slides.length || !dots.length) return;

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
}

function showMessage(key) {
  const message = messages[key];
  if (!message || !messageTitle || !messageBody) return;

  messageTitle.textContent = message.title;
  messageBody.innerHTML = `
    <img src="${message.image}" alt="${message.title}" />
    <div>
      <p>${message.body[0]}</p>
      <p>${message.body[1]}</p>
      <p class="signature">${message.body[2]}</p>
    </div>
  `;
}

function setupRevealAnimation() {
  const targets = document.querySelectorAll(
    ".hero__copy, .hero__frame, .title-bar, .content-card, .feature-card, .page-hero__panel, .page-hero__form, .detail-card, .form-card, .gallery-grid img, .messages, .footer__grid, .disclosure, .achievement-banner, .timeline, .faq-card"
  );

  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  targets.forEach((target) => {
    target.classList.add("reveal");
    observer.observe(target);
  });
}

function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((node) => {
    const targetText = node.getAttribute("data-count") || "";
    const targetValue = Number.parseFloat(targetText);
    if (!Number.isFinite(targetValue)) return;

    const suffix = targetText.replace(/[0-9.]/g, "");
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = targetValue * eased;
      const rendered = Number.isInteger(targetValue)
        ? Math.round(value).toString()
        : value.toFixed(1);

      node.textContent = `${rendered}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    node.textContent = `0${suffix}`;
    window.requestAnimationFrame(step);
  });
}

navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

prev?.addEventListener("click", () => showSlide(activeSlide - 1));
next?.addEventListener("click", () => showSlide(activeSlide + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    showMessage(tab.dataset.message);
  });
});

renderPrimaryNav();
dockHeaderNav();
applyTheme();
applyLogo();
renderSideTab();
applyPhotos();
renderFooter();
setupRevealAnimation();
animateCounters();

if (slides.length && dots.length) {
  showSlide(0);
  window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 5500);
}

if (messageTitle && messageBody) {
  showMessage("chairperson");
}

// Keep the interface focused on the main content.
headerPills.forEach((pill) => pill.remove());
socials?.remove();
