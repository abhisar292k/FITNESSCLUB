// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuTrigger = document.querySelector('.mobile-menu-trigger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu__close');
    const submenuLinks = document.querySelectorAll('.mobile-menu__link[data-submenu]');

    // Toggle mobile menu
    function toggleMobileMenu() {
        menuTrigger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Menu trigger click event
    menuTrigger.addEventListener('click', toggleMobileMenu);

    // Close button click event
    closeButton.addEventListener('click', toggleMobileMenu);

    // Handle submenu toggling
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default only for submenu items
            if (this.hasAttribute('data-submenu')) {
                e.preventDefault();
                
                const submenu = this.nextElementSibling;
                const isActive = submenu.classList.contains('active');
                
                // Close all other submenus
                document.querySelectorAll('.mobile-submenu').forEach(menu => {
                    if (menu !== submenu) {
                        menu.classList.remove('active');
                    }
                });

                // Toggle current submenu
                submenu.classList.toggle('active');
                
                // Rotate chevron
                const chevron = this.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuTrigger.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 968 && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
                // Reset all submenus
                document.querySelectorAll('.mobile-submenu').forEach(menu => {
                    menu.classList.remove('active');
                });
                document.querySelectorAll('.mobile-menu__link .fa-chevron-down').forEach(chevron => {
                    chevron.style.transform = 'rotate(0deg)';
                });
            }
        }, 250);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const navBtns = document.querySelectorAll('.carousel-nav-btn');
    const currentNum = document.querySelector('.current');
    let currentSlide = 0;
    let isAnimating = false;

    function updateSlideNumber() {
        currentNum.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    function changeSlide(index) {
        if (isAnimating || currentSlide === index) return;
        isAnimating = true;

        slides[currentSlide].classList.remove('active');
        navBtns[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        navBtns[currentSlide].classList.add('active');
        updateSlideNumber();

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function nextSlide() {
        changeSlide((currentSlide + 1) % slides.length);
    }

    // Auto advance slides with pause on hover
    let slideInterval = setInterval(nextSlide, 6000);

    document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 6000);
    });

    // Manual navigation
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            changeSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide((currentSlide - 1 + slides.length) % slides.length);
        } else if (e.key === 'ArrowRight') {
            changeSlide((currentSlide + 1) % slides.length);
        }
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left
                changeSlide((currentSlide + 1) % slides.length);
            } else {
                // Swipe right
                changeSlide((currentSlide - 1 + slides.length) % slides.length);
            }
        }
    }

    // Preload images for smooth transitions
    const imageUrls = [
        'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1600',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600',
        'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1600'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card-new');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            challengeCards.forEach(card => {
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = null;

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'cardAppear 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });

    // Hover effects for challenge cards
    challengeCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Spots left counter animation
    const spotsCounters = document.querySelectorAll('.spots-left');
    spotsCounters.forEach(counter => {
        const spots = parseInt(counter.textContent);
        if (spots < 20) {
            counter.style.color = '#ff4444';
            counter.style.fontWeight = '600';
        }
    });

    // Challenge join button effects
    const joinButtons = document.querySelectorAll('.challenge-button-new');
    joinButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector('i');
            icon.style.transform = 'translateX(5px)';
        });

        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector('i');
            icon.style.transform = 'translateX(0)';
        });
    });

    // Intersection Observer for animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    challengeCards.forEach(card => {
        observer.observe(card);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.challenge-stats span');
    stats.forEach(stat => {
        const value = stat.textContent.match(/\d+\.?\d*/)[0];
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);

        function updateCount() {
            start += increment;
            if (start < value) {
                if (value > 100) {
                    stat.textContent = stat.textContent.replace(value, Math.floor(start));
                } else {
                    stat.textContent = stat.textContent.replace(value, start.toFixed(1));
                }
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = stat.textContent.replace(value, value);
            }
        }

        observer.observe(stat);
    });

    // Reels Functionality
    const reelCards = document.querySelectorAll('.reel-card');
    
    reelCards.forEach(card => {
        const video = card.querySelector('.reel-video');
        const playPauseBtn = card.querySelector('.play-pause-btn');
        const muteBtn = card.querySelector('.mute-btn');
        const progressBar = card.querySelector('.progress-bar');
        const durationDisplay = card.querySelector('.duration');

        // Initialize video
        video.muted = true;

        // Play/Pause functionality
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.paused) {
                // Pause all other videos first
                reelCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherVideo = otherCard.querySelector('.reel-video');
                        const otherBtn = otherCard.querySelector('.play-pause-btn');
                        otherVideo.pause();
                        otherBtn.innerHTML = '<i class="fas fa-play"></i>';
                    }
                });
                
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Mute/Unmute functionality
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });

        // Update progress bar
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Update duration display
            const currentTime = formatTime(video.currentTime);
            const totalTime = formatTime(video.duration);
            durationDisplay.textContent = `${currentTime} / ${totalTime}`;
        });

        // Click on video to play/pause
        card.addEventListener('click', () => {
            playPauseBtn.click();
        });

        // Pause when out of view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    playPauseBtn.click();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(card);
    });

    // Helper function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Mobile swipe functionality
    if (window.innerWidth <= 768) {
        let touchStartX = 0;
        let currentIndex = 0;

        document.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0 && currentIndex < reelCards.length - 1) {
                    // Swipe left
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right
                    currentIndex--;
                }
                updateReelPosition();
            }
        });

        function updateReelPosition() {
            reelCards.forEach((card, index) => {
                card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            });
        }

        // Initialize positions
        updateReelPosition();
    }

    // Filter functionality
    const filterBtns = document.querySelectorAll('.et-filter-btn');
    const trainerCards = document.querySelectorAll('.et-trainer-card');
    const searchInput = document.querySelector('.et-search-input');

    // Show all trainers by default
    trainerCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    // Make "All Trainers" button active by default
    document.querySelector('.et-filter-btn[data-filter="all"]').classList.add('active');

    // Filter buttons click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // First, get the number of visible cards for grid layout
            const visibleCards = Array.from(trainerCards).filter(card => 
                filterValue === 'all' || card.getAttribute('data-category') === filterValue
            ).length;

            trainerCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });

            // Update grid layout if needed
            const grid = document.querySelector('.et-trainer-grid');
            if (visibleCards === 1) {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                Array.from(trainerCards)
                    .find(card => filterValue === 'all' || card.getAttribute('data-category') === filterValue)
                    .style.gridColumn = '2';
            } else {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
                trainerCards.forEach(card => card.style.gridColumn = 'auto');
            }
        });
    });

    // Search functionality with debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleSearch = debounce((searchTerm) => {
        trainerCards.forEach(card => {
            const name = card.querySelector('.et-trainer-name').textContent.toLowerCase();
            const specialty = card.querySelector('.et-trainer-specialty').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.et-tag')).map(tag => tag.textContent.toLowerCase());
            
            if (name.includes(searchTerm) || 
                specialty.includes(searchTerm) || 
                tags.some(tag => tag.includes(searchTerm))) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }, 300);

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            handleSearch(searchTerm);
        });
    }

    // Hover effects for trainer cards
    trainerCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Rating stars functionality
    document.querySelectorAll('.stars').forEach(starsContainer => {
        const rating = parseFloat(starsContainer.getAttribute('data-rating') || 5);
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        let starsHTML = '★'.repeat(fullStars);
        if (hasHalfStar) {
            starsHTML += '⯨';
        }
        starsHTML += '☆'.repeat(5 - Math.ceil(rating));
        
        starsContainer.innerHTML = starsHTML;
    });

    // CTA button animation
    const ctaBtn = document.querySelector('.et-cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('mouseenter', () => {
            ctaBtn.querySelector('i').style.transform = 'translateX(5px)';
        });
        
        ctaBtn.addEventListener('mouseleave', () => {
            ctaBtn.querySelector('i').style.transform = 'translateX(0)';
        });
    }

    // Gallery Section Enhancements - Removed floating icons
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize counters for statistics
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            animateValue(stat, 0, target, 2000);
        });

        // Initialize card effects
        initializeCardEffects();

        // Initialize feature animations
        initializeFeatureAnimations();
    });
});

