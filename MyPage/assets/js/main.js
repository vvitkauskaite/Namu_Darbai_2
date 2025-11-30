(function () {
  "use strict";

  /* =========================
   * HEADER TOGGLE (mobile)
   * ========================= */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  /* Hide mobile nav on same-page/hash links */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /* =========================
   * PRELOADER
   * ========================= */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /* =========================
   * SCROLL TOP BUTTON
   * ========================= */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;
    if (window.scrollY > 100) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* =========================
   * AOS INIT
   * ========================= */
  function aosInit() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /* =========================
   * NAVMENU SCROLLSPY
   * ========================= */
  const navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    const position = window.scrollY + 200;

    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /* =========================
   * PROFILIO DROPDOWN
   * ========================= */
  const profileInfo = document.querySelector(".profile-info");
  const profileToggle = document.querySelector(".profile-toggle");

  if (profileInfo && profileToggle) {
    profileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      profileInfo.classList.toggle("open");
    });

    const deepToggle = profileInfo.querySelector(
      ".profile-menu .has-children > .has-children-toggle"
    );

    if (deepToggle) {
      deepToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        deepToggle.parentElement.classList.toggle("open");
      });
    }

    document.addEventListener("click", (e) => {
      if (!profileInfo.contains(e.target)) {
        profileInfo.classList.remove("open");
      }
    });
  }

  /* =========================
   * HERO VIDEO PLAY/PAUSE
   * ========================= */
  const heroMedia = document.getElementById("heroMedia");

  if (heroMedia) {
    const heroVideo = heroMedia.querySelector(".hero-bg-video");

    heroMedia.addEventListener("click", () => {
      if (!heroVideo) return;

      if (heroVideo.paused) {
        heroMedia.classList.add("is-playing");
        heroVideo.currentTime = 0;
        heroVideo.play();
      } else {
        heroMedia.classList.remove("is-playing");
        heroVideo.pause();
      }
    });
  }

  /* =========================
   * LIVE CLOCK + DATE
   * ========================= */
  function updateLiveClock() {
    const el = document.getElementById("liveClock");
    if (!el) return;

    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");

    el.textContent = `${h}:${m}`;
  }

  function updateLiveDate() {
    const el = document.getElementById("liveDate");
    if (!el) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    el.textContent = `${year}-${month}-${day}`;
  }

  setInterval(() => {
    updateLiveClock();
    updateLiveDate();
  }, 1000);

  updateLiveClock();
  updateLiveDate();

  /* =========================
   * WIFI STATUS
   * ========================= */
  function updateWifiStatus() {
    const el = document.getElementById("wifiStatus");
    if (!el) return;

    const icon = el.previousElementSibling;
    if (!icon) return;

    if (navigator.onLine) {
      el.textContent = "Prisijungta";
      icon.classList.remove("bi-wifi-off");
      icon.classList.add("bi-wifi");
    } else {
      el.textContent = "Atsijungta";
      icon.classList.remove("bi-wifi");
      icon.classList.add("bi-wifi-off");
    }
  }

  window.addEventListener("online", updateWifiStatus);
  window.addEventListener("offline", updateWifiStatus);
  updateWifiStatus();

  /* =========================
   * SCROLL HINT
   * ========================= */
  const scrollHintEl = document.querySelector(".scroll-hint");

  function updateScrollHint() {
    if (!scrollHintEl) return;
    if (window.scrollY > 80) {
      scrollHintEl.classList.add("hidden");
    } else {
      scrollHintEl.classList.remove("hidden");
    }
  }

  window.addEventListener("scroll", updateScrollHint);
  window.addEventListener("load", updateScrollHint);

  /* =========================
   * SVETAINĖ – INTERAKTYVŪS VALDIKLIAI
   * ========================= */

  /* Toggles (lempos / AC / TV / eglutė) */
  document.querySelectorAll(".toggle-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-on");

      const role = btn.getAttribute("data-role");
      if (role === "tv-power") {
        const tvText = document.getElementById("tvStatusText");
        if (tvText) {
          tvText.textContent = btn.classList.contains("is-on")
            ? "Įjungtas"
            : "Išjungtas";
        }
      }
    });
  });

  /* === LEMPOS – state masyve === */
  const lamps = [
    {
      src: "assets/img/rooms/lempa1.png",
      name: "Pagrindinė lempa",
      brightness: 55,
      on: true,
    },
    {
      src: "assets/img/rooms/lempa2.png",
      name: "Grindų lempa",
      brightness: 40,
      on: false,
    },
    {
      src: "assets/img/rooms/ugnis.jpg",
      name: "Elektrinis židinys",
      brightness: 73,
      on: true,
    },
  ];

  const lampImgEl = document.querySelector(".lamp-image");
  const lampNameEl = document.getElementById("lampName");
  const lampBrightnessSlider = document.querySelector(".lamp-brightness");
  const lampBrightnessValue = document.getElementById("lampBrightnessValue");
  const lampToggle = document.querySelector('[data-role="lamp-power"]');

  let lampIndex = 0;

  function renderCurrentLamp() {
    if (
      !lampImgEl ||
      !lampNameEl ||
      !lampBrightnessSlider ||
      !lampBrightnessValue ||
      !lampToggle
    )
      return;

    const lamp = lamps[lampIndex];

    lampImgEl.src = lamp.src;
    lampImgEl.alt = lamp.name;
    lampNameEl.textContent = lamp.name;

    lampBrightnessSlider.value = lamp.brightness;
    lampBrightnessValue.textContent = lamp.brightness;

    lampToggle.classList.toggle("is-on", lamp.on);
  }

  document.querySelectorAll(".lamp-prev, .lamp-next").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.classList.contains("lamp-next") ? 1 : -1;
      lampIndex = (lampIndex + dir + lamps.length) % lamps.length;
      renderCurrentLamp();
    });
  });

  if (lampBrightnessSlider && lampBrightnessValue) {
    lampBrightnessSlider.addEventListener("input", () => {
      const lamp = lamps[lampIndex];
      lamp.brightness = parseInt(lampBrightnessSlider.value, 10);
      lampBrightnessValue.textContent = lamp.brightness;
    });
  }

  if (lampToggle) {
    lampToggle.addEventListener("click", () => {
      const lamp = lamps[lampIndex];
      lamp.on = !lamp.on;
      lampToggle.classList.toggle("is-on", lamp.on);
    });
  }

  renderCurrentLamp();

  /* === AC temperatūra – paprastas skaičius su +/- (be rato) === */
  (function () {
    const acCard = document.querySelector(".ac-card");
    if (!acCard) return;

    const acMinus = acCard.querySelector(".ac-btn.ac-minus");
    const acPlus = acCard.querySelector(".ac-btn.ac-plus");
    const acTempValue = acCard.querySelector("#acTempValue");
    const acTempLabel = acCard.querySelector("#acTempLabel");
    const acTempSlider = acCard.querySelector(".ac-temp-slider");

    if (!acMinus || !acPlus || !acTempValue || !acTempSlider) return;

    const min = Number(acTempSlider.min) || 15;
    const max = Number(acTempSlider.max) || 30;

    function acLabelFor(v) {
      if (v <= 18) return "Cold";
      if (v >= 26) return "Warm";
      return "Comfort";
    }

    function updateAcUI(value) {
      let v = Math.max(min, Math.min(max, value));

      acTempSlider.value = v;
      acTempValue.textContent = v;
      if (acTempLabel) acTempLabel.textContent = acLabelFor(v);

      // atnaujina ir "Svetainės" temperatūros pilulę virš kameros
      const livingTemp = document.getElementById("livingTemp");
      if (livingTemp) livingTemp.textContent = v;
    }

    // mygtukai – po 1° žingsnį
    acMinus.addEventListener("click", () => {
      updateAcUI(Number(acTempSlider.value) - 1);
    });

    acPlus.addEventListener("click", () => {
      updateAcUI(Number(acTempSlider.value) + 1);
    });

    // jei kada nors rodysi sliderį – irgi veiks
    acTempSlider.addEventListener("input", (e) => {
      updateAcUI(Number(e.target.value));
    });

    // pirminė būsena
    updateAcUI(Number(acTempSlider.value));
  })();

  // AC režimai
  document.querySelectorAll(".ac-modes .mode-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.parentElement.querySelectorAll(".mode-chip");
      group.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  /* === TV garsas === */
  const tvSlider = document.querySelector(".tv-volume-slider");
  const tvVolumeValue = document.getElementById("tvVolumeValue");
  const tvMinus = document.querySelector(".tv-vol-minus");
  const tvPlus = document.querySelector(".tv-vol-plus");

  function updateTvVolume() {
    if (!tvSlider || !tvVolumeValue) return;
    tvVolumeValue.textContent = tvSlider.value;
  }

  if (tvSlider && tvVolumeValue) {
    tvSlider.addEventListener("input", updateTvVolume);
    updateTvVolume();
  }

  function adjustTvVolume(delta) {
    if (!tvSlider) return;
    let v = parseInt(tvSlider.value, 10) + delta;
    if (v < 0) v = 0;
    if (v > 100) v = 100;
    tvSlider.value = v;
    updateTvVolume();
  }

  if (tvMinus) tvMinus.addEventListener("click", () => adjustTvVolume(-5));
  if (tvPlus) tvPlus.addEventListener("click", () => adjustTvVolume(5));

  /* === Eglutės spalvų ratas su pipete === */
  (function () {
    const wheel = document.querySelector(".tree-color-wheel");
    const knob = document.querySelector(".tree-color-knob");
    const colorLabel = document.getElementById("treeColorLabel");
    const colorPreview = document.getElementById("treeColorPreview");
    const colorInput = document.getElementById("treeColorPicker");

    if (!wheel || !knob || !colorLabel || !colorPreview || !colorInput) return;

    const outerRadiusOffset = 12;      // kiek nutraukti nuo krašto
    const innerRadiusRatio = 0.40;     // vidinio juodo rato santykis

    let isDragging = false;

    function hslToHex(h, s = 1, l = 0.5) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;

      if (0 <= h && h < 60)        { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180){ r = 0; g = c; b = x; }
      else if (180 <= h && h < 240){ r = 0; g = x; b = c; }
      else if (240 <= h && h < 300){ r = x; g = 0; b = c; }
      else if (300 <= h && h < 360){ r = c; g = 0; b = x; }

      const toHex = (v) =>
        Math.round((v + m) * 255).toString(16).padStart(2, "0");

      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function setColorFromPoint(clientX, clientY) {
      const rect = wheel.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      let dx = clientX - cx;
      let dy = clientY - cy;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const outerR = rect.width / 2 - outerRadiusOffset;
      const innerR = rect.width * innerRadiusRatio;

      // jei per arti centro – stumiam į žiedą
      if (dist < innerR) {
        dx = (dx / (dist || 1)) * innerR;
        dy = (dy / (dist || 1)) * innerR;
      }
      // jei per toli – ribojam iki išorinio spindulio
      if (dist > outerR) {
        dx = (dx / dist) * outerR;
        dy = (dy / dist) * outerR;
      }

      // nauja rankenėlės pozicija
      const kx = rect.width / 2 + dx;
      const ky = rect.height / 2 + dy;
      knob.style.left = `${kx}px`;
      knob.style.top = `${ky}px`;

      // kampas -> hue (0° viršuje)
      let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI); // -180..180
      angleDeg = angleDeg + 90;
      if (angleDeg < 0) angleDeg += 360;

      const hex = hslToHex(angleDeg);
      colorLabel.textContent = hex;
      colorPreview.style.background = hex;
      colorInput.value = hex;
    }

    function handlePointerDown(e) {
      e.preventDefault();
      isDragging = true;
      setColorFromPoint(e.clientX, e.clientY);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    function handlePointerMove(e) {
      if (!isDragging) return;
      setColorFromPoint(e.clientX, e.clientY);
    }

    function handlePointerUp() {
      isDragging = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    // drag ant rato ir ant paties rutuliuko
    wheel.addEventListener("pointerdown", handlePointerDown);
    knob.addEventListener("pointerdown", handlePointerDown);

    // iniciali pozicija pagal pradinę spalvą
    (function initFromHex() {
      const hex = colorInput.value || "#3459a2";
      colorLabel.textContent = hex;
      colorPreview.style.background = hex;

      // apytiksliai HEX -> HUE
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      let h = 0;

      if (d === 0) h = 0;
      else if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;

      h = Math.round(h * 60);
      if (h < 0) h += 360;

      const rect = wheel.getBoundingClientRect();
      const outerR = rect.width / 2 - outerRadiusOffset;
      const angleRad = ((h - 90) * Math.PI) / 180;
      const dx = Math.cos(angleRad) * outerR;
      const dy = Math.sin(angleRad) * outerR;
      const kx = rect.width / 2 + dx;
      const ky = rect.height / 2 + dy;
      knob.style.left = `${kx}px`;
      knob.style.top = `${ky}px`;
    })();
  })();

})();
