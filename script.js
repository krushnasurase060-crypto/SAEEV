// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initScooterParts();
    initPartsEditor();
    initReviewsSlider();
    initContactForm();
    initDisclaimerModal();
    initScrollAnimations();
    initStatsCounter();
    
    console.log('Vajrablaze Website initialized successfully');
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

// Parts Editor: make scooter part dots draggable and persist positions
function initPartsEditor() {
    const editBtn = document.getElementById('editPartsBtn');
    const exportBtn = document.getElementById('exportPartsBtn');
    const parts = document.querySelectorAll('.scooter-part');
    const container = document.querySelector('.scooter-main');
    if (!editBtn || !exportBtn || !container) return;

    let editing = false;
    let dragging = null;

    // Load saved positions
    const saved = localStorage.getItem('scooterPartPositions');
    if (saved) {
        try {
            const positions = JSON.parse(saved);
            parts.forEach(p => {
                const id = p.dataset.part;
                if (positions[id]) {
                    p.style.left = positions[id].left;
                    p.style.top = positions[id].top;
                }
            });
        } catch (e) {
            console.warn('Failed to parse saved positions', e);
        }
    }

    editBtn.addEventListener('click', () => {
        editing = !editing;
        editBtn.textContent = editing ? 'Exit Edit' : 'Edit Points';
        parts.forEach(p => p.classList.toggle('editing', editing));
    });

    exportBtn.addEventListener('click', () => {
        const cssLines = [];
        parts.forEach(p => {
            const cls = Array.from(p.classList).find(c => c !== 'scooter-part' && c !== 'editing') || p.dataset.part;
            const left = p.style.left || getComputedStyle(p).left;
            const top = p.style.top || getComputedStyle(p).top;
            cssLines.push(`.${cls} { top: ${top}; left: ${left}; }`);
        });
        const output = cssLines.join('\n');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(output).then(() => {
                alert('CSS exported to clipboard');
            }).catch(() => {
                window.prompt('Copy CSS below', output);
            });
        } else {
            window.prompt('Copy CSS below', output);
        }
    });

    // Make parts draggable when in editing mode
    parts.forEach(part => {
        part.style.touchAction = 'none';

        part.addEventListener('pointerdown', (e) => {
            if (!editing) return;
            dragging = { el: part };
            part.setPointerCapture(e.pointerId);
        });

        part.addEventListener('pointermove', (e) => {
            if (!dragging || dragging.el !== part) return;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const leftPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
            const topPct = Math.max(0, Math.min(100, (y / rect.height) * 100));

            part.style.left = leftPct.toFixed(2) + '%';
            part.style.top = topPct.toFixed(2) + '%';
        });

        part.addEventListener('pointerup', (e) => {
            if (!dragging || dragging.el !== part) return;
            dragging = null;
            savePositions();
        });

        part.addEventListener('pointercancel', () => {
            dragging = null;
        });
    });

    function savePositions() {
        const obj = {};
        parts.forEach(p => {
            const id = p.dataset.part || Array.from(p.classList)[1];
            obj[id] = { left: p.style.left || getComputedStyle(p).left, top: p.style.top || getComputedStyle(p).top };
        });
        localStorage.setItem('scooterPartPositions', JSON.stringify(obj));
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

        // Gather form values
        const name = document.getElementById('name').value || '';
        const email = document.getElementById('email').value || '';
        const subjectVal = document.getElementById('subject').value || 'Website Contact';
        const message = document.getElementById('message').value || '';

        // Build mailto URL to open user's mail client
        const to = 'krushnasurase060@gmail.com';
        const subject = encodeURIComponent(subjectVal);
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            message
        );

        const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

        // Attempt to open the user's mail client. This depends on user's environment.
        window.location.href = mailto;

        // Optionally show a quick UI feedback (will still open mail client)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Opening Mail Client';
        submitBtn.style.background = 'var(--accent-color)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2500);
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
