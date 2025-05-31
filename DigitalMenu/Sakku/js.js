document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const menuSections = document.querySelectorAll('.menu-section');
    const prevBtn = document.getElementById('prevTab');
    const nextBtn = document.getElementById('nextTab');
    const tabsContainer = document.querySelector('.tabs-container');
    const tabsWrapper = document.querySelector('.tabs');
    
    let activeTabIndex = 0;
    
    function setActiveTab(index) {
        // Remove active class from all tabs and sections
        tabs.forEach(t => t.classList.remove('active'));
        menuSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to selected tab
        tabs[index].classList.add('active');
        
        // Show corresponding section with animation
        const category = tabs[index].getAttribute('data-category');
        const activeSection = document.getElementById(category);
        activeSection.classList.add('active');
        
        // Animate menu items
        animateMenuItems(activeSection);
        
        // Scroll tabs container to make active tab visible
        scrollTabIntoView(tabs[index]);
    }
    
    function animateMenuItems(section) {
        const menuItems = section.querySelectorAll('.menu-item');
        menuItems.forEach((item, i) => {
            // Reset animation
            item.classList.remove('animate');
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Apply animation with delay
            setTimeout(() => {
                item.classList.add('animate');
            }, i * 100);
        });
    }
    
    function scrollTabIntoView(tab) {
        const containerWidth = tabsContainer.offsetWidth;
        const tabLeft = tab.offsetLeft;
        const tabWidth = tab.offsetWidth;
        
        // Calculate scroll position
        let scrollPos = tabLeft - (containerWidth / 2) + (tabWidth / 2);
        
        // Limit scroll position
        const maxScroll = tabsWrapper.scrollWidth - containerWidth;
        scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));
        
        // Smooth scroll
        tabsContainer.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
    }
    
    // Initialize first tab
    setActiveTab(0);
    
    // Tab click event
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            activeTabIndex = index;
            setActiveTab(activeTabIndex);
        });
    });
    
    // Navigation arrows
    prevBtn.addEventListener('click', function() {
        activeTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
        setActiveTab(activeTabIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        activeTabIndex = (activeTabIndex + 1) % tabs.length;
        setActiveTab(activeTabIndex);
    });
    
    // Touch events for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    tabsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - tabsContainer.offsetLeft;
        scrollLeft = tabsContainer.scrollLeft;
    });
    
    tabsContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    tabsContainer.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    tabsContainer.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - tabsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tabsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events
    tabsContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - tabsContainer.offsetLeft;
        scrollLeft = tabsContainer.scrollLeft;
    });
    
    tabsContainer.addEventListener('touchend', () => {
        isDown = false;
    });
    
    tabsContainer.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        const x = e.touches[0].pageX - tabsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tabsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            activeTabIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
            setActiveTab(activeTabIndex);
        } else if (e.key === 'ArrowLeft') {
            activeTabIndex = (activeTabIndex + 1) % tabs.length;
            setActiveTab(activeTabIndex);
        }
    });
});