// Animate number counting
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.textContent.includes('+') ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize card hover effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.modern-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            
            card.addEventListener('mousemove', function(e) {
                const deltaX = (e.clientX - centerX) / 20;
                const deltaY = (e.clientY - centerY) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(10px)`;
            });
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Initialize feature animations
function initializeFeatureAnimations() {
    const features = document.querySelectorAll('.modern-feature');
    
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon-wrap');
            icon.style.transform = 'rotateY(180deg)';
            
            // Add pulse effect
            icon.style.animation = 'pulse 0.5s ease-in-out';
            
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        });

        feature.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon-wrap');
            icon.style.transform = 'rotateY(0)';
        });
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and features
document.querySelectorAll('.modern-card, .modern-feature').forEach(element => {
    observer.observe(element);
});

// Add smooth parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-circle, .bg-line');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('bg-circle') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }

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
`;
document.head.appendChild(style);

// free trial

document.getElementById('freeTrialForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        this.reset();
        submitBtn.textContent = 'Claim Your Free Trial';
        submitBtn.disabled = false;
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }, 1500);
});
// Trainer Section Functionality
document.addEventListener('DOMContentLoaded', function() {
// Initialize counters for stats
const stats = document.querySelectorAll('.et-stat-number');
let hasAnimated = false;

function animateStats() {
if (hasAnimated) return;

stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'), 10);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
        if (current < target) {
            current += increment;
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target;
        }
    };

    updateCount();
});

