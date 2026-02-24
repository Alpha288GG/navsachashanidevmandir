document.addEventListener("DOMContentLoaded", () => {

  // --- Language Toggle ---
  const langToggle = document.getElementById("langToggle");
  const langToggleHeader = document.getElementById("langToggleHeader");
  const langLabel = document.getElementById("langLabel");
  let currentLang = "mr";

  function toggleLanguage() {
    currentLang = currentLang === "mr" ? "en" : "mr";
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        return;
      }
      el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    document.documentElement.lang = currentLang;

    // Update button label
    if (langLabel) {
      langLabel.textContent = currentLang === "mr" ? "English" : "मराठी";
    }
  }

  if (langToggle) langToggle.addEventListener("click", toggleLanguage);
  if (langToggleHeader) langToggleHeader.addEventListener("click", toggleLanguage);

  // --- Mobile Menu ---
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileNav.classList.toggle("active");
    });

    // Close on link click
    mobileNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("active");
      });
    });
  }

  // --- Header Scroll Effect ---
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      header.style.boxShadow = "0 2px 12px rgba(0,0,0,0.12)";
    } else {
      header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
    }
  });

  // --- Image Slider (Smooth Loop & Drag) ---
  const slider = document.querySelector('.ticker-wrapper');
  let isDown = false;
  let startX;
  let scrollLeft;
  let animationId;

  if (slider) {
    const scroll = () => {
      if (!isDown) {
        slider.scrollLeft += 1.2; // Smooth constant speed
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    const startAnimation = () => {
      if (!animationId) animationId = requestAnimationFrame(scroll);
    };

    const stopAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('dragging');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      stopAnimation();
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('dragging');
      startAnimation();
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('dragging');
      startAnimation();
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      stopAnimation();
    });
    
    slider.addEventListener('touchend', () => {
      isDown = false;
      startAnimation();
    });

    startAnimation();
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(
    ".service-card, .about-content, .news-frame, .president-content, .aarti-card, .timing-card, .gallery-item, .donation-layout, .contact-layout, .section-title-bar"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Add revealed class styles
  const style = document.createElement("style");
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // Stagger service cards
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // Stagger gallery items
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- Contact Form WhatsApp ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const phone = document.getElementById("contactPhone").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      if (!name || !phone || !message) {
        alert("कृपया सर्व आवश्यक माहिती भरा / Please fill all required fields.");
        return;
      }

      const whatsappNumber = "918805353120";
      let msg = `🙏 *नवसाचा शनिदेव मंदिर - संपर्क*\n\n`;
      msg += `👤 *नाव:* ${name}\n`;
      msg += `📱 *फोन:* ${phone}\n`;
      if (email) msg += `📧 *ईमेल:* ${email}\n`;
      msg += `\n💬 *संदेश:*\n${message}`;

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
      contactForm.reset();
    });
  }

});
