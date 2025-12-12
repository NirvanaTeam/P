/**
 * Command Center - Admin Panel
 * Main JavaScript File
 * Version: 2.4.1
 */

// ============================================== //
// GLOBAL VARIABLES
// ============================================== //

const App = {
    sidebar: null,
    mainContent: null,
    preloader: null,
    isLoading: true,
    theme: localStorage.getItem('theme') || 'dark',
    sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
    refreshInterval: null,
    serverTimeInterval: null
};

// ============================================== //
// DOM READY
// ============================================== //

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ============================================== //
// INITIALIZE APP
// ============================================== //

function initializeApp() {
    // Cache DOM elements
    cacheElements();
    
    // Initialize components
    initPreloader();
    initSidebar();
    initTheme();
    initNavigation();
    initSearch();
    initNotifications();
    initTooltips();
    initCounters();
    initServerTime();
    initStatusTicker();
    initTerminal();
    initCommandPalette();
    initContextMenu();
    initFullscreen();
    initKeyboardShortcuts();
    initModals();
    initSettings();
    initActivityUpdates();
    
    // Log initialization
    console.log('%c Command Center v2.4.1 ', 'background: #58a6ff; color: #0d1117; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
}

// ============================================== //
// CACHE ELEMENTS
// ============================================== //

function cacheElements() {
    App.preloader = document.getElementById('preloader');
	App.sidebarBackdrop = document.getElementById('sidebarBackdrop');
    App.sidebar = document.getElementById('sidebar');
    App.mainContent = document.getElementById('mainContent');
    App.mainWrapper = document.getElementById('mainWrapper');
}

// ============================================== //
// PRELOADER
// ============================================== //

function initPreloader() {
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (App.preloader) {
                App.preloader.classList.add('hidden');
                App.isLoading = false;
                
                // Remove preloader from DOM after animation
                setTimeout(function() {
                    App.preloader.style.display = 'none';
                }, 500);
            }
        }, 1500);
    });
}

// ============================================== //
// SIDEBAR
// ============================================== //

function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    // Restore sidebar state
    if (App.sidebarCollapsed && App.sidebar) {
        App.sidebar.classList.add('collapsed');
    }
    
    // Desktop toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Mobile toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    // Backdrop click closes sidebar on mobile
if (App.sidebarBackdrop) {
    App.sidebarBackdrop.addEventListener('click', () => {
        App.sidebar.classList.remove('show');
        document.body.classList.remove('no-scroll');
        App.sidebarBackdrop.classList.remove('visible');
    });
}

// ESC to close on mobile
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth <= 992 && App.sidebar.classList.contains('show')) {
        App.sidebar.classList.remove('show');
        document.body.classList.remove('no-scroll');
        App.sidebarBackdrop.classList.remove('visible');
    }
});

    // Close mobile sidebar on outside click
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            if (!App.sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                App.sidebar.classList.remove('show');
            }
        }
    });
    
    // Handle resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 992) {
            App.sidebar.classList.remove('show');
        }
    }, 250));
}

function toggleSidebar() {
    App.sidebar.classList.toggle('collapsed');
    App.sidebarCollapsed = App.sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', App.sidebarCollapsed);
}

function toggleMobileSidebar() {
    const willShow = !App.sidebar.classList.contains('show');
    App.sidebar.classList.toggle('show', willShow);
    if (willShow) {
        document.body.classList.add('no-scroll');
        if (App.sidebarBackdrop) App.sidebarBackdrop.classList.add('visible');
    } else {
        document.body.classList.remove('no-scroll');
        if (App.sidebarBackdrop) App.sidebarBackdrop.classList.remove('visible');
    }
}


function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Apply saved theme
    applyTheme(App.theme);
    
    // Header theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            App.theme = App.theme === 'dark' ? 'light' : 'dark';
            applyTheme(App.theme);
            localStorage.setItem('theme', App.theme);
            
            // Sync with settings panel
            if (darkModeToggle) {
                darkModeToggle.checked = App.theme === 'dark';
            }
        });
    }
    
    // Settings panel toggle
    if (darkModeToggle) {
        darkModeToggle.checked = App.theme === 'dark';
        darkModeToggle.addEventListener('change', function() {
            App.theme = this.checked ? 'dark' : 'light';
            applyTheme(App.theme);
            localStorage.setItem('theme', App.theme);
        });
    }
}

function applyTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    }
}