hasAnimated = true;
}

// Intersection Observer for stats animation
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target); // Stop observing after animation
    }
});
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.et-stats-container');
if (statsContainer) {
observer.observe(statsContainer);
}

// Filter functionality
const filterBtns = document.querySelectorAll('.et-filter-btn');
const trainerCards = document.querySelectorAll('.et-trainer-card');
const searchInput = document.querySelector('.et-search-input');

// Filter buttons click handler
filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
    try {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        trainerCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });

        // Ensure consistent grid layout
        const grid = document.querySelector('.et-trainer-grid');
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    } catch (error) {
        console.error('Filter error:', error);
    }
});
});

// Search functionality with debounce
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
    const later = () => {
        clearTimeout(timeout);
        func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
};
}

const handleSearch = debounce((searchTerm) => {
try {
    trainerCards.forEach(card => {
        const name = card.querySelector('.et-trainer-name')?.textContent.toLowerCase() || '';
        const specialty = card.querySelector('.et-trainer-specialty')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.et-tag')).map(tag => tag.textContent.toLowerCase());
        
        if (name.includes(searchTerm) || 
            specialty.includes(searchTerm) || 
            tags.some(tag => tag.includes(searchTerm))) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
} catch (error) {
    console.error('Search error:', error);
}
}, 300);

if (searchInput) {
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    handleSearch(searchTerm);
});
}

// Hover effects for trainer cards
trainerCards.forEach(card => {
card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
});
});

// Rating stars functionality
document.querySelectorAll('.stars').forEach(starsContainer => {
try {
    const rating = parseFloat(starsContainer.getAttribute('data-rating') || 5);
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    let starsHTML = '★'.repeat(fullStars);
    if (hasHalfStar) {
        starsHTML += '⯨';
    }
    starsHTML += '☆'.repeat(5 - Math.ceil(rating));
    
    starsContainer.innerHTML = starsHTML;
} catch (error) {
    console.error('Rating error:', error);
}
});

