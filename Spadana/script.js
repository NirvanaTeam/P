// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initPreloader()
  initCustomCursor()
  initMobileMenu()
  initThemeToggle()
  initScrollEffects()
  initProductFilter()
  initTestimonialSlider()
  initCounterAnimation()
  initParticles()
  initTiltEffect()
  initFormHandling()
  initSmoothScrolling()
  initBackToTop()
  initRevealAnimations()

  // Performance optimization
  initLazyLoading()
  initIntersectionObserver()
})
// Preloader
function initPreloader() {
  const preloader = document.querySelector(".preloader");
  
  // نمایش کوتاه‌تر و حذف تایم‌اوت اضافی
  setTimeout(() => {
    preloader.classList.add("hidden");
    preloader.style.display = "none";
  }, 500); // کاهش از 1000 به 500 میلی‌ثانیه
}
// Custom Cursor
function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  if (!cursorDot || !cursorOutline) return

  let mouseX = 0
  let mouseY = 0
  let outlineX = 0
  let outlineY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursorDot.style.left = mouseX + "px"
    cursorDot.style.top = mouseY + "px"
  })

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.1
    outlineY += (mouseY - outlineY) * 0.1

    cursorOutline.style.left = outlineX + "px"
    cursorOutline.style.top = outlineY + "px"

    requestAnimationFrame(animateOutline)
  }

  animateOutline()

  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .btn, [data-cursor="pointer"]')

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "scale(2)"
      cursorOutline.style.transform = "scale(1.5)"
    })

    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "scale(1)"
      cursorOutline.style.transform = "scale(1)"
    })
  })
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const navList = document.getElementById("nav-list")

  if (!mobileMenuBtn || !navList) return

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    navList.classList.toggle("active")

    // Prevent body scroll when menu is open
    document.body.style.overflow = navList.classList.contains("active") ? "hidden" : ""
  })

  // Close menu when clicking on nav links
  const navLinks = navList.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active")
      navList.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navList.contains(e.target)) {
      mobileMenuBtn.classList.remove("active")
      navList.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")

  if (!themeToggle) return

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Add animation class
    themeToggle.style.transform = "scale(0.8)"
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)"
    }, 150)
  })
}

// Scroll Effects
function initScrollEffects() {
  const header = document.querySelector(".header")
  const mainNav = document.querySelector(".main-nav")

  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    // Header scroll effect
    if (header) {
      if (currentScrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }

    // Navigation hide/show on scroll
    if (mainNav) {
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        mainNav.style.transform = "translateY(-100%)"
      } else {
        mainNav.style.transform = "translateY(0)"
      }
    }

    lastScrollY = currentScrollY
  })

  // Parallax effect for hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      hero.style.transform = `translateY(${parallax}px)`
    })
  }
}

// Product Filter
function initProductFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const productCards = document.querySelectorAll(".product-card")

  if (!filterBtns.length || !productCards.length) return

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      // Filter products with animation
      productCards.forEach((card, index) => {
        const category = card.getAttribute("data-category")

        if (filterValue === "all" || category === filterValue) {
          setTimeout(() => {
            card.style.display = "block"
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"

            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 50)
          }, index * 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(-20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Testimonial Slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".testimonial-dot")
  const prevBtn = document.getElementById("prev-testimonial")
  const nextBtn = document.getElementById("next-testimonial")

  if (!slides.length) return

  let currentSlide = 0

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show the selected slide
    slides[index].classList.add("active")
    if (dots[index]) dots[index].classList.add("active")

    currentSlide = index
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length
    showSlide(next)
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length
    showSlide(prev)
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  if (prevBtn) prevBtn.addEventListener("click", prevSlide)

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index))
  })

  // Auto slide
  setInterval(nextSlide, 5000)

  // Touch/swipe support
  let startX = 0
  let endX = 0

  const slider = document.querySelector(".testimonial-slider")
  if (slider) {
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    slider.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      handleSwipe()
    })

    function handleSwipe() {
      const threshold = 50
      const diff = startX - endX

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
    }
  }
}

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll("[data-count]")

  if (!counters.length) return

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      counter.textContent = Math.floor(current)
    }, 16)
  }

  // Intersection Observer for counter animation
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Particles Animation
function initParticles() {
  const particleContainers = document.querySelectorAll("#hero-particles, #cta-particles")

  particleContainers.forEach((container) => {
    if (!container) return

    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background-color: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `
      container.appendChild(particle)
    }
  })

  // Add CSS animation for particles
  const style = document.createElement("style")
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
    }
  `
  document.head.appendChild(style)
}

// Tilt Effect
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]")

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    })
  })
}

