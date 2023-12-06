const beforeAfterContainer = document.querySelector('.before-after-container');
const beforeImage = document.querySelector('.before-img');
const slider = document.querySelector('.slider');

beforeAfterContainer.addEventListener('mousedown', (event) => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let containerRect = beforeAfterContainer.getBoundingClientRect();
        let position = event.clientX - containerRect.left - slider.offsetWidth / 2; // Subtract half the width of the slider

        if (position < 0) position = 0;
        if (position > containerRect.width - slider.offsetWidth) position = containerRect.width - slider.offsetWidth; // Subtract the width of the slider

        slider.style.left = position + 'px';
        beforeImage.style.clipPath = `inset(0 ${containerRect.width - position}px 0 0)`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});


// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 1; // Start at the first original image (not the duplicate)
    const slides = document.querySelector('.carousel-slides');
    const slideWidth = slides.querySelector('img').clientWidth;
    const totalImages = document.querySelectorAll('.carousel-slides img').length;

    // Initial position set to the first original image
    slides.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';

    document.querySelector('.carousel-next').addEventListener('click', function() {
        if (currentIndex < totalImages - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop back by resetting index and transition
            setTimeout(() => {
                currentIndex = 1;
                slides.style.transition = 'none';
                slides.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
            }, 500); // Transition duration
        }
    });

    document.querySelector('.carousel-prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Loop back by resetting index and transition
            setTimeout(() => {
                currentIndex = totalImages - 2;
                slides.style.transition = 'none';
                slides.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
            }, 500); // Transition duration
        }
    });

    function updateCarousel() {
        slides.style.transition = 'transform 0.5s ease';
        slides.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    }
});

