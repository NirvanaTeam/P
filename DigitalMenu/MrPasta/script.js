// Menu Items Data
const menuItems = [
  {
    id: 1,
    name: "لازانیا رویال",
    description: "گوشت چرخ کرده (مخلوط گوسفندی و گوساله)، قارچ، سس خامه، سس مخصوص، پنیر پیتزا",
    singlePrice: 358,
    halfPrice: 0,
    emoji: "🍝",
  },
  {
    id: 2,
    name: "پاربینارا",
    description: "مغز ران گوساله ۱۵۰ گرم، قارچ، جعفری، زیتون سبز، سس پاربینارا، پنیر پارمسان",
    singlePrice: 327,
    halfPrice: 163,
    emoji: "🍝",
  },
  {
    id: 3,
    name: "کارتیزه",
    description: "مغز ران گوساله ۱۵۰ گرم، قارچ، گوجه گیلاسی، زیتون سبز، پومودورو، پنیر پارمسان",
    singlePrice: 322,
    halfPrice: 160,
    emoji: "🍝",
  },
  {
    id: 4,
    name: "پستو",
    description: "سینه مرغ فیله شده ۱۲۰ گرم، قارچ، زیتون سبز، سس گرم پستو، پنیر پارمسان",
    singlePrice: 318,
    halfPrice: 158,
    emoji: "🍝",
  },
  {
    id: 5,
    name: "بولونی",
    description: "میکس بال ۱۲۰ گرم، قارچ، فلفل دلمه، گوجه گیلاسی، زیتون سبز، پومودورو، پنیر پارمسان",
    singlePrice: 328,
    halfPrice: 162,
    emoji: "🍝",
  },
  {
    id: 6,
    name: "کروبارا",
    description: "سینه مرغ فیله شده ۱۲۰ گرم، قارچ، زیتون سبز، تخم‌مرغ، سس خامه، پنیر پارمسان",
    singlePrice: 320,
    halfPrice: 159,
    emoji: "🍝",
  },
  {
    id: 7,
    name: "ربیتو",
    description: "سوسیس فرانکفورتر، قارچ، فلفل دلمه، زیتون سبز، سس خامه، پنیر پیتزا",
    singlePrice: 336,
    halfPrice: 163,
    emoji: "🍝",
  },
  {
    id: 8,
    name: "آلفو",
    description: "سینه مرغ فیله شده ۱۰۰ گرم، قارچ، زیتون سبز، سس آلفردو، پنیر پارمسان",
    singlePrice: 306,
    halfPrice: 152,
    emoji: "🍝",
  },
  {
    id: 9,
    name: "ماریتو",
    description: "ژامبون مرغ دودی ۱۰۰ گرم، قارچ، زیتون سبز، سس آلفردو، پنیر پارمسان",
    singlePrice: 342,
    halfPrice: 170,
    emoji: "🍝",
  },
]

// DOM Elements
const loadingScreen = document.getElementById("loadingScreen")
const mainMenu = document.getElementById("mainMenu")
const menuBtn = document.getElementById("menuBtn")
const menuGrid = document.getElementById("menuGrid")

// Format price function
function formatPrice(price) {
  if (price === 0) {
    return "قیمت تماس بگیرید"
  }
  return price.toLocaleString("fa-IR") + " تومان"
}

// Create menu item HTML
function createMenuItem(item) {
  return `
        <div class="menu-item">
            <div class="menu-item-content">
                <div class="menu-item-info">
                    <div class="menu-item-header">
                        <span class="menu-item-emoji">${item.emoji}</span>
                        <h3 class="menu-item-title">${item.name}</h3>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                </div>
                
                <div class="menu-item-prices">
                    <div class="price-option single-portion">
                        <div class="price-badge">تک پرسی</div>
                        <div class="price-value">${formatPrice(item.singlePrice)}</div>
                    </div>
                    
                    <div class="price-option half-portion">
                        <div class="price-badge">نیم پرسی</div>
                        <div class="price-value">${formatPrice(item.halfPrice)}</div>
                    </div>
                </div>
            </div>
        </div>
    `
}

