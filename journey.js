// Journey Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Journey Page specific animations
    initJourneyHeroAnimation();
    initBeginningCardsAnimation();
    initTimelineAnimation();
    initChallengesAnimation();
    initGrowthStagesAnimation();
    initMilestonesAnimation();
    initFutureSectionAnimation();
    
    // Initialize Journey Page specific modal
    initJourneyDisclaimerModal();
    
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize journey-specific interactions
    initJourneyInteractions();
    
    console.log('Journey page initialized successfully');
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'journey.html' && linkPage.includes('journey'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize Journey Hero Animation
function initJourneyHeroAnimation() {
    const heroTitle = document.querySelector('.journey-hero-title');
    const heroSubtitle = document.querySelector('.journey-hero-subtitle');
    const journeyStats = document.querySelectorAll('.journey-stat');
    
    // Entrance animations
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);
    }
    
    // Stats animation
    journeyStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px) scale(0.9)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 200));
    });
    
    // Counter animation for stats
    initJourneyStatsCounter();
}

// Counter animation for journey stats
function initJourneyStatsCounter() {
    const statNumbers = document.querySelectorAll('.journey-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const text = statNumber.textContent;
                
                if (text === '0' || text === '100%' || text === '1') {
                    // For simple numbers, just reveal
                    statNumber.style.opacity = '1';
                    statNumber.style.transform = 'scale(1)';
                } else {
                    // For future use with dynamic numbers
                    statNumber.style.opacity = '1';
                    statNumber.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        statNumber.style.transform = 'scale(1)';
                    }, 300);
                }
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize Beginning Cards Animation
function initBeginningCardsAnimation() {
    const beginningCards = document.querySelectorAll('.beginning-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add icon animation
                    const icon = entry.target.querySelector('.beginning-icon i');
                    if (icon) {
                        icon.style.transform = 'rotate(360deg)';
                        setTimeout(() => {
                            icon.style.transform = 'rotate(0)';
                        }, 600);
                    }
                }, index * 200);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    beginningCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
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
                    
                    // Add month badge animation
                    const monthBadge = entry.target.querySelector('.timeline-month');
                    if (monthBadge) {
                        monthBadge.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            monthBadge.style.transform = 'scale(1)';
                        }, 300);
                    }
                    
                    // Animate list items sequentially
                    const listItems = entry.target.querySelectorAll('.timeline-list li');
                    listItems.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, i * 100);
                    });
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
            item.style.transform = 'translateX(-100px)';
        } else {
            item.style.transform = 'translateX(100px)';
        }
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Set initial state for list items
        const listItems = item.querySelectorAll('.timeline-list li');
        listItems.forEach(li => {
            li.style.opacity = '0';
            li.style.transform = 'translateX(20px)';
            li.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        observer.observe(item);
    });
}

// Initialize Challenges Animation
function initChallengesAnimation() {
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Add challenge number animation
                    const challengeNumber = entry.target.querySelector('.challenge-number');
                    if (challengeNumber) {
                        challengeNumber.style.transform = 'scale(1.5) rotate(10deg)';
                        setTimeout(() => {
                            challengeNumber.style.transform = 'scale(1) rotate(0)';
                        }, 300);
                    }
                }, index * 150);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    challengeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Initialize Growth Stages Animation
function initGrowthStagesAnimation() {
    const stages = document.querySelectorAll('.stage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add icon animation
                    const icon = entry.target.querySelector('.stage-icon i');
                    if (icon) {
                        icon.style.transform = 'rotate(360deg)';
                        setTimeout(() => {
                            icon.style.transform = 'rotate(0)';
                        }, 600);
                    }
                    
                    // Animate skill tags
                    const skillTags = entry.target.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, i) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                }, index * 300);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    stages.forEach((stage, index) => {
        stage.style.opacity = '0';
        stage.style.transform = 'translateY(50px)';
        stage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Set initial state for skill tags
        const skillTags = stage.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease, background 0.3s ease, color 0.3s ease';
        });
        
        observer.observe(stage);
    });
}

// Initialize Milestones Animation
function initMilestonesAnimation() {
    const milestones = document.querySelectorAll('.milestone');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add dot animation
                    const dot = entry.target.querySelector('.milestone-dot');
                    if (dot) {
                        dot.style.transform = 'scale(1.5)';
                        setTimeout(() => {
                            dot.style.transform = 'scale(1)';
                        }, 300);
                    }
                }, index * 200);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    milestones.forEach((milestone, index) => {
        milestone.style.opacity = '0';
        milestone.style.transform = 'translateY(30px)';
        milestone.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(milestone);
    });
}

