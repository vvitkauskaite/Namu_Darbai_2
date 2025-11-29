(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint === 'undefined') return;
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /**
   * Init isotope layout and filters
   */
  if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          aosInit && aosInit();
        }, false);
      });

    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /* ===== mano editai – profile dropdown ===== */

  const profileInfo = document.querySelector('.profile-info');
  const profileToggle = document.querySelector('.profile-toggle');

  if (profileInfo && profileToggle) {
    profileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      profileInfo.classList.toggle('open');
    });

    const deepToggle = profileInfo.querySelector('.profile-menu .has-children > .has-children-toggle');

    if (deepToggle) {
      deepToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        deepToggle.parentElement.classList.toggle('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (!profileInfo.contains(e.target)) {
        profileInfo.classList.remove('open');
      }
    });
  }

  /* === Hero media video — play/pause ant paspaudimo === */

  const heroMedia = document.getElementById('heroMedia');

  if (heroMedia) {
    const heroVideo = heroMedia.querySelector('.hero-bg-video');

    heroMedia.addEventListener('click', () => {
      if (!heroVideo) return;

      if (heroVideo.paused) {
        heroMedia.classList.add('is-playing');
        heroVideo.currentTime = 0;
        heroVideo.play();
      } else {
        heroMedia.classList.remove('is-playing');
        heroVideo.pause();
      }
    });
  }

  /* === Live clock (HH:MM) === */
  function updateLiveClock() {
    const el = document.getElementById("liveClock");
    if (!el) return;

    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");

    el.textContent = `${h}:${m}`;
  }

  /* === Live date (YYYY-MM-DD) === */
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

  /* === WiFi (online / offline) statusas === */
  function updateWifiStatus() {
    const el = document.getElementById("wifiStatus");
    if (!el) return;

    if (navigator.onLine) {
      el.textContent = "Prisijungta";
      el.previousElementSibling.classList.remove("bi-wifi-off");
      el.previousElementSibling.classList.add("bi-wifi");
    } else {
      el.textContent = "Atsijungta";
      el.previousElementSibling.classList.remove("bi-wifi");
      el.previousElementSibling.classList.add("bi-wifi-off");
    }
  }

  window.addEventListener("online", updateWifiStatus);
  window.addEventListener("offline", updateWifiStatus);
  updateWifiStatus();

  /* === Scroll hint hide on scroll === */
  const scrollHint = document.querySelector('.scroll-hint');

  function updateScrollHint() {
    if (!scrollHint) return;
    if (window.scrollY > 80) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }
  }

  window.addEventListener('scroll', updateScrollHint);
  window.addEventListener('load', updateScrollHint);

})();