// ============================================== //
// NAVIGATION
// ============================================== //

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Get page name
            const page = this.getAttribute('data-page');
            
            // Update breadcrumb and title
            updatePageHeader(page, this.querySelector('span').textContent);
            
            // Close mobile sidebar
            if (window.innerWidth <= 992) {
                App.sidebar.classList.remove('show');
            }
            
            // Show toast
            showToast('info', `در حال بارگذاری ${this.querySelector('span').textContent}...`);
        });
    });
}

function updatePageHeader(page, title) {
    const pageTitle = document.querySelector('.page-title');
    const breadcrumbActive = document.querySelector('.breadcrumb-item.active');
    
    if (pageTitle) {
        pageTitle.textContent = title;
    }
    
    if (breadcrumbActive) {
        breadcrumbActive.textContent = title;
    }
}

// ============================================== //
// SEARCH
// ============================================== //

function initSearch() {
    const globalSearch = document.getElementById('globalSearch');
    const commandSearch = document.getElementById('commandSearch');
    
    if (globalSearch) {
        globalSearch.addEventListener('focus', function() {
            openCommandPalette();
        });
        
        globalSearch.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    if (commandSearch) {
        commandSearch.addEventListener('input', function() {
            filterCommands(this.value);
        });
    }
}

function performSearch(query) {
    if (!query.trim()) return;
    
    console.log('Searching for:', query);
    showToast('info', `در حال جستجوی "${query}"...`);
}

function filterCommands(query) {
    const commandItems = document.querySelectorAll('.command-item');
    const lowerQuery = query.toLowerCase();
    
    commandItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(lowerQuery) || !query) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// ============================================== //
// NOTIFICATIONS
// ============================================== //

function initNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    const markAllRead = document.querySelector('.notification-header .btn-link');
    
    if (markAllRead) {
        markAllRead.addEventListener('click', function(e) {
            e.preventDefault();
            markAllNotificationsRead();
        });
    }
    
    // Notification items click
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.remove('unread');
            updateNotificationCount();
        });
    });
}

function markAllNotificationsRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
    });
    updateNotificationCount();
    showToast('success', 'همه اعلان‌ها خوانده شد');
}

function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const countBadge = document.querySelector('.notification-count');
    
    if (countBadge) {
        if (unreadCount > 0) {
            countBadge.textContent = unreadCount;
            countBadge.style.display = 'flex';
        } else {
            countBadge.style.display = 'none';
        }
    }
}

// ============================================== //
// TOOLTIPS
// ============================================== //

function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => {
        new bootstrap.Tooltip(el, {
            trigger: 'hover'
        });
    });
}

// ============================================== //
// COUNTERS ANIMATION
// ============================================== //

function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function formatNumber(num) {
    return new Intl.NumberFormat('fa-IR').format(num);
}

// ============================================== //
// SERVER TIME
// ============================================== //

function initServerTime() {
    updateServerTime();
    App.serverTimeInterval = setInterval(updateServerTime, 1000);
}

function updateServerTime() {
    const serverTimeEl = document.getElementById('serverTime');
    if (serverTimeEl) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        serverTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// ============================================== //
// STATUS TICKER
// ============================================== //

function initStatusTicker() {
    const ticker = document.querySelector('.status-ticker');
    if (!ticker) return;
    
    // Clone ticker content for seamless loop
    const tickerContent = ticker.innerHTML;
    ticker.innerHTML = tickerContent + tickerContent;
}

// ============================================== //
// TERMINAL
// ============================================== //

function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!terminalInput || !terminalOutput) return;
    
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command) {
                executeCommand(command);
                this.value = '';
            }
        }
    });
}

