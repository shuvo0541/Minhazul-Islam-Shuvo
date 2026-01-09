/**
 * Minhazul Islam Shuvo - Personal Portfolio
 * Modern, animated portfolio website with smooth interactions
 */

// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-menu a');
const backToTopBtn = document.getElementById('backToTop');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('.section');
const currentYearElement = document.getElementById('currentYear');

/**
 * Initialize the portfolio
 */
function initPortfolio() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize event listeners
    setupEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Animate skill bars on load if they're in view
    setTimeout(animateSkillBars, 500);
    
    // Add load animation to hero elements
    animateHeroElements();
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // CV download validation
    setupCVDownload();
}

/**
 * Handle scroll events
 */
function handleScroll() {
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Animate skill bars when in view
    animateSkillBars();
    
    // Animate sections when in view
    animateSectionsOnScroll();
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Scroll to top smoothly
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Add intersection observer for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Animate sections when they come into view
 */
function animateSectionsOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.classList.add('visible');
        }
    });
}

/**
 * Animate skill bars when they come into view
 */
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
            
            // Animate the percentage number
            const percentElement = bar.parentElement.previousElementSibling?.querySelector('.skill-percent');
            if (percentElement) {
                animateCounter(percentElement, 0, parseInt(level), 1500);
            }
        }
    });
}

/**
 * Animate counter from start to end
 */
function animateCounter(element, start, end, duration) {
    if (element.hasAttribute('data-animated')) return;
    
    element.setAttribute('data-animated', 'true');
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Animate hero elements on page load
 */
function animateHeroElements() {
    // Hero elements will animate via CSS with delays
    // Additional JavaScript animations can be added here if needed
}

/**
 * Setup CV download with validation
 */
function setupCVDownload() {
    const downloadLinks = document.querySelectorAll('a[download]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add download tracking or validation
            console.log('CV download initiated');
            // The download will proceed normally
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Calculate offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Preload profile image for better UX
 */
function preloadProfileImage() {
    const imageUrl = 'https://media.licdn.com/dms/image/v2/D4D03AQEh6FuRysl-jA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715332296599';
    
    // Create a new image object to preload
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = function() {
        console.log('Profile image loaded successfully');
        // Add loaded class to images for fade-in effect
        document.querySelectorAll('.profile-img, .about-profile-img').forEach(img => {
            img.style.opacity = '1';
        });
    };
    
    img.onerror = function() {
        console.warn('Failed to load profile image');
    };
}

/**
 * Initialize when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
    setupSmoothScrolling();
    preloadProfileImage();
    
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/**
 * Handle window resize
 */
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screens
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});