// CTA button animation
const ctaBtn = document.querySelector('.et-cta-btn');
if (ctaBtn) {
ctaBtn.addEventListener('mouseenter', () => {
    ctaBtn.querySelector('i').style.transform = 'translateX(5px)';
});

ctaBtn.addEventListener('mouseleave', () => {
    ctaBtn.querySelector('i').style.transform = 'translateX(0)';
});
}
});

// Global state for unit system
let currentUnit = 'metric';

// Unit toggle functionality
document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentUnit = this.dataset.unit;
        document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        toggleUnitInputs();
        clearResults();
    });
});

function toggleUnitInputs() {
    const metricInputs = document.querySelector('.metric-inputs');
    const imperialInputs = document.querySelector('.imperial-inputs');
    
    if (currentUnit === 'metric') {
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
    } else {
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'block';
    }
}

function clearResults() {
    document.getElementById('bmiValue').textContent = '-';
    document.getElementById('bmrValue').textContent = '-';
    document.getElementById('tdeeValue').textContent = '-';
    document.getElementById('weightStatus').textContent = '-';
    document.getElementById('bmiExplanation').textContent = '';
    document.getElementById('recommendedActions').textContent = '';
}

function calculateBiometrics() {
    let height, weight;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);

    // Get measurements based on current unit system
    if (currentUnit === 'metric') {
        height = parseFloat(document.getElementById('height').value);
        weight = parseFloat(document.getElementById('weight').value);
    } else {
        const feet = parseFloat(document.getElementById('feet').value);
        const inches = parseFloat(document.getElementById('inches').value);
        const weightLbs = parseFloat(document.getElementById('weightLbs').value);
        
        // Convert to metric
        height = ((feet * 12) + inches) * 2.54; // Convert to cm
        weight = weightLbs * 0.453592; // Convert to kg
    }

    if (!validateInputs(height, weight, age, gender, activityLevel)) return;

    const results = calculateResults(height, weight, age, gender, activityLevel);
    displayResults(results);
    updateBMIScale(results.bmi);
    showDetailedExplanation(results);
}