function executeCommand(command) {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput) return;
    
    // Remove cursor from last line
    const cursor = terminalOutput.querySelector('.terminal-cursor');
    if (cursor) {
        cursor.parentElement.remove();
    }
    
    // Add command line
    addTerminalLine(`<span class="terminal-prompt">system@command-center:~$</span> <span class="terminal-text">${escapeHtml(command)}</span>`);
    
    // Process command
    const output = processCommand(command.toLowerCase());
    
    // Add output
    if (Array.isArray(output)) {
        output.forEach(line => addTerminalLine(line));
    } else {
        addTerminalLine(output);
    }
    
    // Add new prompt with cursor
    addTerminalLine(`<span class="terminal-prompt">system@command-center:~$</span> <span class="terminal-cursor">█</span>`);
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function processCommand(command) {
    const commands = {
        'help': [
            '<span class="terminal-text text-info">Available commands:</span>',
            '<span class="terminal-text">  help          - Show this help message</span>',
            '<span class="terminal-text">  status        - Show system status</span>',
            '<span class="terminal-text">  accounts      - List all accounts</span>',
            '<span class="terminal-text">  workflows     - List active workflows</span>',
            '<span class="terminal-text">  plugins       - List installed plugins</span>',
            '<span class="terminal-text">  clear         - Clear terminal</span>',
            '<span class="terminal-text">  version       - Show version info</span>',
            '<span class="terminal-text">  uptime        - Show system uptime</span>'
        ],
        'status': [
            '<span class="terminal-text text-info">System Status:</span>',
            '<span class="terminal-text">├── CPU: <span class="text-success">34%</span></span>',
            '<span class="terminal-text">├── Memory: <span class="text-warning">67%</span></span>',
            '<span class="terminal-text">├── Disk: <span class="text-success">45%</span></span>',
            '<span class="terminal-text">├── Network: <span class="text-success">Active</span></span>',
            '<span class="terminal-text">└── Status: <span class="text-success">Healthy</span></span>'
        ],
        'accounts': [
            '<span class="terminal-text text-info">Connected Accounts (12):</span>',
            '<span class="terminal-text">  [<span class="text-success">●</span>] Telegram - ربات فروشگاه</span>',
            '<span class="terminal-text">  [<span class="text-success">●</span>] Telegram - پشتیبانی ۲۴/۷</span>',
            '<span class="terminal-text">  [<span class="text-success">●</span>] WhatsApp - واتساپ کسب‌وکار</span>',
            '<span class="terminal-text">  [<span class="text-warning">●</span>] Instagram - صفحه رسمی برند</span>',
            '<span class="terminal-text">  [<span class="text-success">●</span>] Discord - سرور کامیونیتی</span>',
            '<span class="terminal-text">  [<span class="text-muted">●</span>] Twitter - حساب توییتر</span>'
        ],
        'workflows': [
            '<span class="terminal-text text-info">Active Workflows (23):</span>',
            '<span class="terminal-text">  [<span class="text-success">▶</span>] پاسخگوی هوشمند تلگرام</span>',
            '<span class="terminal-text">  [<span class="text-success">▶</span>] زمان‌بندی پست اینستاگرام</span>',
            '<span class="terminal-text">  [<span class="text-success">▶</span>] فشرده‌ساز فایل تلگرام</span>',
            '<span class="terminal-text">  [<span class="text-success">▶</span>] گزارش‌دهی روزانه</span>',
            '<span class="terminal-text">  [<span class="text-muted">❚❚</span>] همگام‌سازی CRM</span>'
        ],
        'plugins': [
            '<span class="terminal-text text-info">Installed Plugins (47):</span>',
            '<span class="terminal-text">  ✓ پاسخگوی AI (8.2K uses)</span>',
            '<span class="terminal-text">  ✓ تاریخ شمسی (5.4K uses)</span>',
            '<span class="terminal-text">  ✓ فشرده‌ساز فایل (2.1K uses)</span>',
            '<span class="terminal-text">  ✓ مترجم (1.8K uses)</span>',
            '<span class="terminal-text">  ... and 43 more</span>'
        ],
        'clear': 'CLEAR',
        'version': '<span class="terminal-text">Command Center v2.4.1 (Build 20240315)</span>',
        'uptime': '<span class="terminal-text">System uptime: 45 days, 12 hours, 34 minutes</span>',
        'whoami': '<span class="terminal-text">admin@command-center (Administrator)</span>',
        'date': `<span class="terminal-text">${new Date().toLocaleString('fa-IR')}</span>`
    };
    
    if (command === 'clear') {
        clearTerminal();
        return [];
    }
    
    return commands[command] || `<span class="terminal-text text-danger">Command not found: ${command}. Type 'help' for available commands.</span>`;
}

function addTerminalLine(html) {
    const terminalOutput = document.getElementById('terminalOutput');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = html;
    terminalOutput.appendChild(line);
}

function clearTerminal() {
    const terminalOutput = document.getElementById('terminalOutput');
    if (terminalOutput) {
        terminalOutput.innerHTML = '';
        addTerminalLine(`<span class="terminal-prompt">system@command-center:~$</span> <span class="terminal-cursor">█</span>`);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================== //
// COMMAND PALETTE
// ============================================== //

function initCommandPalette() {
    const commandPalette = document.getElementById('commandPalette');
    const commandSearch = document.getElementById('commandSearch');
    const commandItems = document.querySelectorAll('.command-item');
    
    if (!commandPalette) return;
    
    // Command item clicks
    commandItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = bootstrap.Modal.getInstance(commandPalette);
            if (modal) modal.hide();
            
            // Execute command
            const commandText = this.querySelector('span').textContent;
            showToast('info', `در حال اجرای "${commandText}"...`);
        });
    });
    
    // Focus search on open
    commandPalette.addEventListener('shown.bs.modal', function() {
        if (commandSearch) {
            commandSearch.focus();
            commandSearch.value = '';
            filterCommands('');
        }
    });
}

