document.addEventListener('DOMContentLoaded', function () {
    // ===== Mobile Menu Toggle =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile nav if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }

                if (targetId !== '#') {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ===== FAQ Accordion =====
    const initFAQAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    faqItems.forEach(other => {
                        if (other !== item) other.classList.remove('active');
                    });
                    item.classList.toggle('active');
                });
            }
        });
    };

    // ===== Stats Counter =====
    const initStatsCounter = () => {
        const statSection = document.querySelector('.stats');
        if (!statSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statSection);

        function animateStats() {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const suffix = stat.textContent.includes('%') ? '%' : '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        stat.textContent = suffix === '%' ?
                            Math.round(count) + suffix :
                            Math.round(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = suffix === '%' ?
                            target + suffix :
                            target.toLocaleString();
                    }
                };
                updateCount();
            });
        }
    };

    // ===== Particle Effect =====
    const initParticles = () => {
        const container = document.getElementById('particles');
        if (!container) return;

        const count = window.innerWidth < 768 ? 15 : 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 10 + 5;
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 20 + 10}s;
                animation-delay: ${Math.random() * 5}s;
                opacity: ${Math.random() * 0.3 + 0.1};
            `;
            container.appendChild(particle);
        }
    };

    // ===== Intersection Observer for Section Animations =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ===== Interactive Phone Screens =====
    const phoneButtons = document.querySelectorAll('.phone-btn');
    const screens = document.querySelectorAll('.screen');
    const phone = document.querySelector('.phone');

    phoneButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            phoneButtons.forEach(btn => btn.classList.remove('active'));
            screens.forEach(screen => {
                screen.classList.remove('active');
                if (screen.getAttribute('data-screen') === target) {
                    screen.classList.add('active');
                }
            });
            this.classList.add('active');

            // Phone bounce effect
            phone.style.transform = 'rotateY(-5deg) rotateX(2deg) scale(1.02)';
            setTimeout(() => {
                phone.style.transform = 'rotateY(-5deg) rotateX(2deg)';
            }, 200);
        });
    });

    // Auto rotate phone screens
    let currentScreen = 1;
    const totalScreens = screens.length;
    setInterval(() => {
        currentScreen = currentScreen % totalScreens + 1;
        document.querySelector(`.phone-btn[data-target="${currentScreen}"]`).click();
    }, 4000);

    // ===== Initialize Everything =====
    initFAQAccordion();
    initStatsCounter();
    initParticles();
});
