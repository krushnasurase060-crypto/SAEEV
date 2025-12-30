// About Page Specific JavaScript - Updated with proper dark mode support

document.addEventListener('DOMContentLoaded', function() {
    // Initialize About Page specific animations only
    initAboutAnimations();
    initTimelineAnimation();
    initTeamCardsAnimation();
    initValueCardsAnimation();
    
    // Initialize About Page specific modal (doesn't conflict with main script)
    initAboutDisclaimerModal();
    
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize image lazy loading
    initImageLazyLoading();
    
    console.log('About Us page initialized successfully');
});

// Set active navigation link (About page specific)
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'about.html' && linkPage.includes('about'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize About Page Animations
function initAboutAnimations() {
    // Animate hero stats on scroll
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Add pulsing animation to year
                    const year = entry.target.querySelector('.timeline-year');
                    if (year) {
                        year.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            year.style.transform = 'scale(1)';
                        }, 300);
                    }
                }, index * 300);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-30px)';
        } else {
            item.style.transform = 'translateX(30px)';
        }
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(item);
    });
}

// Initialize Team Cards Animation
function initTeamCardsAnimation() {
    const teamCards = document.querySelectorAll('.level-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Add icon rotation animation
                    const icon = entry.target.querySelector('.level-icon i');
                    if (icon) {
                        icon.style.transform = 'rotate(360deg)';
                        setTimeout(() => {
                            icon.style.transform = 'rotate(0)';
                        }, 600);
                    }
                }, index * 250);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    teamCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize Value Cards Animation
function initValueCardsAnimation() {
    const valueCards = document.querySelectorAll('.value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(0)';
                    
                    // Add icon animation
                    const icon = entry.target.querySelector('.value-icon i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2) rotate(10deg)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1) rotate(0)';
                        }, 300);
                    }
                }, index * 150);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    valueCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) rotate(5deg)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// About Page Specific Disclaimer Modal (doesn't conflict with main script)
function initAboutDisclaimerModal() {
    const disclaimerBtn = document.getElementById('disclaimerBtn');
    const footerDisclaimer = document.getElementById('aboutDisclaimer');
    const modal = document.getElementById('disclaimerModal');
    
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
            modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 10);
    }
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
    
    if (disclaimerBtn) {
        disclaimerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (footerDisclaimer) {
        footerDisclaimer.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize image lazy loading for about page
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add smooth scrolling for anchor links (About page specific)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects for interactive elements
function initHoverEffects() {
    const interactiveElements = document.querySelectorAll('.level-card, .value-card, .goal-card, .process-step, .feature');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize hover effects when DOM is loaded
document.addEventListener('DOMContentLoaded', initHoverEffects);

// Parallax effect for about hero section
window.addEventListener('scroll', function() {
    const aboutHero = document.querySelector('.about-hero');
    if (!aboutHero) return;
    
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    aboutHero.style.backgroundPosition = `center ${rate}px`;
});

// Add CSS animations for about page
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    /* About page specific animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Hero content animation */
    .about-hero-content {
        animation: fadeInUp 0.8s ease-out;
    }
    
    /* Stat cards animation */
    .stat-card.animate-in {
        animation: scaleIn 0.6s ease forwards;
    }
    
    /* Timeline animations */
    .timeline-item:nth-child(odd) {
        animation: fadeInLeft 0.8s ease forwards;
    }
    
    .timeline-item:nth-child(even) {
        animation: fadeInRight 0.8s ease forwards;
    }
    
    /* Level card icon animation */
    .level-card:hover .level-icon {
        transform: rotate(360deg);
        transition: transform 0.6s ease;
    }
    
    .level-icon i {
        transition: transform 0.3s ease;
    }
    
    /* Value card icon animation */
    .value-card:hover .value-icon {
        transform: scale(1.1);
        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Goal card hover effect */
    .goal-card:hover .goal-icon {
        transform: translateY(-5px) rotate(5deg);
        transition: transform 0.3s ease;
    }
    
    /* Process step hover effect */
    .process-step:hover {
        border-left: 4px solid var(--primary-color);
        transition: border-left 0.3s ease;
    }
    
    /* College image frame effect */
    .image-frame {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
    }
    
    .image-frame::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, 
            rgba(99, 102, 241, 0.1), 
            rgba(16, 185, 129, 0.1));
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .image-frame:hover::after {
        opacity: 1;
    }
    
    /* CTA button effects */
    .about-cta .btn {
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    
    .about-cta .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.6s ease;
        z-index: -1;
    }
    
    .about-cta .btn:hover::before {
        left: 100%;
    }
    
    /* Progress bar for process steps */
    .process-step::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0;
        background: var(--gradient-primary);
        transition: width 0.6s ease;
        z-index: -1;
        border-radius: 12px;
    }
    
    .process-step:hover::before {
        width: 100%;
    }
    
    /* Loading animation for lazy images */
    img[data-src] {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;

document.head.appendChild(aboutStyles);

// Initialize counter animations for stats
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent.replace('+', ''));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current) + (statNumber.textContent.includes('+') ? '+' : '');
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCounterAnimations);