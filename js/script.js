document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Update URL
                if (targetId !== '#') {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // FAQ Accordion
    const initFAQAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    };

    // Animated Stats Counter
    const initStatsCounter = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            document.querySelector('.stats').forEach(statSection => {
                observer.observe(statSection);
            });
        }
        
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const suffix = stat.textContent.includes('%') ? '%' : '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCount = () => {
                    count += increment;
                    
                    if (count < target) {
                        stat.textContent = suffix === '%' 
                            ? Math.round(count) + suffix 
                            : Math.round(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = suffix === '%' 
                            ? target + suffix 
                            : target.toLocaleString();
                    }
                };
                
                updateCount();
            });
        }
    };

    // Particle Effect
    const initParticles = () => {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            const particleCount = window.innerWidth < 768 ? 15 : 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
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
                
                particlesContainer.appendChild(particle);
            }
        }
    };

    // Initialize all components
    initTestimonialCarousel();
    initFAQAccordion();
    initStatsCounter();
    initParticles();
});
