// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initScooterParts();
    initReviewsSlider();
    initContactForm();
    initDisclaimerModal();
    initScrollAnimations();
    initStatsCounter();
    
    console.log('S-A-E-E-V Website initialized successfully');
});

// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
        
        // Trigger animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        icon.className = 'fas fa-sun';
    }
    
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        icon.className = 'fas fa-moon';
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Scooter Parts Interaction
function initScooterParts() {
    const parts = document.querySelectorAll('.scooter-part');
    const partItems = document.querySelectorAll('.part-item');
    
    // Highlight part on hover
    parts.forEach(part => {
        part.addEventListener('mouseenter', () => {
            const partId = part.dataset.part;
            highlightPart(partId);
        });
        
        part.addEventListener('click', () => {
            const partId = part.dataset.part;
            highlightPart(partId);
        });
    });
    
    // Highlight part when clicking on list item
    partItems.forEach(item => {
        item.addEventListener('click', () => {
            const partId = item.dataset.part;
            highlightPart(partId);
            
            // Update active state
            partItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    function highlightPart(partId) {
        // Remove all active states
        parts.forEach(p => p.classList.remove('active'));
        partItems.forEach(i => i.classList.remove('active'));
        
        // Add active state to selected part
        const targetPart = document.querySelector(`.scooter-part[data-part="${partId}"]`);
        const targetItem = document.querySelector(`.part-item[data-part="${partId}"]`);
        
        if (targetPart) {
            targetPart.classList.add('active');
            
            // Animate the dot
            const dot = targetPart.querySelector('.part-dot');
            dot.style.transform = 'scale(1.5)';
            setTimeout(() => {
                if (targetPart.classList.contains('active')) {
                    dot.style.transform = 'scale(1.2)';
                }
            }, 300);
        }
        
        if (targetItem) {
            targetItem.classList.add('active');
        }
    }
}

// Reviews Slider
function initReviewsSlider() {
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--accent-color)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Disclaimer Modal
function initDisclaimerModal() {
    const disclaimerBtn = document.getElementById('disclaimerBtn');
    const footerDisclaimer = document.getElementById('footerDisclaimer');
    const modal = document.getElementById('disclaimerModal');
    const closeBtn = document.querySelector('.modal-close');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    disclaimerBtn.addEventListener('click', openModal);
    footerDisclaimer.addEventListener('click', openModal);
    
    closeBtn.addEventListener('click', closeModal);
    
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

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.section-title, .section-subtitle, .part-item, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.dataset.count);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = currentScroll > 100 ? 'var(--shadow-lg)' : 'var(--shadow-sm)';
    }
    
    lastScroll = currentScroll;
});