// Initialize Future Section Animation
function initFutureSectionAnimation() {
    const futureGoals = document.querySelectorAll('.future-goal');
    const pathNodes = document.querySelectorAll('.path-node');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    futureGoals.forEach((goal, index) => {
        goal.style.opacity = '0';
        goal.style.transform = 'translateX(-20px)';
        goal.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(goal);
    });
    
    pathNodes.forEach((node, index) => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.5)';
        node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            observer.observe(node);
        }, index * 100);
    });
}

// Journey Page Specific Disclaimer Modal
function initJourneyDisclaimerModal() {
    const disclaimerBtn = document.getElementById('disclaimerBtn');
    const footerDisclaimer = document.getElementById('journeyDisclaimer');
    const modal = document.getElementById('disclaimerModal');
    
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(50px)';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
            modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 10);
    }
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(50px)';
        
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
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize Journey Specific Interactions
function initJourneyInteractions() {
    // Add hover effects for timeline items
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Add click interactions for milestones
    const milestones = document.querySelectorAll('.milestone');
    
    milestones.forEach(milestone => {
        milestone.addEventListener('click', function() {
            const allMilestones = document.querySelectorAll('.milestone');
            allMilestones.forEach(m => {
                m.classList.remove('active');
            });
            
            this.classList.add('active');
            
            // Animate the dot
            const dot = this.querySelector('.milestone-dot');
            dot.style.transform = 'scale(1.5)';
            setTimeout(() => {
                dot.style.transform = 'scale(1.2)';
            }, 300);
        });
    });
    
    // Add scroll progress indicator
    window.addEventListener('scroll', function() {
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;
        
        const timelineRect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
            const progress = Math.min(1, Math.max(0, 
                (windowHeight - timelineRect.top) / (timelineRect.height + windowHeight)
            ));
            
            document.documentElement.style.setProperty('--timeline-progress', progress);
        }
    });
    
    // Initialize parallax effect for hero section
    initJourneyParallax();
}

// Parallax effect for journey hero
function initJourneyParallax() {
    const heroSection = document.querySelector('.journey-hero');
    if (!heroSection) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        heroSection.style.backgroundPosition = `center ${rate}px`;
        
        // Animate floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add CSS animations for journey page
const journeyStyles = document.createElement('style');
journeyStyles.textContent = `
    /* Journey page animations */
    :root {
        --timeline-progress: 0;
    }
    
    @keyframes journeyFadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes journeySlideInLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes journeySlideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes journeyScaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes journeyPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    /* Timeline progress animation */
    .journey-timeline::before {
        height: calc(var(--timeline-progress) * 100%);
        transition: height 0.3s ease;
    }
    
    /* Milestone active state */
    .milestone.active .milestone-dot {
        animation: journeyPulse 1s ease-in-out infinite;
        background: var(--primary-color);
    }
    
    /* Journey illustration animation */
    .illustration-frame {
        animation-play-state: running;
    }
    
    .journey-hero:hover .illustration-frame {
        animation-play-state: paused;
    }
    
    /* Challenge card hover effects */
    .challenge-card:hover .challenge-icon {
        transform: rotate(360deg);
        transition: transform 0.6s ease;
    }
    
    /* Skill tag hover effect */
    .skill-tag:hover {
        transform: translateY(-3px) scale(1.05);
        transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
    }
    
    /* Future path animation */
    .path-node:hover i {
        transform: scale(1.2) rotate(360deg);
        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
    }
    
    /* CTA button effects */
    .journey-cta .btn {
        position: relative;
        overflow: hidden;
        z-index: 1;
    }
    
    .journey-cta .btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
        z-index: -1;
    }
    
    .journey-cta .btn:hover::before {
        width: 300px;
        height: 300px;
    }
    
    /* Progress bar for timeline */
    .timeline-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, 
            var(--primary-color) 0%, 
            var(--secondary-color) 100%);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.6s ease;
    }
    
    .timeline-content:hover::before {
        transform: scaleX(1);
    }
`;

document.head.appendChild(journeyStyles);

// Initialize smooth scrolling for anchor links
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