// Form Handling
function initFormHandling() {
  const contactForm = document.getElementById("contact-form")
  const newsletterForm = document.getElementById("newsletter-form")

  // Contact Form
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...'
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        showNotification("پیام شما با موفقیت ارسال شد!", "success")

        // Reset form
        contactForm.reset()

        // Reset button
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Newsletter Form
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = newsletterForm.querySelector('input[type="email"]').value

      // Show success message
      showNotification("با موفقیت در خبرنامه عضو شدید!", "success")

      // Reset form
      newsletterForm.reset()
    })
  }

  // Form validation
  const inputs = document.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearValidation)
  })

  function validateField(e) {
    const field = e.target
    const value = field.value.trim()

    // Remove existing validation
    clearValidation(e)

    if (field.hasAttribute("required") && !value) {
      showFieldError(field, "این فیلد الزامی است")
      return false
    }

    if (field.type === "email" && value && !isValidEmail(value)) {
      showFieldError(field, "ایمیل معتبر وارد کنید")
      return false
    }

    if (field.type === "tel" && value && !isValidPhone(value)) {
      showFieldError(field, "شماره تلفن معتبر وارد کنید")
      return false
    }

    return true
  }

  function clearValidation(e) {
    const field = e.target
    const errorElement = field.parentNode.querySelector(".field-error")
    if (errorElement) {
      errorElement.remove()
    }
    field.classList.remove("error")
  }

  function showFieldError(field, message) {
    field.classList.add("error")

    const errorElement = document.createElement("span")
    errorElement.className = "field-error"
    errorElement.textContent = message
    errorElement.style.cssText = `
      color: var(--danger-color);
      font-size: var(--font-size-sm);
      margin-top: 5px;
      display: block;
    `

    field.parentNode.appendChild(errorElement)
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-+$$$$]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const targetId = link.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      const headerHeight = document.querySelector(".header").offsetHeight
      const navHeight = document.querySelector(".main-nav").offsetHeight
      const offset = headerHeight + navHeight + 20

      const targetPosition = targetElement.offsetTop - offset

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Update active nav link
      updateActiveNavLink(targetId)
    })
  })

  function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active")
      }
    })
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top")

  if (!backToTopBtn) return

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Reveal Animations
function initRevealAnimations() {
  const revealElements = document.querySelectorAll("[data-reveal]")

  if (!revealElements.length) return

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          const animationType = element.getAttribute("data-reveal")
          const delay = element.getAttribute("data-delay") || 0

          setTimeout(() => {
            element.classList.add("revealed")
          }, delay)

          revealObserver.unobserve(element)
        }
      })
    },
    { threshold: 0.1 },
  )

  revealElements.forEach((element) => {
    revealObserver.observe(element)
  })
}

// Lazy Loading
function initLazyLoading() {
  const lazyImages = document.querySelectorAll("img[data-src]")

  if (!lazyImages.length) return

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.getAttribute("data-src")
        img.removeAttribute("data-src")
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  lazyImages.forEach((img) => {
    imageObserver.observe(img)
  })
}

// در بخش initIntersectionObserver() این تغییرات را انجام دهید:
function initIntersectionObserver() {
  const animatedElements = document.querySelectorAll(".service-card, .product-card, .blog-card, .feature-item, .hero-image");
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('hero-image')) {
            entry.target.style.animation = 'slideUp 1s ease-out forwards';
          } else {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) => {
    if (element.classList.contains('hero-image')) {
      element.style.opacity = "0";
      element.style.transform = "translateY(50px)";
    } else {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
    }
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}
// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${getNotificationColor(type)};
    color: white;
    padding: 15px 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `

  document.body.appendChild(notification)

  // Show notification
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Auto hide
  setTimeout(() => {
    hideNotification(notification)
  }, 5000)

  // Close button
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    hideNotification(notification)
  })

  function hideNotification(notification) {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }

  function getNotificationIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    }
    return icons[type] || icons.info
  }

  function getNotificationColor(type) {
    const colors = {
      success: "var(--success-color)",
      error: "var(--danger-color)",
      warning: "var(--warning-color)",
      info: "var(--info-color)",
    }
    return colors[type] || colors.info
  }
}

// Performance Optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply performance optimizations
window.addEventListener(
  "scroll",
  throttle(() => {
    // Scroll-based animations and effects
  }, 16),
)

window.addEventListener(
  "resize",
  debounce(() => {
    // Resize-based recalculations
  }, 250),
)

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
})

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
