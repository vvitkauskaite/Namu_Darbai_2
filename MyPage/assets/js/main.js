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
   * HERO MUZIKA – ON / OFF
   * ========================= */
  (function () {
    const audioBtn = document.querySelector(".audio-toggle-btn");
    const iconOff = document.getElementById("audioIconOff");
    const iconOn  = document.getElementById("audioIconOn");
    const bgMusic = document.getElementById("bgMusic");

    if (!audioBtn || !iconOff || !iconOn || !bgMusic) return;

    let isPlaying = false;

    function updateIcons() {
      if (isPlaying) {
        iconOn.style.display = "inline-block";
        iconOff.style.display = "none";
        audioBtn.setAttribute("aria-label", "Išjungti muziką");
      } else {
        iconOn.style.display = "none";
        iconOff.style.display = "inline-block";
        audioBtn.setAttribute("aria-label", "Įjungti muziką");
      }
    }

    audioBtn.addEventListener("click", () => {
      if (!isPlaying) {
        // Pradėti groti nuo pradžių, kai įjungiam
        bgMusic.currentTime = 0;
        bgMusic.play()
          .then(() => {
            isPlaying = true;
            updateIcons();
          })
          .catch(() => {
            // jeigu naršyklė neleidžia – tiesiog paliekam išjungta
            isPlaying = false;
            updateIcons();
          });
      } else {
        bgMusic.pause();
        isPlaying = false;
        updateIcons();
      }
    });

    // pradinė būsena – muzika išjungta
    updateIcons();
  })();

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

   /* Toggles (lempos / AC / TV / eglutė / robotas...) */
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
      } else if (role === "robot-power") {
        const status = document.getElementById("robotStatusText");
        if (status) {
          status.textContent = btn.classList.contains("is-on")
            ? "Valymas vyksta"
            : "Kraunasi";
        }
      }
    });
  });


    // Robotas – valymo kalendorius / datų sąrašas
  (function () {
    const dateInput = document.getElementById("robot-date-input");
    const addBtn = document.getElementById("robot-date-add");
    const list = document.getElementById("robot-date-list");

    if (!dateInput || !addBtn || !list) return;

    function todayISO() {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }

    function addDate() {
      const value = dateInput.value || todayISO();

      // nekurti dublikatų
      const exists = Array.from(
        list.querySelectorAll(".item-text")
      ).some((el) => el.textContent === value);
      if (exists) return;

      const li = document.createElement("li");
      li.className = "shopping-item";
      li.innerHTML = `
        <label>
          <input type="checkbox" checked>
          <span class="custom-checkbox"></span>
          <span class="item-text"></span>
        </label>
      `;
      li.querySelector(".item-text").textContent = value;

      list.appendChild(li);
    }

    addBtn.addEventListener("click", addDate);

    // Enter ant date input (kai browser’is leidžia)
    dateInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addDate();
      }
    });

    // inicialiai – šiandien
    addDate();
  })();


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



    /* === VIRTUVĖS LEMPOS – 2 įrenginiai === */
  const kitchenLamps = [
    {
      src: "assets/img/rooms/lempa5.png",
      name: "Stalo apšvietimas",
      brightness: 75,
      on: true,
    },
    {
      src: "assets/img/rooms/lempa4.png",
      name: "Pagrindinis apšvietimas",
      brightness: 90,
      on: true,
    },
  ];

  const kLampImgEl = document.querySelector(".lamp-image-kitchen");
  const kLampNameEl = document.getElementById("kitchenLampName");
  const kLampBrightnessSlider = document.querySelector(".kitchen-lamp-brightness");
  const kLampBrightnessValue = document.getElementById("kitchenLampBrightnessValue");
  const kLampToggle = document.querySelector('[data-role="kitchen-lamp-power"]');

  let kLampIndex = 0;

  function renderKitchenLamp() {
    if (
      !kLampImgEl ||
      !kLampNameEl ||
      !kLampBrightnessSlider ||
      !kLampBrightnessValue ||
      !kLampToggle
    ) return;

    const lamp = kitchenLamps[kLampIndex];

    kLampImgEl.src = lamp.src;
    kLampImgEl.alt = lamp.name;
    kLampNameEl.textContent = lamp.name;

    kLampBrightnessSlider.value = lamp.brightness;
    kLampBrightnessValue.textContent = lamp.brightness;

    kLampToggle.classList.toggle("is-on", lamp.on);
  }

  document.querySelectorAll(".kitchen-lamp-prev, .kitchen-lamp-next").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.classList.contains("kitchen-lamp-next") ? 1 : -1;
      kLampIndex = (kLampIndex + dir + kitchenLamps.length) % kitchenLamps.length;
      renderKitchenLamp();
    });
  });

  if (kLampBrightnessSlider && kLampBrightnessValue) {
    kLampBrightnessSlider.addEventListener("input", () => {
      const lamp = kitchenLamps[kLampIndex];
      lamp.brightness = parseInt(kLampBrightnessSlider.value, 10);
      kLampBrightnessValue.textContent = lamp.brightness;
    });
  }

  if (kLampToggle) {
    kLampToggle.addEventListener("click", () => {
      const lamp = kitchenLamps[kLampIndex];
      lamp.on = !lamp.on;
      kLampToggle.classList.toggle("is-on", lamp.on);
    });
  }

  renderKitchenLamp();


  /* === AC temperatūra – kelioms kortoms (svetainė + vonia) === */
  (function () {
    const acCards = document.querySelectorAll(".ac-card");
    if (!acCards.length) return;

    function acLabelFor(v) {
      if (v <= 18) return "Cold";
      if (v >= 26) return "Warm";
      return "Comfort";
    }

    acCards.forEach((acCard) => {
      const acMinus = acCard.querySelector(".ac-btn.ac-minus");
      const acPlus = acCard.querySelector(".ac-btn.ac-plus");
      const acTempValue = acCard.querySelector(".ac-temp-value");
      const acTempLabel = acCard.querySelector(".ac-temp-label");
      const acTempSlider = acCard.querySelector(".ac-temp-slider");

      if (!acMinus || !acPlus || !acTempValue || !acTempSlider) return;

      const min = Number(acTempSlider.min) || 15;
      const max = Number(acTempSlider.max) || 30;

      function updateAcUI(value) {
        let v = Math.max(min, Math.min(max, value));

        acTempSlider.value = v;
        acTempValue.textContent = v;
        if (acTempLabel) acTempLabel.textContent = acLabelFor(v);

        // Tik svetainės kortai atnaujinam „livingTemp“ pilulę
        if (acCard.classList.contains("living-ac-card")) {
          const livingTemp = document.getElementById("livingTemp");
          if (livingTemp) livingTemp.textContent = v;
        }
      }

      acMinus.addEventListener("click", () => {
        updateAcUI(Number(acTempSlider.value) - 1);
      });

      acPlus.addEventListener("click", () => {
        updateAcUI(Number(acTempSlider.value) + 1);
      });

      acTempSlider.addEventListener("input", (e) => {
        updateAcUI(Number(e.target.value));
      });

      // pirminė būsena kiekvienai kortai
      updateAcUI(Number(acTempSlider.value));
    });
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
  

  
  
  
  
  /* === Eglutės spalvų ratas su pipete === */
  (function () {
    const wheel = document.querySelector(".tree-color-wheel");
    const knob = document.querySelector(".tree-color-knob");
    const colorLabel = document.getElementById("treeColorLabel");
    const colorPreview = document.getElementById("treeColorPreview");
    const colorInput = document.getElementById("treeColorPicker");

    if (!wheel || !knob || !colorLabel || !colorPreview || !colorInput) return;

    const outerRadiusOffset = 12; // kiek nutraukti nuo krašto
    const innerRadiusRatio = 0.4; // vidinio juodo rato santykis

    let isDragging = false;

    function hslToHex(h, s = 1, l = 0.5) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0,
        g = 0,
        b = 0;

      if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }

      const toHex = (v) =>
        Math.round((v + m) * 255)
          .toString(16)
          .padStart(2, "0");

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
      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI; // -180..180
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

  // Pirkinių sąrašas – pridėti elementą (VIRTUVĖ)
  (function () {
    const input = document.getElementById("shopping-input");
    const addBtn = document.getElementById("shopping-add");
    const list = document.getElementById("shopping-list");

    if (!input || !addBtn || !list) return;

    function addItem() {
      const value = input.value.trim();
      if (!value) return;

      const li = document.createElement("li");
      li.className = "shopping-item";
      li.innerHTML = `
        <label>
          <input type="checkbox">
          <span class="custom-checkbox"></span>
          <span class="item-text"></span>
        </label>
      `;
      li.querySelector(".item-text").textContent = value;
      list.appendChild(li);
      input.value = "";
      input.focus();
    }

    addBtn.addEventListener("click", addItem);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") addItem();
    });
  })();

  // Virdulio temperatūra – AC tipo pill mygtukai
  (function () {
    const container = document.getElementById("kettle-temp-buttons");
    const valueEl = document.getElementById("kettle-temp-value");
    if (!container || !valueEl) return;

    container.addEventListener("click", function (e) {
      const btn = e.target.closest(".pill");
      if (!btn) return;

      container.querySelectorAll(".pill").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const temp = btn.getAttribute("data-temp");
      valueEl.textContent = temp + "°C";
    });
  })();

  // Kavos aparatas – režimo pill mygtukai
  (function () {
    const container = document.getElementById("coffee-mode-buttons");
    const valueEl = document.getElementById("coffee-mode-value");
    if (!container || !valueEl) return;

    container.addEventListener("click", function (e) {
      const btn = e.target.closest(".pill");
      if (!btn) return;

      container.querySelectorAll(".pill").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const mode = btn.getAttribute("data-mode");
      valueEl.textContent = mode;
    });
  })();



    // Miegamasis – užuolaidų grafikas (pasirenkamas laikas + likęs laikas)
    // Miegamasis – užuolaidų grafikas (įvedimas klaviatūra + scroll)
  (function () {
    const hourEl = document.getElementById("curtainHour");
    const minuteEl = document.getElementById("curtainMinute");
    const textEl = document.getElementById("curtainTimeText");

    if (!hourEl || !minuteEl || !textEl) return;

    // leidžiam rašyti tiesiai į laukelius
    hourEl.setAttribute("contenteditable", "true");
    minuteEl.setAttribute("contenteditable", "true");

    function pad2(n) {
      return n.toString().padStart(2, "0");
    }

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    }

    function parseIntFromEl(el, max) {
      const raw = el.textContent.replace(/[^\d]/g, "");
      let n = parseInt(raw, 10);
      if (isNaN(n)) n = 0;
      return clamp(n, 0, max);
    }

    function updateCurtainText() {
      const h = parseIntFromEl(hourEl, 23);
      const m = parseIntFromEl(minuteEl, 59);

      hourEl.textContent = pad2(h);
      minuteEl.textContent = pad2(m);

      const now = new Date();
      const target = new Date(now);

      target.setHours(h, m, 0, 0);
      // jeigu laikas jau praėjęs – imsime rytojų
      if (target <= now) {
        target.setDate(target.getDate() + 1);
      }

      const diffMs = target - now;
      let totalMinutes = Math.round(diffMs / 60000);
      const hoursLeft = Math.floor(totalMinutes / 60);
      const minutesLeft = totalMinutes % 60;

      let leftText = "";
      if (hoursLeft === 0 && minutesLeft === 0) {
        leftText = "tuoj pat";
      } else {
        if (hoursLeft > 0) leftText += hoursLeft + " val.";
        if (minutesLeft > 0) {
          leftText += (leftText ? " " : "") + minutesLeft + " min.";
        }
      }

      textEl.textContent = `${pad2(h)}:${pad2(m)} (po ${leftText}).`;
    }

    function changeHour(delta) {
      let h = parseIntFromEl(hourEl, 23);
      h = (h + delta + 24) % 24;
      hourEl.textContent = pad2(h);
      updateCurtainText();
    }

    function changeMinute(delta) {
      let m = parseIntFromEl(minuteEl, 59);
      m = (m + delta + 60) % 60;
      minuteEl.textContent = pad2(m);
      updateCurtainText();
    }

    // SCROLL – ratukas ant skaičiaus: +1 / -1
    hourEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      changeHour(e.deltaY < 0 ? 1 : -1);
    });

    minuteEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      changeMinute(e.deltaY < 0 ? 1 : -1);
    });

    // BLUR / ENTER – kai baigi rašyti, normalizuojam reikšmes
    function attachEditHandlers(el, max) {
      el.addEventListener("blur", updateCurtainText);

      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          el.blur();
          return;
        }
        // leidžiam tik skaičius ir kelis valdymo klavišus
        const allowed = [
          "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",
        ];
        if (
          !allowed.includes(e.key) &&
          !(e.key >= "0" && e.key <= "9")
        ) {
          e.preventDefault();
        }
      });
    }

    attachEditHandlers(hourEl, 23);
    attachEditHandlers(minuteEl, 59);

    // pirminis perskaičiavimas
    updateCurtainText();
  })();


  // Miegamojo ryškumas – atnaujina procentą
  (function () {
    const slider = document.getElementById("bedroomBrightnessSlider");
    const valueEl = document.getElementById("bedroomBrightnessValue");
    if (!slider || !valueEl) return;

    function update() {
      valueEl.textContent = slider.value;
    }

    slider.addEventListener("input", update);
    update();
  })();

  // Miegamojo spalvų ratas – toks pats kaip eglutės, tik kiti selector'iai
  (function () {
    const wheel = document.querySelector(".bedroom-color-wheel");
    const knob = document.querySelector(".bedroom-color-knob");
    const colorLabel = document.getElementById("bedroomColorLabel");
    const colorPreview = document.getElementById("bedroomColorPreview");
    const colorInput = document.getElementById("bedroomColorPicker");

    if (!wheel || !knob || !colorLabel || !colorPreview || !colorInput) return;

    const outerRadiusOffset = 12;
    const innerRadiusRatio = 0.4;

    let isDragging = false;

    function hslToHex(h, s = 1, l = 0.5) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;

      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

      const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
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

      if (dist < innerR) {
        dx = (dx / (dist || 1)) * innerR;
        dy = (dy / (dist || 1)) * innerR;
      }
      if (dist > outerR) {
        dx = (dx / dist) * outerR;
        dy = (dy / dist) * outerR;
      }

      const kx = rect.width / 2 + dx;
      const ky = rect.height / 2 + dy;
      knob.style.left = `${kx}px`;
      knob.style.top = `${ky}px`;

      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
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

    wheel.addEventListener("pointerdown", handlePointerDown);
    knob.addEventListener("pointerdown", handlePointerDown);

    // iniciali pozicija pagal pradinę spalvą
    (function initFromHex() {
      const hex = colorInput.value || "#ffffff";
      colorLabel.textContent = hex;
      colorPreview.style.background = hex;

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

  // Audio sistema – garsas su slideriu ir +/- mygtukais
  (function () {
    const slider = document.getElementById("audioVolumeSlider");
    const valueEl = document.getElementById("audioVolumeValue");
    const minusBtn = document.querySelector(".audio-vol-minus");
    const plusBtn = document.querySelector(".audio-vol-plus");

    if (!slider || !valueEl || !minusBtn || !plusBtn) return;

    function clamp(v) {
      if (v < 0) return 0;
      if (v > 100) return 100;
      return v;
    }

    function update() {
      valueEl.textContent = slider.value;
    }

    slider.addEventListener("input", update);

    minusBtn.addEventListener("click", () => {
      slider.value = clamp(parseInt(slider.value, 10) - 5);
      update();
    });

    plusBtn.addEventListener("click", () => {
      slider.value = clamp(parseInt(slider.value, 10) + 5);
      update();
    });

    update();
  })();


  // Miegamasis – audio sistema: app pasirinkimas (Spotify / YouTube / SoundCloud)
  (function () {
    const audioCard = document.querySelector(".audio-card");
    if (!audioCard) return;

    const appsRow = audioCard.querySelector(".audio-apps-row");
    if (!appsRow) return;

    appsRow.addEventListener("click", (e) => {
      const btn = e.target.closest(".audio-app");
      if (!btn) return;

      // nuimam aktyvumą nuo visų
      appsRow.querySelectorAll(".audio-app").forEach((b) => {
        b.classList.remove("is-active");
      });

      // uždedam ant pasirinkto
      btn.classList.add("is-active");
    });
  })();

  // Vaikų kambarys – užuolaidų grafikas
  (function () {
    const hourEl = document.getElementById("kidsCurtainHour");
    const minuteEl = document.getElementById("kidsCurtainMinute");
    const textEl = document.getElementById("kidsCurtainTimeText");

    if (!hourEl || !minuteEl || !textEl) return;

    hourEl.setAttribute("contenteditable", "true");
    minuteEl.setAttribute("contenteditable", "true");

    function pad2(n) {
      return n.toString().padStart(2, "0");
    }

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    }

    function parseIntFromEl(el, max) {
      const raw = el.textContent.replace(/[^\d]/g, "");
      let n = parseInt(raw, 10);
      if (isNaN(n)) n = 0;
      return clamp(n, 0, max);
    }

    function updateCurtainText() {
      const h = parseIntFromEl(hourEl, 23);
      const m = parseIntFromEl(minuteEl, 59);

      hourEl.textContent = pad2(h);
      minuteEl.textContent = pad2(m);

      const now = new Date();
      const target = new Date(now);
      target.setHours(h, m, 0, 0);
      if (target <= now) {
        target.setDate(target.getDate() + 1);
      }

      const diffMs = target - now;
      let totalMinutes = Math.round(diffMs / 60000);
      const hoursLeft = Math.floor(totalMinutes / 60);
      const minutesLeft = totalMinutes % 60;

      let leftText = "";
      if (hoursLeft === 0 && minutesLeft === 0) {
        leftText = "tuoj pat";
      } else {
        if (hoursLeft > 0) leftText += hoursLeft + " val.";
        if (minutesLeft > 0) {
          leftText += (leftText ? " " : "") + minutesLeft + " min.";
        }
      }

      textEl.textContent = `${pad2(h)}:${pad2(m)} (po ${leftText}).`;
    }

    function changeHour(delta) {
      let h = parseIntFromEl(hourEl, 23);
      h = (h + delta + 24) % 24;
      hourEl.textContent = pad2(h);
      updateCurtainText();
    }

    function changeMinute(delta) {
      let m = parseIntFromEl(minuteEl, 59);
      m = (m + delta + 60) % 60;
      minuteEl.textContent = pad2(m);
      updateCurtainText();
    }

    hourEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      changeHour(e.deltaY < 0 ? 1 : -1);
    });

    minuteEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      changeMinute(e.deltaY < 0 ? 1 : -1);
    });

    function attachEditHandlers(el, max) {
      el.addEventListener("blur", updateCurtainText);

      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          el.blur();
          return;
        }
        const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        if (!allowed.includes(e.key) && !(e.key >= "0" && e.key <= "9")) {
          e.preventDefault();
        }
      });
    }

    attachEditHandlers(hourEl, 23);
    attachEditHandlers(minuteEl, 59);

    updateCurtainText();
  })();

    // Vaikų kambarys – naktinės lempos ryškumas
  (function () {
    const slider = document.getElementById("kidsBrightnessSlider");
    const valueEl = document.getElementById("kidsBrightnessValue");
    if (!slider || !valueEl) return;

    function update() {
      valueEl.textContent = slider.value;
    }

    slider.addEventListener("input", update);
    update();
  })();

    // Vaikų kambarys – spalvų ratas naktinei lempai
  (function () {
    const wheel = document.querySelector(".kids-color-wheel");
    const knob = document.querySelector(".kids-color-knob");
    const colorLabel = document.getElementById("kidsColorLabel");
    const colorPreview = document.getElementById("kidsColorPreview");
    const colorInput = document.getElementById("kidsColorPicker");

    if (!wheel || !knob || !colorLabel || !colorPreview || !colorInput) return;

    const outerRadiusOffset = 12;
    const innerRadiusRatio = 0.4;
    let isDragging = false;

    function hslToHex(h, s = 1, l = 0.5) {
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;

      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

      const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
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

      if (dist < innerR) {
        dx = (dx / (dist || 1)) * innerR;
        dy = (dy / (dist || 1)) * innerR;
      }
      if (dist > outerR) {
        dx = (dx / dist) * outerR;
        dy = (dy / dist) * outerR;
      }

      const kx = rect.width / 2 + dx;
      const ky = rect.height / 2 + dy;
      knob.style.left = `${kx}px`;
      knob.style.top = `${ky}px`;

      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
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

    wheel.addEventListener("pointerdown", handlePointerDown);
    knob.addEventListener("pointerdown", handlePointerDown);

    // Iniciali pozicija pagal pradinę spalvą
    (function initFromHex() {
      const hex = colorInput.value || "#ffffff";
      colorLabel.textContent = hex;
      colorPreview.style.background = hex;

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

    // Vaikų kambarys – ventiliatoriaus greitis
  (function () {
    const slider = document.getElementById("kidsFanSpeedSlider");
    const valueEl = document.getElementById("kidsFanSpeedValue");
    if (!slider || !valueEl) return;

    function clamp(v) {
      if (v < 0) return 0;
      if (v > 100) return 100;
      return v;
    }

    function update() {
      valueEl.textContent = slider.value;
    }

    slider.addEventListener("input", () => {
      slider.value = clamp(parseInt(slider.value, 10));
      update();
    });

    update();
  })();

  
  // Veidrodžio šildymas – temperatūros pill mygtukai (VONIA)
  (function () {
    const container = document.getElementById("mirror-temp-buttons");
    const valueEl = document.getElementById("mirror-temp-value");
    if (!container || !valueEl) return;

    container.addEventListener("click", function (e) {
      const btn = e.target.closest(".pill");
      if (!btn) return;

      container.querySelectorAll(".pill").forEach((b) =>
        b.classList.remove("is-active")
      );
      btn.classList.add("is-active");

      const temp = btn.getAttribute("data-temp");
      valueEl.textContent = temp + "°C";
    });
  })();


})(); // ČIA – vienintelis uždarymas didžiajam (function () { ... })()