function openCommandPalette() {
    const commandPalette = document.getElementById('commandPalette');
    if (commandPalette) {
        const modal = new bootstrap.Modal(commandPalette);
        modal.show();
    }
}

// ============================================== //
// CONTEXT MENU
// ============================================== //

function initContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    if (!contextMenu) return;
    
    // Show context menu on right-click on cards
    const cards = document.querySelectorAll('.dashboard-card, .account-item, .workflow-item');
    
    cards.forEach(card => {
        card.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showContextMenu(e.pageX, e.pageY);
        });
    });
    
    // Hide context menu on click
    document.addEventListener('click', function() {
        contextMenu.classList.remove('show');
    });
    
    // Context menu item clicks
    const menuItems = contextMenu.querySelectorAll('.context-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.querySelector('span').textContent;
            showToast('info', `${action} انتخاب شد`);
            contextMenu.classList.remove('show');
        });
    });
}

function showContextMenu(x, y) {
    const contextMenu = document.getElementById('contextMenu');
    if (!contextMenu) return;
    
    // Adjust position if menu would go off screen
    const menuWidth = 180;
    const menuHeight = 280;
    
    if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 10;
    }
    
    if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 10;
    }
    
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    contextMenu.classList.add('show');
}

// ============================================== //
// FULLSCREEN
// ============================================== //

function initFullscreen() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', toggleFullscreen);
    }
    
    // Update icon on fullscreen change
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            showToast('error', 'امکان ورود به حالت تمام‌صفحه وجود ندارد');
        });
    } else {
        document.exitFullscreen();
    }
}

function updateFullscreenIcon() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');
    if (!fullscreenToggle) return;
    
    if (document.fullscreenElement) {
        fullscreenToggle.innerHTML = '<i class="bi bi-fullscreen-exit"></i>';
    } else {
        fullscreenToggle.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
    }
}

// ============================================== //
// KEYBOARD SHORTCUTS
// ============================================== //

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K - Open command palette
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
        
        // Ctrl/Cmd + B - Toggle sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            toggleSidebar();
        }
        
        // Ctrl/Cmd + / - Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const globalSearch = document.getElementById('globalSearch');
            if (globalSearch) globalSearch.focus();
        }
        
        // Escape - Close modals, context menu
        if (e.key === 'Escape') {
            const contextMenu = document.getElementById('contextMenu');
            if (contextMenu) contextMenu.classList.remove('show');
        }
        
        // F11 - Fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
    });
}

// ============================================== //
// MODALS
// ============================================== //

function initModals() {
    // Quick add button
    const quickAddBtns = document.querySelectorAll('.btn-action');
    quickAddBtns.forEach((btn, index) => {
        if (index === 0) { // First button (plus icon)
            btn.addEventListener('click', function() {
                const quickAddModal = document.getElementById('quickAddModal');
                if (quickAddModal) {
                    const modal = new bootstrap.Modal(quickAddModal);
                    modal.show();
                }
            });
        }
        
        if (index === 1) { // Sync button
            btn.addEventListener('click', function() {
                this.querySelector('i').classList.add('spin');
                showToast('info', 'در حال همگام‌سازی...');
                
                setTimeout(() => {
                    this.querySelector('i').classList.remove('spin');
                    showToast('success', 'همگام‌سازی با موفقیت انجام شد');
                }, 2000);
            });
        }
        
        if (index === 2) { // Terminal button
            btn.addEventListener('click', function() {
                const terminalModal = document.getElementById('terminalModal');
                if (terminalModal) {
                    const modal = new bootstrap.Modal(terminalModal);
                    modal.show();
                }
            });
        }
    });
    
    // Platform selector in add account modal
    const platformOptions = document.querySelectorAll('.platform-option input');
    platformOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateAccountForm(this.value);
        });
    });
    
    // Refresh APIs button
    const refreshApisBtn = document.getElementById('refreshApis');
    if (refreshApisBtn) {
        refreshApisBtn.addEventListener('click', function() {
            this.querySelector('i').classList.add('spin');
            
            setTimeout(() => {
                this.querySelector('i').classList.remove('spin');
                showToast('success', 'وضعیت API‌ها بروزرسانی شد');
            }, 1500);
        });
    }
}

