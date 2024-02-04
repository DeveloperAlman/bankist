'use strict';

//===================================================================
// Lectures
// Selecting elements
console.log(document.documentElement); // entire html page
console.log(document.head); // entire header
console.log(document.body); // entire body

// Selecting the first element that matches
document.querySelector(".header");
// Selecting all elements
const allSections = document.querySelectorAll(".section");
// Selecting with id
document.getElementById("section--1");
// Selecting with class
document.getElementsByClassName("btn");
// Selecting html tags that match (getting all button html tags)
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

// Creating and inserting elements
// create empty div element with createELement()
const message = document.createElement("div");
// Add class to new div element
message.classList.add("cookie-message");
// Adding html tags and text to this element
message.innerHTML = `We use cookies for better performance <button class="btn btn--close-cookie">Got it!</button>`
// Insert this modified element in html page#
document.querySelector(".header").prepend(message); // prepend attach firstly element (cookies message on the top of the page)
document.querySelector(".header").append(message); // append attach lastly element (cookies message on the bottom of the page)
// Delete this cookie message when clicks
document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  message.remove();
});

//===================================================================
// Styles (inline-styles)
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
// Manipulate with computed style
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 20 + "px";
// Change value of color vars in root css
document.documentElement.style.setProperty("--color-primary", "#5ec576");
//===================================================================

// Attributes
// can access to all attributed of defined dom element
// <img src="img/logo.png" alt="Bankist logo" class="nav__logo" id="logo" designer="Alman Nazyrov"/>
const logo = document.querySelector(".nav__logo");
console.log(logo.alt, logo.src, logo.className); // Bankist logo http://127.0.0.1:8080/img/logo.png nav__logo
// access to non-standart and custom attributes
// on logo there is designer attribute, <img src=logo designer="Alman Nazyrov"
console.log(logo.getAttribute("designer")); // Alman Nazyrov
// change attribute values
logo.alt = "Beatiful minimalist logo";
logo.designer = "Someone";
console.log(logo.alt + ", " + logo.designer); // Beatiful minimalist logo, Someone

//===================================================================
// Classes
// add class
logo.classList.add("class", "class");
// remove class
logo.classList.remove("class");
// toggle class
logo.classList.toggle("class");
// if logo contains class (exists in the element)
logo.classList.contains("class");
//===================================================================

const heading = document.querySelector("h1");
// Going downward: selecting to child elements
console.log(heading.querySelectorAll(".highlight"));
// Get child elements of parent
console.log(heading.children);
// Get first element child
console.log(heading.firstElementChild);
// Only first child got white color
// heading.firstElementChild.style.color = "white";
// Get and style last child color
// heading.lastElementChild.style.color = "orangered";

// Going upwards: selecting parents
console.log(heading.parentElement);
// heading.closest(".header").style.background = "var(--gradient-secondary)";

// Going sideways: siblings
console.log(heading.previousElementSibling);
console.log(heading.nextElementSibling);

//===================================================================
// New events
// addEventListener("mousenter")
// mousenter is the same with HOVER css effect
// when hover on element, executes function
const h1 = document.querySelector("h1");
// const hoverOnh1 = function (e) {
//   alert("YOU ARE READING HOVER EFFECT FROM MOUSEENTER EVENT");
//   // removeEventListeners remove events need to specify what element and what function
//   h1.removeEventListener("mouseenter", hoverOnh1);
// }
// h1.addEventListener("mouseenter", hoverOnh1);

//===================================================================
//===================================================================
// Bankist Website
// Modal component
const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelectorAll(".btn--close-modal");
const overlay = document.querySelector(".overlay");
const bodyFixedModal = document.body; // Select the body element correctly

const addModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  bodyFixedModal.classList.add("fixed");
};

const removeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  bodyFixedModal.classList.remove("fixed");
};

btnOpenModal.forEach(button => {
  button.addEventListener("click", addModal);
});

btnCloseModal.forEach(button => {
  button.addEventListener("click", removeModal);
  overlay.addEventListener("click", removeModal);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains('hidden')) {
    removeModal(e); // Pass the event object to removeModal
  }
});

//===================================================================
// Smooth scrolling on a href
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // get coordinates of section
  // getBoundingClientRect measures from top to bottom width and height to get from page to the element
  const section1Coordinates = section1.getBoundingClientRect();
  console.log(section1Coordinates);

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset); // Current scroll (X/Y) 0 400

  // modern scrolling
  // scrollIntoView will automatically calculate positions and scrollings to elements/sections
  // scrollIntoView(pass object{pass smooth behavior, behavior: "smooth"})
  section1.scrollIntoView({
    behavior: "smooth"
  });
});

//===================================================================
// Page navigations
// 1. add event listener to container (parent wrapper to child links)
// 2. determine what element (link) originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const linkAttribute = e.target.getAttribute("href");
    document.querySelector(linkAttribute).scrollIntoView({ behavior: "smooth" })
  }
});

//===================================================================
// Tabbed (tab) component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// Event delegation
// define event on container-wrapper on all 3 tabs
tabsContainer.addEventListener("click", function (e) {
  // .closest will force wrapper to find to the closest button
  const clickedTab = e.target.closest(".operations__tab");
  // prevent error when click betwenn in gaps of button elements
  // if user clicked between of buttons (in the gap) then nothing to do
  if (!clickedTab) return;
  console.log(clickedTab);
  // remove active class on all tabs
  // forEach looping on all tabs
  tabs.forEach(tab => {
    tab.classList.remove("operations__tab--active");
  });
  // adding on current clicked tab an active class
  clickedTab.classList.add("operations__tab--active");

  // remove active class on all tab content
  tabsContent.forEach(tabContent => {
    tabContent.classList.remove("operations__content--active")
  })
  // activate content area on each tab with data attribute
  // dataset is data and dataset.tab will be data-tab in html
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`
  ).classList.add("operations__content--active");
});
//===================================================================

// Navigation menu animation
const nav = document.querySelector(".nav");
// mouseover event is the same is mouseenter but mouseover bubbles over elements
const handleEventOnHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const hoveredLink = e.target;
    const allHoveredLink = hoveredLink.closest(".nav").querySelectorAll(".nav__link");
    const logo = hoveredLink.closest(".nav").querySelector("img");

    allHoveredLink.forEach((link) => {
      if (link !== hoveredLink) {
        link.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
}
// first option to pass argument on function in eventListener
// nav.addEventListener("mouseover", function (e) {
//   handleEventOnHover(e, 0.5);
// });

// nav.addEventListener("mouseout", function (e) {
//   handleEventOnHover(e, 1);
// })

// better option to pass argument in eventListener
nav.addEventListener("mouseover", handleEventOnHover.bind(0.5));
nav.addEventListener("mouseout", handleEventOnHover.bind(1));
//===================================================================

// Sticky navigation
const section1Coordinates = document.querySelector("#section--1").getBoundingClientRect();
window.addEventListener("scroll", function () {
  if (window.scrollY >= section1Coordinates.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
//===================================================================

// Section reveal on scroll
// select all sections
const everySections = document.querySelectorAll(".section");
// passing entries and observer in function
const revealSection = function (entries, observer) {
  // destruct entries for big array
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
// create new observer and pass revealSection function
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // making invisible 
  threshold: 0.15, // when section scrolled for 10% (10% visible)
});

// looping for each section and observing
everySections.forEach(function (section) {
  sectionObserver.observe(section);
  // hide all sections
  section.classList.add("section--hidden");
});
//===================================================================

// Lazy loading
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
  rootMargin: "100px"
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});
//===================================================================

// Slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      curSlide = Number(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider()