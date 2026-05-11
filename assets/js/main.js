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
        calcForm.addEventListener('change', () => {
            const boardType = document.getElementById('board-type').value;
            const repairType = document.getElementById('repair-type').value;
            const result = document.getElementById('calc-result');
            
            let price = 0;
            if (boardType === 'shortboard') price += 50;
            if (boardType === 'longboard') price += 80;
            if (repairType === 'ding') price += 40;
            if (repairType === 'fin') price += 60;
            if (repairType === 'glassing') price += 200;

            result.textContent = `$${price}`;
        });
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

