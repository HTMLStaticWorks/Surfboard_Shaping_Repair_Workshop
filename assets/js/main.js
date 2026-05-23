document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    const toggleMenu = () => {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    };

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    
    const toggleTheme = () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons();
    };

    const updateIcons = () => {
        const isDark = body.classList.contains('dark-mode');
        const icons = document.querySelectorAll('.theme-icon');
        icons.forEach(icon => {
            icon.className = isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
        });
    };

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        updateIcons();
    }

    // --- RTL Toggle ---
    const rtlBtn = document.getElementById('rtl-toggle');
    const mobileRtlBtn = document.getElementById('mobile-rtl-toggle');

    const toggleRTL = () => {
        const currentDir = document.documentElement.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    };

    if (rtlBtn) rtlBtn.addEventListener('click', toggleRTL);
    if (mobileRtlBtn) mobileRtlBtn.addEventListener('click', toggleRTL);

    // Load saved direction
    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    // --- Animations on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Once visible, stop observing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and individual fade-in elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .hero, .hero2');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Fallback: If elements aren't visible after 2 seconds, force them (prevents "empty" look if JS fails)
    setTimeout(() => {
        animatedElements.forEach(el => {
            el.classList.add('fade-in-visible');
        });
    }, 2000);

    // --- Service Calculator ---
    const calcForm = document.getElementById('price-calc');
    if (calcForm) {
        const updatePrice = () => {
            const boardEl = document.getElementById('board-type');
            const repairEl = document.getElementById('repair-type');
            const extraEl = document.getElementById('extra');
            const resultEl = document.getElementById('calc-result');
            
            if (!boardEl || !repairEl || !resultEl) return;
            
            const board = boardEl.value;
            const repair = repairEl.value;
            const extra = extraEl ? extraEl.value : '';
            
            let price = 0;
            if (board === 'shortboard') price += 30;
            if (board === 'longboard') price += 50;
            if (board === 'fish') price += 35;
            if (board === 'gun') price += 70;
            
            if (repair === 'ding') price += 45;
            if (repair === 'fin') price += 80;
            if (repair === 'glassing') price += 200;
            if (repair === 'custom') price += 600;
            
            if (extra === 'tint') price += 60;
            if (extra === 'logo') price += 40;
            if (extra === 'rush') price += 80;
            
            resultEl.textContent = `$${price}`;
        };
        calcForm.addEventListener('change', updatePrice);
        updatePrice(); // Run once initially
    }

    // --- Back to Top Dynamic Implementation ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('title', 'Back to Top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

