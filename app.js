let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');
let slider = document.querySelector('.slider'); // Add this line to define the slider element

let active = 2; // Initially the first item is active
let refreshInterval; // Auto-slider

let startX, endX; // Variables for swipe detection (touch or mouse)

// Load and arrange items dynamically
function loadShow() {
    items.forEach((item, index) => {
        item.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });

    let stt = 0;

    // Active item styling
    items[active].classList.add('active');
    items[active].style.transform = 'none';
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    // Style right items
    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].classList.remove('active');
        items[i].style.transform = `translateX(${-30 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 1 ? 0 : 0.9;
    }

    // Style left items
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].classList.remove('active');
        items[i].style.transform = `translateX(${30 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 1 ? 0 : 0.6;
    }

    // Highlight active thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === active);
    });

    
    // Reset auto-slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => next.click(), 5000);
}

// Button event listeners
next.onclick = function () {
    active = (active + 1) % items.length;
    loadShow();
};

prev.onclick = function () {
    active = (active - 1 + items.length) % items.length;
    loadShow();
};

// Thumbnail click
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        active = index;
        loadShow();
    });
});

// Initialize on load
loadShow();

// Swipe functionality for mobile screens (with mouse support for desktop)
function handleTouchStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX; // For touch or mouse events
}

function handleTouchMove(e) {
    endX = e.touches ? e.touches[0].clientX : e.clientX; // For touch or mouse events
}

function handleTouchEnd() {
    if (startX - endX > 50) {
        // Swipe left (next slide)
        active = (active + 1) % items.length;
        loadShow();
    } else if (endX - startX > 50) {
        // Swipe right (previous slide)
        active = (active - 1 + items.length) % items.length;
        loadShow();
    }
}

// Adding touch and mouse event listeners for swipe functionality
slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);

// For mouse events to simulate swipe on desktop
slider.addEventListener('mousedown', handleTouchStart);
slider.addEventListener('mousemove', handleTouchMove);
slider.addEventListener('mouseup', handleTouchEnd);
slider.addEventListener('mouseleave', () => { // Prevents issue when mouse leaves the area
    startX = endX = null;
});
