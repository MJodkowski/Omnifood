const NAVHEIGHT = 0.1,
    header = document.querySelector('.header'),
    nav = document.querySelector('nav'),
    overview = document.querySelector('.overview'),
    overviewContainer = document.querySelector('.overview__container'),
    steps = document.querySelector('.steps'),
    phoneImg = document.querySelector('.phone-img'),
    cities = document.querySelector('.cities'),
    citiesContainer = document.querySelector('.cities__image-row'),
    plans = document.querySelector('.plans'),
    plan = document.querySelector('.plan'),
    navButtons = document.querySelector('.nav__buttons'),
    heroButtons = document.querySelector('.header__hero-button-container'),
    hamburgerButton = document.querySelectorAll('.nav__icon');

window.addEventListener('scroll', scrollHandler);
window.addEventListener('scroll', scrollHandlerPlans);
navButtons.addEventListener('click', (e) => navHandler(e));
heroButtons.addEventListener('click', (e) => navHandler(e));
hamburgerButton.forEach(button => button.addEventListener('click', hamburgerHandler));

function hamburgerHandler() {
    nav.classList.toggle('nav--open');
}

function navHandler(e) {
    if (e.target.dataset.target) {
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            window.scrollTo(0, ease(progress, window.scrollY, document.querySelector(`.${e.target.dataset.target}`).offsetTop - window.scrollY - 0.05 * window.innerHeight, 1500));
            if (progress < 1500) {
                window.requestAnimationFrame(step);
            }
            function ease (t, b, c, d) {
                t /= d;
                return c*t*t + b;
            }
        }
        window.requestAnimationFrame(step);
    }
}

function scrollHandler() {
    displayNav();
    if (window.scrollY >= 0.5 * overview.offsetTop) {
        overviewContainer.classList.remove('see-through');
    }
    if (window.scrollY >= 0.8 * steps.offsetTop) {
        phoneImg.classList.remove('phone--before-scroll', 'see-through');
    }
    if (window.scrollY >= 0.9 * cities.offsetTop) {
        citiesContainer.classList.remove('see-through');
    }
}

function scrollHandlerPlans() {
    if (window.scrollY >= 0.9 * plans.offsetTop) {
        plan.classList.add('large');
        setTimeout(() => {
            plan.classList.remove('large');
            window.removeEventListener('scroll', scrollHandlerPlans);
        }, 500);
    }
}

function displayNav() {
    if (window.scrollY >= overview.offsetTop - NAVHEIGHT * window.innerHeight && !nav.classList.contains('nav--fixed')) {
        nav.classList.toggle('nav--fixed');
    } else if (window.scrollY < overview.offsetTop - NAVHEIGHT * window.innerHeight && nav.classList.contains('nav--fixed')) {
        nav.classList.toggle('nav--fixed');
    }
}

