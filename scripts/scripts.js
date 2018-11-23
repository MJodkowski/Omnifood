const NAVHEIGHT = 0.1;
    header = document.querySelector('.header'),
    nav = document.querySelector('nav'),
    whiteLogo = document.querySelector('.nav--logo-white'),
    blackLogo = document.querySelector('.nav--logo-black'),
    sectionOverview = document.querySelector('.section-overview'),
    sectionOverviewContainer = document.querySelector('.section-overview--container'),
    sectionSteps = document.querySelector('.section-steps'),
    phoneImg = document.querySelector('.section-steps--phoneimg'),
    sectionCities = document.querySelector('.section-cities'),
    sectionCitiesContainer = document.querySelector('.section-cities--image-row'),
    sectionPlans = document.querySelector('.section-plans');
    sectionPlansContainer = document.querySelector('.section-plans--plan-container'),
    navButtons = document.querySelector('.nav--buttons'),
    heroButtons = document.querySelector('.header--hero-button-container'),
    hamburgerButton = document.querySelector('.nav--icon');

// make passive
window.addEventListener('scroll', scrollHandler);
window.addEventListener('scroll', scrollHandlerPlans);
navButtons.addEventListener('click', (e) => navHandler(e));
heroButtons.addEventListener('click', (e) => navHandler(e));
hamburgerButton.addEventListener('click', hamburgerHandler);

function hamburgerHandler() {
    if (hamburgerButton.classList.contains('ion-md-menu') && nav.classList.contains('nav-fixed')) {
        hamburgerButton.classList.remove('ion-md-menu');
        hamburgerButton.classList.add('ion-md-close');
        navButtons.classList.add('nav-fixed--buttons-open');
    } else if (hamburgerButton.classList.contains('ion-md-menu')) {
        hamburgerButton.classList.remove('ion-md-menu');
        hamburgerButton.classList.add('ion-md-close');
        navButtons.classList.add('nav--buttons-open');
    } else {
        hamburgerButton.classList.remove('ion-md-close');
        hamburgerButton.classList.add('ion-md-menu');
        if (navButtons.classList.contains('nav-fixed--buttons-open')) {
            navButtons.classList.remove('nav-fixed--buttons-open');
        } else {
            navButtons.classList.remove('nav--buttons-open');
        }
    }
}

function navHandler(e) {
    if (e.target.classList.contains('nav--icon')) {
        e.target.classList.remove('ion-md-menu');
        e.target.classList.add('ion-md-close');
    } else if (e.target.dataset.target) {
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
    if (window.scrollY >= 0.5 * sectionOverview.offsetTop) {
        sectionOverviewContainer.classList.remove('see-through');
    }
    if (window.scrollY >= 0.8 * sectionSteps.offsetTop) {
        phoneImg.classList.remove('section-steps--phone-before-scroll', 'see-through');
    }
    if (window.scrollY >= 0.9 * sectionCities.offsetTop) {
        sectionCitiesContainer.classList.remove('see-through');
    }
}

function scrollHandlerPlans() {
    if (window.scrollY >= 0.9 * sectionPlans.offsetTop) {
        sectionPlansContainer.classList.add('large');
        setTimeout(() => {
            sectionPlansContainer.classList.remove('large');
            window.removeEventListener('scroll', scrollHandlerPlans);
        }, 500);
    }
}

function displayNav() {
    if (window.scrollY >= sectionOverview.offsetTop - NAVHEIGHT * window.innerHeight) {
        nav.classList.add('nav-fixed');
        navButtons.classList.add('nav--buttons-fixed');
        whiteLogo.classList.add('invisible');
        blackLogo.classList.remove('invisible');
    }
    else if (nav.classList.contains('nav-fixed')) {
        nav.classList.remove('nav-fixed');
        navButtons.classList.remove('nav--buttons-fixed');
        blackLogo.classList.add('invisible');
        whiteLogo.classList.remove('invisible');
    }
}