// Render menu items
function renderMenuItems() {
  menuGrid.innerHTML = menuItems.map((item) => createMenuItem(item)).join("")
}

// Show menu function
function showMenu() {
  loadingScreen.style.opacity = "0"
  loadingScreen.style.transform = "translateX(-100%)"

  setTimeout(() => {
    loadingScreen.classList.add("hidden")
    mainMenu.classList.remove("hidden")

    // Trigger menu items animation
    const menuItemElements = document.querySelectorAll(".menu-item")
    menuItemElements.forEach((item, index) => {
      setTimeout(() => {
        item.style.animationPlayState = "running"
      }, index * 100)
    })
  }, 800)
}

// Add smooth scrolling for better UX
function addSmoothScrolling() {
  document.documentElement.style.scrollBehavior = "smooth"
}

// Add loading animation completion
function completeLoadingAnimation() {
  setTimeout(() => {
    const pastaAnimation = document.querySelector(".pasta-animation")
    const menuButton = document.querySelector(".menu-button")

    if (pastaAnimation) {
      pastaAnimation.style.animationDuration = "2s"
    }

    if (menuButton) {
      menuButton.style.animationDuration = "1s"
    }
  }, 2000)
}

// Add hover effects for menu items
function addMenuItemHoverEffects() {
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(".menu-item")) {
      const item = e.target.closest(".menu-item")
      item.style.transform = "translateY(-5px) scale(1.02)"
    }
  })

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(".menu-item")) {
      const item = e.target.closest(".menu-item")
      item.style.transform = "translateY(0) scale(1)"
    }
  })
}

// Add click animation for price options
function addPriceOptionEffects() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".price-option")) {
      const option = e.target.closest(".price-option")
      option.style.transform = "scale(0.95)"

      setTimeout(() => {
        option.style.transform = "scale(1)"
      }, 150)
    }
  })
}

// Initialize the application
function init() {
  // Render menu items
  renderMenuItems()

  // Add event listeners
  menuBtn.addEventListener("click", showMenu)

  // Add smooth scrolling
  addSmoothScrolling()

  // Complete loading animation
  completeLoadingAnimation()

  // Add interactive effects
  addMenuItemHoverEffects()
  addPriceOptionEffects()

  // Auto-show menu after 5 seconds if user doesn't click
  setTimeout(() => {
    if (!mainMenu.classList.contains("hidden")) return

    const autoShowBtn = document.createElement("div")
    autoShowBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(74, 95, 77, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
            z-index: 1001;
            animation: fadeIn 0.5s ease-out;
        `
    autoShowBtn.textContent = "کلیک کنید تا وارد منو شوید"
    autoShowBtn.addEventListener("click", showMenu)
    document.body.appendChild(autoShowBtn)

    setTimeout(() => {
      if (autoShowBtn.parentNode) {
        autoShowBtn.remove()
      }
    }, 3000)
  }, 5000)
}

// Start the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init)

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (!mainMenu.classList.contains("hidden")) return
    e.preventDefault()
    showMenu()
  }
})

// Add touch support for mobile devices
let touchStartY = 0
let touchEndY = 0

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY
})

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartY - touchEndY

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && !mainMenu.classList.contains("hidden")) {
      // Swipe up - could add functionality here
    } else if (diff < 0 && mainMenu.classList.contains("hidden")) {
      // Swipe down on loading screen - show menu
      showMenu()
    }
  }
}

// Performance optimization: Lazy load animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe menu items when they're created
setTimeout(() => {
  const menuItemElements = document.querySelectorAll(".menu-item")
  menuItemElements.forEach((item) => {
    item.style.animationPlayState = "paused"
    observer.observe(item)
  })
}, 1000)
