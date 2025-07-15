// نمایش صفحه منو پس از کلیک روی دکمه ورود
document.getElementById('enter-btn').addEventListener('click', function() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('menu-content').style.display = 'block';
    document.getElementById('categories-bar').style.display = 'block';
    document.body.style.paddingTop = '85px';
    
    // انیمیشن برای آیتم‌های منو
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
        }, 100 * index);
    });
});

// اسکرول به بخش مورد نظر با کلیک روی دسته‌بندی
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function() {
        // حذف کلاس active از همه دسته‌بندی‌ها
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        // اضافه کردن کلاس active به دسته‌بندی انتخاب شده
        this.classList.add('active');
        
        // اسکرول به بخش مورد نظر
        const targetId = this.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 85,
                behavior: 'smooth'
            });
        }
    });
});

// تغییر استایل دسته‌بندی فعال هنگام اسکرول
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.menu-section');
    const categories = document.querySelectorAll('.category');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = '#' + section.id;
        }
    });
    
    categories.forEach(category => {
        category.classList.remove('active');
        if (category.getAttribute('data-target') === currentSectionId) {
            category.classList.add('active');
        }
    });
});

// نمایش صفحه ولکام به صورت پیش‌فرض
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('welcome-page').style.display = 'flex';
    document.getElementById('menu-content').style.display = 'none';
    document.getElementById('categories-bar').style.display = 'none';
    document.body.style.paddingTop = '0';
    
    // افزودن انیمیشن به آیتم‌های منو
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.opacity = '0';
    });
});

// تغییر استایل نوار دسته‌بندی هنگام اسکرول
window.addEventListener('scroll', function() {
    const categoriesBar = document.getElementById('categories-bar');
    if (window.scrollY > 50) {
        categoriesBar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
        categoriesBar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// فعال کردن توکستر بوت استرپ برای نمایش پیام‌ها
const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');

if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    });
}