function updateAccountForm(platform) {
    // Update form fields based on selected platform
    console.log('Platform selected:', platform);
}

// ============================================== //
// SETTINGS
// ============================================== //

function initSettings() {
    const compactSidebar = document.getElementById('compactSidebar');
    const enableAnimations = document.getElementById('enableAnimations');
    
    if (compactSidebar) {
        compactSidebar.checked = App.sidebarCollapsed;
        compactSidebar.addEventListener('change', function() {
            if (this.checked) {
                App.sidebar.classList.add('collapsed');
            } else {
                App.sidebar.classList.remove('collapsed');
            }
            localStorage.setItem('sidebarCollapsed', this.checked);
        });
    }
    
    if (enableAnimations) {
        const animationsEnabled = localStorage.getItem('animations') !== 'false';
        enableAnimations.checked = animationsEnabled;
        
        enableAnimations.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.remove('no-animations');
            } else {
                document.body.classList.add('no-animations');
            }
            localStorage.setItem('animations', this.checked);
        });
        
        if (!animationsEnabled) {
            document.body.classList.add('no-animations');
        }
    }
}

// ============================================== //
// ACTIVITY UPDATES
// ============================================== //

function initActivityUpdates() {
    // Simulate live updates
    setInterval(function() {
        updateRandomStats();
    }, 30000);
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const itemName = this.closest('.workflow-item, .plugin-card')?.querySelector('.workflow-name, .plugin-name')?.textContent;
            if (itemName) {
                if (this.checked) {
                    showToast('success', `${itemName} فعال شد`);
                } else {
                    showToast('info', `${itemName} غیرفعال شد`);
                }
            }
        });
    });
}

function updateRandomStats() {
    // This would normally fetch from server
    // For demo, just update queue count
    const queueCount = document.querySelector('.queue-count');
    if (queueCount) {
        const newCount = Math.floor(Math.random() * 50) + 20;
        queueCount.textContent = `${newCount} تسک`;
    }
}

// ============================================== //
// TOAST NOTIFICATIONS
// ============================================== //

function showToast(type, message, duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
    };
    
    const colors = {
        success: 'var(--accent-success)',
        error: 'var(--accent-danger)',
        warning: 'var(--accent-warning)',
        info: 'var(--accent-info)'
    };
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-icon" style="color: ${colors[type]}">
            <i class="bi ${icons[type]}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="bi bi-x"></i>
        </button>
        <div class="toast-progress" style="background: ${colors[type]}"></div>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('toastStyles')) {
        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            .toast-notification {
                position: relative;
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 16px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-primary);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                margin-top: 8px;
                min-width: 300px;
                animation: toastSlideIn 0.3s ease;
                overflow: hidden;
            }
            
            .toast-notification.hiding {
                animation: toastSlideOut 0.3s ease forwards;
            }
            
            @keyframes toastSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes toastSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .toast-icon {
                font-size: 1.25rem;
            }
            
            .toast-message {
                flex: 1;
                font-size: 0.875rem;
                color: var(--text-primary);
            }
            
            .toast-close {
                padding: 4px;
                color: var(--text-muted);
                transition: color 0.15s;
            }
            
            .toast-close:hover {
                color: var(--text-primary);
            }
            
            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                animation: toastProgress ${duration}ms linear forwards;
            }
            
            @keyframes toastProgress {
                from { width: 100%; }
                to { width: 0%; }
            }
            
            .spin {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .no-animations * {
                animation: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(toast);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
        hideToast(toast);
    });
    
    // Auto hide
    setTimeout(function() {
        hideToast(toast);
    }, duration);
}

function hideToast(toast) {
    toast.classList.add('hiding');
    setTimeout(function() {
        toast.remove();
    }, 300);
}

// ============================================== //
// UTILITY FUNCTIONS
// ============================================== //

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function formatDate(date) {
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatTime(date) {
    return new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('success', 'کپی شد!');
    }).catch(() => {
        showToast('error', 'خطا در کپی کردن');
    });
}

// ============================================== //
// API SIMULATION
// ============================================== //

const API = {
    get: function(endpoint) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, data: {} });
            }, 500);
        });
    },
    
    post: function(endpoint, data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'عملیات با موفقیت انجام شد' });
            }, 500);
        });
    }
};

// ============================================== //
// EXPORT FOR GLOBAL ACCESS
// ============================================== //

window.CommandCenter = {
    showToast,
    openCommandPalette,
    toggleSidebar,
    toggleFullscreen,
    copyToClipboard,
    API
};