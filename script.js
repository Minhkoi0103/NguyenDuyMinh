// Global variables
let isMenuOpen = false;
let typingAnimation = null;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Initialize typing animation
    startTypingAnimation();

    // Initialize scroll effects
    initializeScrollEffects();

    // Initialize navigation
    initializeNavigation();

    // Initialize skill bars animation
    initializeSkillBars();

    // Initialize intersection observer for animations
    initializeIntersectionObserver();

    // Initialize form submission
    initializeFormSubmission();
}

// Typing Animation
function startTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.getElementById('cursor');
    const text = 'Nguyễn Duy Minh';
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            typedTextElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 150);
        } else {
            // Start blinking cursor
            cursorElement.style.animation = 'blink 0.75s step-end infinite';
        }
    }

    // Start typing after hero section animation
    setTimeout(typeCharacter, 2000);
}

// Navigation
function initializeNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMenu);

    // Navigation links smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.substring(1));
            closeMenu();
        });
    });

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    }

    // Check if skills section is visible
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Intersection Observer for scroll animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sectionsToObserve = document.querySelectorAll('section[id]');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });
}

// Form submission
function initializeFormSubmission() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showToast('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Lỗi', 'Vui lòng nhập địa chỉ email hợp lệ.', 'error');
            return;
        }

        // Simulate form submission
        showToast('Thành công!', 'Tin nhắn của bạn đã được gửi. Tôi sẽ phản hồi sớm nhất có thể.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Toast notification
function showToast(title, message, type = 'success') {
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon i');

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Update icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#10b981';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#ef4444';
    }

    // Show toast
    toast.classList.add('show');

    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// CV download function
function downloadCV() {
    showToast('Tải CV', 'CV sẽ được tải xuống trong giây lát...', 'success');
    
    // In a real application, you would trigger the actual download here
    // For demo purposes, we just show the toast
    console.log('CV download triggered');
}

// Smooth scrolling for portfolio and other buttons
document.addEventListener('click', function(e) {
    // Portfolio button in hero section
    if (e.target.closest('[onclick*="scrollToSection"]')) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
        scrollToSection(sectionId);
    }
});

// Add scroll reveal animations to elements
function addScrollRevealAnimations() {
    const elements = document.querySelectorAll(`
        .section-header h2,
        .section-header p,
        .about-image,
        .about-content,
        .stat-card,
        .hobby-card,
        .skills-category,
        .skill-item,
        .timeline-item,
        .education-card,
        .portfolio-card,
        .contact-info,
        .contact-form
    `);

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection observer for scroll reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Initialize scroll reveal animations after DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollRevealAnimations);

// Parallax effect for floating elements
function initializeParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize parallax effects
document.addEventListener('DOMContentLoaded', initializeParallaxEffects);

// Portfolio and hobby card hover effects
function initializeCardHovers() {
    const cards = document.querySelectorAll('.portfolio-card, .hobby-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize card hover effects
document.addEventListener('DOMContentLoaded', initializeCardHovers);

// Add loading animation for images
function initializeImageLoading() {
    const imageElements = document.querySelectorAll('.about-image, .portfolio-image');
    
    imageElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        element.style.transition = 'all 0.6s ease';
        
        // Simulate image loading
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, Math.random() * 1000 + 500);
    });
}

// Initialize image loading effects
document.addEventListener('DOMContentLoaded', initializeImageLoading);

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
    }
    
    // Adjust skill bar animations on resize
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
});

// Add custom cursor effect for interactive elements
function initializeCustomCursor() {
    const interactiveElements = document.querySelectorAll(`
        .btn,
        .nav-link,
        .social-link,
        .portfolio-card,
        .education-card,
        .scroll-to-top
    `);
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Initialize custom cursor effects
document.addEventListener('DOMContentLoaded', initializeCustomCursor);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Accessibility improvements
function initializeAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
        
        // Enter key activates buttons
        if (e.key === 'Enter' && e.target.matches('.btn, .nav-link')) {
            e.target.click();
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll(`
        .btn,
        .nav-link,
        input,
        textarea,
        .social-link
    `);
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3f5efb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Preload animations for better performance
function preloadAnimations() {
    // Create invisible elements to trigger CSS loading
    const preloadDiv = document.createElement('div');
    preloadDiv.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        width: 1px;
        height: 1px;
        opacity: 0;
    `;
    
    const animationClasses = [
        'fadeIn',
        'fadeInUp',
        'fadeInLeft',
        'fadeInRight',
        'scaleIn',
        'float',
        'pulse',
        'bounce'
    ];
    
    animationClasses.forEach(className => {
        const element = document.createElement('div');
        element.className = className;
        preloadDiv.appendChild(element);
    });
    
    document.body.appendChild(preloadDiv);
    
    // Remove preload elements after a short delay
    setTimeout(() => {
        document.body.removeChild(preloadDiv);
    }, 100);
}

// Initialize animation preloading
document.addEventListener('DOMContentLoaded', preloadAnimations);