function validateInputs(height, weight, age, gender, activityLevel) {
    const validations = [
        { 
            condition: currentUnit === 'metric' 
                ? (height < 50 || height > 250)
                : (height < 60 || height > 250),
            message: 'Please enter a valid height'
        },
        { 
            condition: currentUnit === 'metric'
                ? (weight < 20 || weight > 300)
                : (weight < 20 || weight > 300),
            message: 'Please enter a valid weight'
        },
        { condition: age < 15 || age > 100, message: 'Please enter a valid age (15-100 years)' },
        { condition: !gender, message: 'Please select your gender' },
        { condition: !activityLevel, message: 'Please select your activity level' }
    ];

    for (const validation of validations) {
        if (validation.condition) {
            showError(validation.message);
            return false;
        }
    }
    return true;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message animate__animated animate__fadeIn';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${message}
    `;
    
    const calculator = document.querySelector('.bmi-calculator');
    calculator.insertBefore(errorDiv, calculator.firstChild);
    
    setTimeout(() => {
        errorDiv.classList.add('animate__fadeOut');
        setTimeout(() => errorDiv.remove(), 500);
    }, 3000);
}

function calculateResults(height, weight, age, gender, activityLevel) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Mifflin-St Jeor Formula for BMR
    const bmr = gender === 'male' 
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    
    const tdee = bmr * activityLevel;

    return { 
        bmi: Math.round(bmi * 10) / 10,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee)
    };
}

function displayResults(results) {
    const elements = {
        bmi: document.getElementById('bmiValue'),
        bmr: document.getElementById('bmrValue'),
        tdee: document.getElementById('tdeeValue'),
        status: document.getElementById('weightStatus')
    };

    // Animate numbers counting up
    animateValue(elements.bmi, 0, results.bmi, 1000);
    animateValue(elements.bmr, 0, results.bmr, 1000);
    animateValue(elements.tdee, 0, results.tdee, 1000);

    // Set weight status with appropriate color
    const status = getBMIStatus(results.bmi);
    elements.status.textContent = status;
    elements.status.className = `result-status ${status.toLowerCase()}`;
}

function getBMIStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function updateBMIScale(bmi) {
    document.querySelectorAll('.scale-marker').forEach(marker => {
        marker.classList.remove('active');
        const range = marker.dataset.range;
        if (isInRange(bmi, range)) {
            marker.classList.add('active');
        }
    });
}

function isInRange(bmi, range) {
    if (range.includes('<')) return bmi < parseFloat(range.replace('<', ''));
    if (range.includes('≥')) return bmi >= parseFloat(range.replace('≥', ''));
    const [min, max] = range.split('-').map(num => parseFloat(num));
    return bmi >= min && bmi <= max;
}

function showDetailedExplanation(results) {
    const bmiStatus = getBMIStatus(results.bmi);
    const explanationEl = document.getElementById('bmiExplanation');
    const actionsEl = document.getElementById('recommendedActions');

    // Personalized BMI explanation
    explanationEl.innerHTML = `Your BMI of ${results.bmi} indicates that you are in the ${bmiStatus.toLowerCase()} range. 
        Your body requires approximately ${results.bmr} calories at rest and ${results.tdee} calories daily with your current activity level.`;

    // Personalized recommendations
    const recommendations = {
        Underweight: 'Consider increasing your caloric intake and incorporating strength training.',
        Normal: 'Maintain your healthy lifestyle with balanced nutrition and regular exercise.',
        Overweight: 'Focus on portion control and increasing physical activity.',
        Obese: 'Consult with a healthcare provider for a personalized weight management plan.'
    };

    actionsEl.innerHTML = `<strong>Recommended Actions:</strong><br>${recommendations[bmiStatus]}`;
}

// Add input validation feedback
document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    const value = parseFloat(input.value);
    const id = input.id;
    let isValid = true;
    let message = '';

    const validationRules = {
        height: { min: 50, max: 250, message: 'Height should be between 50-250 cm' },
        weight: { min: 20, max: 300, message: 'Weight should be between 20-300 kg' },
        weightLbs: { min: 44, max: 660, message: 'Weight should be between 44-660 lbs' },
        feet: { min: 2, max: 8, message: 'Feet should be between 2-8' },
        inches: { min: 0, max: 11, message: 'Inches should be between 0-11' },
        age: { min: 15, max: 100, message: 'Age should be between 15-100 years' }
    };

    if (validationRules[id]) {
        const rule = validationRules[id];
        isValid = value >= rule.min && value <= rule.max;
        message = rule.message;
    }

    updateInputStyle(input, isValid, message);
}

function updateInputStyle(input, isValid, message) {
    const inputGroup = input.closest('.input-group');
    
    inputGroup.classList.toggle('error', !isValid);
    inputGroup.classList.toggle('success', isValid && input.value !== '');
    
    let tooltip = inputGroup.querySelector('.input-tooltip');
    if (!isValid) {
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'input-tooltip animate__animated animate__fadeIn';
            inputGroup.appendChild(tooltip);
        }
        tooltip.textContent = message;
    } else if (tooltip) {
        tooltip.remove();
    }
}

// Testimonial Carousel and Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!track || !cards.length || !nextBtn || !prevBtn || !dotsContainer) {
        console.log('Required elements not found');
        return;
    }

    let currentIndex = 0;
    let cardWidth;
    let numVisible;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Initialize carousel
    function initCarousel() {
        if (window.innerWidth >= 1200) {
            numVisible = 3;
        } else if (window.innerWidth >= 768) {
            numVisible = 2;
        } else {
            numVisible = 1;
        }
        
        cardWidth = track.offsetWidth / numVisible;
        cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
        });
    }

    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= cards.length - numVisible ? '0.5' : '1';
    }

    // Next slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - numVisible) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        initCarousel();
        updateCarousel();
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-value');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-value'));
        const duration = 2000;
        let current = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => animateCounter(stat));
                observer.disconnect(); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.testimonial-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Initialize carousel
    initCarousel();
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');

    let currentIndex = 0;
    let cardWidth;
    let numVisible;

    // Initialize carousel
    function initCarousel() {
        // Set number of visible cards based on screen width
        if (window.innerWidth >= 1200) {
            numVisible = 3;
        } else if (window.innerWidth >= 768) {
            numVisible = 2;
        } else {
            numVisible = 1;
        }

        // Calculate card width
        cardWidth = track.offsetWidth / numVisible;
        
        // Set width for each card
        cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
        });

        // Reset position if current index is out of bounds
        if (currentIndex > cards.length - numVisible) {
            currentIndex = cards.length - numVisible;
            updateCarousel();
        }
    }

    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - numVisible;
        
        // Update dots
        updateDots();
    }

    // Create and update dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= cards.length - numVisible; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Navigation functions
    function nextSlide() {
        if (currentIndex < cards.length - numVisible) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Handle window resize
    window.addEventListener('resize', () => {
        initCarousel();
        createDots();
        updateCarousel();
    });

    // Initialize
    initCarousel();
    createDots();
    updateCarousel();

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-value');
    let animated = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-value'));
        const duration = 2000;
        let current = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                stats.forEach(stat => animateCounter(stat));
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.testimonial-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Fitness Shorts Module
const FitnessShorts = {
    shortsData: [
        {
            id: 1,
            videoUrl: 'static/videos/vid1.mp4',
            title: 'Dumbbell Workout',
            author: 'FitnessTrainer',
            authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
            description: 'Perfect form for shoulder press 💪 #fitness #workout',
            likes: 1500,
            comments: [
                { user: 'John', text: 'Great form!' },
                { user: 'Sarah', text: 'Thanks for the tips!' }
            ],
            isLiked: false
        },
        {
            id: 2,
            videoUrl: 'static/videos/vid2.mp4',
            title: 'HIIT Training',
            author: 'FitnessExpert',
            authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
            description: 'High intensity interval training 🔥 #hiit #cardio',
            likes: 2100,
            comments: [
                { user: 'Mike', text: 'Amazing workout!' }
            ],
            isLiked: false
        },
        {
            id: 3,
            videoUrl: 'static/videos/vid3.mp4',
            title: 'Yoga Flow',
            author: 'YogaMaster',
            authorImg: 'https://randomuser.me/api/portraits/women/28.jpg',
            description: 'Morning yoga flow for flexibility 🧘‍♀️ #yoga #wellness',
            likes: 3200,
            comments: [
                { user: 'Emma', text: 'So peaceful!' },
                { user: 'Alex', text: 'Need to try this!' }
            ],
            isLiked: false
        },
        {
            id: 4,
            videoUrl: 'static/videos/videoplayback.mp4',
            title: 'Core Workout',
            author: 'CoreSpecialist',
            authorImg: 'https://randomuser.me/api/portraits/men/45.jpg',
            description: '5-minute ab workout challenge 🎯 #abs #core',
            likes: 4500,
            comments: [
                { user: 'Lisa', text: 'My abs are on fire!' },
                { user: 'David', text: 'Great routine!' }
            ],
            isLiked: false
        },
        {
            id: 5,
            videoUrl: 'static/videos/vid1.mp4',
            title: 'Boxing Basics',
            author: 'BoxingPro',
            authorImg: 'https://randomuser.me/api/portraits/men/22.jpg',
            description: 'Basic boxing combinations for beginners 🥊 #boxing #fitness',
            likes: 2800,
            comments: [
                { user: 'James', text: 'Perfect for beginners!' },
                { user: 'Maria', text: 'Love these combos!' }
            ],
            isLiked: false
        }
    ],

    init() {
        this.videoFeed = document.querySelector('.shorts-video-feed');
        if (!this.videoFeed) return;
        
        this.videoFeed.innerHTML = '';
        this.createVideoElements();
        this.setupScrollHandling();
        this.setupKeyboardControls();
        
        // Initialize first video
        const firstVideo = this.videoFeed.querySelector('.shorts-video');
        if (firstVideo) {
            firstVideo.play().catch(err => console.log('Auto-play prevented:', err));
        }
    },

    createVideoElements() {
        this.shortsData.forEach((video, index) => {
            const videoWrapper = this.createVideoWrapper(video, index);
            this.videoFeed.appendChild(videoWrapper);
            this.setupVideoInteractions(videoWrapper, video);
        });
    },

    createVideoWrapper(video, index) {
        const wrapper = document.createElement('div');
        wrapper.className = 'shorts-video-wrapper';
        wrapper.dataset.index = index;
        wrapper.innerHTML = `
            <div class="shorts-video-player">
                <video
                    src="${video.videoUrl}"
                    class="shorts-video"
                    loop
                    muted
                    playsinline
                    preload="metadata"
                >
                </video>
                
                <!-- Control Overlay -->
                <div class="shorts-control-overlay">
                    <div class="tap-to-play">
                        <span class="play-message">Tap to play</span>
                    </div>
                    <button class="large-play-btn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                
                <!-- Video Info and Actions -->
                <div class="shorts-video-overlay">
                    <div class="shorts-info">
                        <div class="shorts-user-info">
                            <h4>@${video.author}</h4>
                        </div>
                        <p class="shorts-description">${video.description}</p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="shorts-actions">
                        <button class="shorts-action-btn shorts-like ${video.isLiked ? 'liked' : ''}" 
                                data-video-id="${video.id}">
                            <i class="fas fa-heart"></i>
                            <span class="action-count">${this.formatNumber(video.likes)}</span>
                        </button>
                        <button class="shorts-action-btn shorts-comment">
                            <i class="fas fa-comment"></i>
                            <span class="action-count">${video.comments.length}</span>
                        </button>
                        <button class="shorts-action-btn shorts-share">
                            <i class="fas fa-share"></i>
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        return wrapper;
    },

    setupVideoInteractions(wrapper, videoData) {
        const video = wrapper.querySelector('.shorts-video');
        const controlOverlay = wrapper.querySelector('.shorts-control-overlay');
        const playBtn = wrapper.querySelector('.large-play-btn');
        const playMessage = wrapper.querySelector('.tap-to-play');
        const actionsContainer = wrapper.querySelector('.shorts-actions');
        const likeBtn = wrapper.querySelector('.shorts-like');
        const commentBtn = wrapper.querySelector('.shorts-comment');
        const shareBtn = wrapper.querySelector('.shorts-share');

        // Handle video play/pause
        const togglePlay = (e) => {
            // Check if click is on action buttons
            if (e.target.closest('.shorts-actions')) {
                return; // Don't play/pause if clicking action buttons
            }

            if (video.paused) {
                video.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    wrapper.classList.add('playing');
                    playMessage.style.opacity = '0';
                });
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                wrapper.classList.remove('playing');
                playMessage.style.opacity = '1';
            }
        };

        // Add click handlers
        controlOverlay.addEventListener('click', togglePlay);

        // Action button handlers with stopPropagation
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop event from reaching the control overlay
            this.handleLike(videoData, likeBtn);
        });

        commentBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleComment(videoData, wrapper);
        });

        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleShare(videoData);
        });

        // Rest of your existing code...
    },

    handleLike(videoData, likeBtn) {
        videoData.isLiked = !videoData.isLiked;
        videoData.likes += videoData.isLiked ? 1 : -1;
        
        likeBtn.classList.toggle('liked');
        likeBtn.querySelector('.action-count').textContent = this.formatNumber(videoData.likes);

        if (videoData.isLiked) {
            this.showLikeAnimation(likeBtn.closest('.shorts-video-wrapper'));
        }
    },

    showLikeAnimation(wrapper) {
        const heart = document.createElement('div');
        heart.className = 'shorts-like-animation';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        wrapper.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    },

    handleComment(videoData, wrapper) {
        // Create and show comments panel
        const commentsPanel = document.createElement('div');
        commentsPanel.className = 'shorts-comments-panel';
        commentsPanel.innerHTML = `
            <div class="comments-header">
                <h3>Comments (${videoData.comments.length})</h3>
                <button class="close-comments"><i class="fas fa-times"></i></button>
            </div>
            <div class="comments-list">
                ${videoData.comments.map(comment => `
                    <div class="comment-item">
                        <div class="comment-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="comment-content">
                            <strong>${comment.user}</strong>
                            <p>${comment.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="add-comment">
                <input type="text" class="comment-input" placeholder="Add a comment...">
                <button class="post-comment">Post</button>
            </div>
        `;

        wrapper.appendChild(commentsPanel);
        
        // Add event listeners for comments panel
        const closeBtn = commentsPanel.querySelector('.close-comments');
        const input = commentsPanel.querySelector('.comment-input');
        const postBtn = commentsPanel.querySelector('.post-comment');

        closeBtn.addEventListener('click', () => {
            commentsPanel.remove();
        });

        postBtn.addEventListener('click', () => {
            const comment = input.value.trim();
            if (comment) {
                this.addComment(videoData, comment, commentsPanel);
                input.value = '';
            }
        });

        // Show panel with animation
        setTimeout(() => commentsPanel.classList.add('active'), 10);
    },

    handleShare(videoData) {
        if (navigator.share) {
            navigator.share({
                title: videoData.title,
                text: videoData.description,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareUrl = window.location.href;
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = shareUrl;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show copied notification
            const notification = document.createElement('div');
            notification.className = 'share-notification';
            notification.textContent = 'Link copied to clipboard!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
    },

    addComment(videoData, text, panel) {
        const comment = {
            user: 'You',
            text: text
        };
        
        videoData.comments.push(comment);
        
        const commentsList = panel.querySelector('.comments-list');
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="comment-content">
                <strong>${comment.user}</strong>
                <p>${comment.text}</p>
            </div>
        `;
        
        commentsList.appendChild(commentElement);
        
        // Update comment count
        const commentCount = this.videoFeed.querySelector(`[data-video-id="${videoData.id}"] .shorts-comment .action-count`);
        commentCount.textContent = videoData.comments.length;
    },

    setupScrollHandling() {
        let debounceTimeout;
        let lastPlayedVideo = null;
        
        this.videoFeed.addEventListener('scroll', () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            
            debounceTimeout = setTimeout(() => {
                const videos = this.videoFeed.querySelectorAll('.shorts-video');
                videos.forEach(video => {
                    const rect = video.getBoundingClientRect();
                    const visible = (
                        rect.top >= 0 &&
                        rect.top <= window.innerHeight - (rect.height / 2)
                    );
                    
                    if (visible) {
                        if (lastPlayedVideo && lastPlayedVideo !== video) {
                            lastPlayedVideo.pause();
                        }
                        video.play().catch(err => console.log('Auto-play prevented:', err));
                        lastPlayedVideo = video;
                        
                        // Update play button state
                        const wrapper = video.closest('.shorts-video-wrapper');
                        const playBtn = wrapper.querySelector('.large-play-btn');
                        const playOverlay = wrapper.querySelector('.shorts-control-overlay');
                        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        playOverlay.classList.add('playing');
                    } else {
                        video.pause();
                        // Update play button state
                        const wrapper = video.closest('.shorts-video-wrapper');
                        const playBtn = wrapper.querySelector('.large-play-btn');
                        const playOverlay = wrapper.querySelector('.shorts-control-overlay');
                        playBtn.innerHTML = '<i class="fas fa-play"></i>';
                        playOverlay.classList.remove('playing');
                    }
                });
            }, 100);
        });
    },

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                this.navigateVideo('prev');
            } else if (e.key === 'ArrowDown') {
                this.navigateVideo('next');
            }
        });
    },

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    FitnessShorts.init();
});
