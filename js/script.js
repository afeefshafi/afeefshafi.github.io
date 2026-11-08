/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);

    }, 1200);

});

/* ==========================
   TYPING EFFECT
========================== */

const typingElement =
document.getElementById("typing");

const words = [

    "Tech Enthusiast",
    "Innovative Solution Builder",

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord =
    words[wordIndex];

    if(!deleting){

        typingElement.textContent =
        currentWord.substring(0, charIndex + 1);

        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    }else{

        typingElement.textContent =
        currentWord.substring(0, charIndex - 1);

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,
    deleting ? 60 : 120);

}

typeEffect();


/* ==========================
   ACTIVE NAV LINKS
========================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 150;

        const sectionHeight =
        section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){

            link.classList.add("active");

        }

    });

});


/* ==========================
   HEADER SCROLL EFFECT
========================== */

const header =
document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.background =
        "rgba(0,0,0,.85)";

        header.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.25)";

    }else{

        header.style.background =
        "rgba(0,0,0,.15)";

        header.style.boxShadow =
        "none";

    }

});


/* ==========================
   BACK TO TOP BUTTON
========================== */

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});


/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

const revealElements =
document.querySelectorAll(

".section, .skill-card, .project-card, .cert-card"

);

function reveal(){

    revealElements.forEach(el => {

        const position =
        el.getBoundingClientRect().top;

        const screenPosition =
        window.innerHeight - 100;

        if(position < screenPosition){

            el.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


/* ==========================
   COUNTER ANIMATION
========================== */

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target =
        +counter.getAttribute("data-target");

        const current =
        +counter.innerText;

        const increment =
        target / 120;

        if(current < target){

            counter.innerText =
            `${Math.ceil(
                current + increment
            )}`;

            setTimeout(updateCounter, 20);

        }else{

            counter.innerText = target;

        }

    };

    updateCounter();

});


/* ==========================
   EMAILJS
========================== */

/*
1. Create account:
   https://www.emailjs.com

2. Create Service

3. Create Template

4. Replace IDs below
*/

(function(){

    emailjs.init("yuJ5I90PQOKAPSmWx"); /* Public key */

})();

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener(
"submit",
function(e){

    e.preventDefault();

    emailjs.sendForm(

        "service_hcptht9", /* Your service id */
        "template_8rc0298", /* Your template id */
        this

    )

    .then(() => {

        alert(
        "Message sent successfully!"
        );

        contactForm.reset();

    })

    .catch(error => {

        console.error(error);

        alert(
        "Failed to send message."
        );

    });

});


/* ==========================
      DARK MODE
========================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-theme");

    themeToggle.checked = true;

}

themeToggle.addEventListener("change",()=>{

    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

});

/* =========================================
   ADVANCED SCROLL REVEAL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Elements to animate
    const revealElements = document.querySelectorAll(`
        .section-title,
        .hero-content,
        .hero-image,
        .about-image,
        .about-text,
        .timeline-item,
        .education-card,
        .skill-category,
        .cert-card,
        .project-card,
        #contactForm,
        footer
    `);

    // Animation directions
    const directions = [
        "from-bottom",
        "from-left",
        "from-right",
        "zoom-in"
    ];

    // Add reveal classes
    revealElements.forEach((element, index) => {

        element.classList.add("scroll-reveal");

        // Alternate animation directions for selected elements
        if (
            element.matches(".hero-content, .about-text, .timeline-item")
        ) {
            element.classList.add("from-left");
        }

        else if (
            element.matches(".hero-image, .about-image")
        ) {
            element.classList.add("from-right");
        }

        else if (
            element.matches(".education-card, .skill-box, .cert-card, .project-card")
        ) {
            element.classList.add("from-bottom");

            // Stagger effect
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 100}ms`
            );
        }

        else {
            element.classList.add("from-bottom");
        }

    });

    // Intersection Observer
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                } else {

                    // Remove class to repeat animation on scrolling back
                    entry.target.classList.remove("is-visible");

                }

            });

        },
        observerOptions
    );

    // Observe all elements
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

});


/* ===================================
   ADVANCED CERTIFICATION & PROJECT CAROUSEL
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carousels = document.querySelectorAll("[data-carousel]");

    carousels.forEach((carousel) => {

        const track = carousel.querySelector(".carousel-track");
        const slides = Array.from(track.children);

        const prevBtn = carousel.querySelector("[data-prev]");
        const nextBtn = carousel.querySelector("[data-next]");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        let currentIndex = 0;
        let visibleSlides = 1;
        let maxIndex = 0;

        let startX = 0;
        let endX = 0;

        if (slides.length <= 1) {
            carousel.querySelector(".carousel-controls").style.display = "none";
            return;
        }

        function getVisibleSlides() {

            if (carousel.classList.contains("project-carousel")) {
                return 1;
            }

            if (window.innerWidth <= 600) {
                return 1;
            }

            if (window.innerWidth <= 900) {
                return 2;
            }

            return 3;
        }

        function updateCarousel() {

            visibleSlides = getVisibleSlides();
            maxIndex = Math.max(0, slides.length - visibleSlides);

            currentIndex = Math.min(currentIndex, maxIndex);

            const slideOffset = slides[currentIndex].offsetLeft - slides[0].offsetLeft;

            track.style.transform = `translate3d(-${slideOffset}px, 0, 0)`;

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;

            updateDots();
        }

        function createDots() {

            dotsContainer.innerHTML = "";

            const totalDots = Math.max(1, slides.length - visibleSlides + 1);

            for (let i = 0; i < totalDots; i++) {

                const dot = document.createElement("button");

                dot.type = "button";
                dot.classList.add("carousel-dot");
                dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

                dot.addEventListener("click", () => {
                    currentIndex = i;
                    updateCarousel();
                });

                dotsContainer.appendChild(dot);
            }

            updateDots();
        }

        function updateDots() {

            const dots = dotsContainer.querySelectorAll(".carousel-dot");

            dots.forEach((dot, index) => {

                dot.classList.toggle("active", index === currentIndex);

                dot.setAttribute(
                    "aria-current",
                    index === currentIndex ? "true" : "false"
                );

            });
        }

        nextBtn.addEventListener("click", () => {

            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }

        });

        prevBtn.addEventListener("click", () => {

            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }

        });

        /* TOUCH SWIPE */

        track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener("touchend", (e) => {

            endX = e.changedTouches[0].clientX;

            const difference = startX - endX;

            if (Math.abs(difference) > 50) {

                if (difference > 0 && currentIndex < maxIndex) {
                    currentIndex++;
                }

                else if (difference < 0 && currentIndex > 0) {
                    currentIndex--;
                }

                updateCarousel();
            }

        }, { passive: true });

        /* RESPONSIVE UPDATE */

        let resizeTimeout;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {

                currentIndex = Math.min(currentIndex, maxIndex);

                createDots();
                updateCarousel();

            }, 150);

        });

        createDots();
        updateCarousel();

    });

});
