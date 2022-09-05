'use strict';

//TODO: SELECTİONS

const headerx = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelector('.nav__link');
const navItem = document.querySelectorAll('.nav__item');
const allSections = document.querySelectorAll('.section');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

//TODO: Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//add event listener to every btn
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//close with esc key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//smooth scroll behavior ama tüm html için css de yaptım kolayca!!
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//TODO: STİCKY NAVİGATİON:
//target elementimiz intersect ettiğinde belirlediğimiz threshold şeyine göre, callback çağırılıyor
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headerx);

//TODO: MENU- FADE ANIMATION
nav.addEventListener('mouseover', function (e) {
  const hoveringLink = e.target.closest('.nav__link');
  const siblings = hoveringLink.closest('.nav').querySelectorAll('.nav__link');
  if (!hoveringLink) return;

  siblings.forEach(el => {
    if (el !== hoveringLink) {
      el.style.opacity = 0.5;
    }
  });
});

nav.addEventListener('mouseout', function (e) {
  const hoveringLink = e.target.closest('.nav__link');
  const siblings = hoveringLink.closest('.nav').querySelectorAll('.nav__link');
  if (!hoveringLink) return;

  siblings.forEach(el => {
    el.style.opacity = 1;
  });
});

//TODO: REVEAL SECTİONS ANİMATİON:
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; // guard koruma
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//TODO: LAZY LOADİNG İMAGES
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; // guard koruma
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null, //set to the entire viewport
  threshold: 0,
  rootMargin: '200px',
  behavior: 'smooth',
});

imgTargets.forEach(imgs => {
  imgObserver.observe(imgs);
});

// TODO: OPERATIONS PART
tabsContainer.addEventListener('click', function (e) {
  //find the clicked button
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //remove the active tab class and show active tab for clicked
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //remove the active content class and show active content for clicked
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //clicked tab content displaying
  const id = clicked.getAttribute('data-tab');
  document
    .querySelector(`.operations__content--${id}`)
    .classList.toggle('operations__content--active');
});

//TODO: SLIDER TESTIMONIALS


// STİCKY NAVİGATİON:
//-------- this is a fucked up solution
// const stickystart = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY >= stickystart.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });
