/* =========================================================
   FinTech Lab — small enhancements for the one-page website.
   The website still remains readable if JavaScript is disabled.
   ========================================================= */

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const currentYear = document.querySelector('[data-current-year]');

/** Open or close the mobile navigation. */
function setMenuState(isOpen) {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Close the mobile menu after selecting a section.
  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  // Escape closes the menu for keyboard users.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  // If the device changes from mobile to desktop, reset the menu state.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenuState(false);
  });
}

/** Add a subtle shadow to the sticky header after scrolling. */
function updateHeaderShadow() {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
}

updateHeaderShadow();
window.addEventListener('scroll', updateHeaderShadow, { passive: true });

/**
 * Highlight the menu item for the section currently visible.
 * IntersectionObserver is efficient and supported by modern browsers.
 */
/**
 * Highlights the menu item corresponding to the current section.
 * If sectionId is not provided, all highlighting is removed.
 */
function setActiveNavigation(sectionId = null) {
  navigationLinks.forEach((link) => {
    const isCurrent =
      sectionId !== null &&
      link.getAttribute('href') === `#${sectionId}`;

    link.classList.toggle('is-active', isCurrent);
  });
}


/**
 * No navigation item should remain active
 * when the user is at the very top of the page.
 */
function clearNavigationAtTop() {
  if (window.scrollY <= 100) {
    setActiveNavigation();
    return true;
  }

  return false;
}


/**
 * Highlight the navigation item corresponding to the current section.
 * If sectionId is not provided, all highlighting is removed.
 */
function setActiveNavigation(sectionId = null) {
  navigationLinks.forEach((link) => {
    const isCurrent =
      sectionId !== null &&
      link.getAttribute('href') === `#${sectionId}`;

    link.classList.toggle('is-active', isCurrent);
  });
}


/**
 * Sections connected to the navigation links.
 */
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

let scrollSpyFrame = null;

/**
 * Determines which navigation item should currently be active.
 */
function updateActiveNavigation() {
  /*
    No navigation item should remain active
    at the very top of the page.
  */
  if (window.scrollY <= 100) {
    setActiveNavigation();
    return;
  }

  /*
    When the bottom of the page is reached,
    activate Join Us explicitly.
    This is useful because the final section may be too short
    to cross the normal activation line before scrolling ends.
  */
  const hasReachedPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5;

  if (hasReachedPageBottom) {
    setActiveNavigation('join');
    return;
  }

  /*
    Position of the activation line below the sticky header.
  */
  const activationLine = (header?.offsetHeight ?? 0) + 40;

  let currentSection = null;

  observedSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    /*
      Because sections are processed in document order,
      the last section above the activation line becomes active.
    */
    if (sectionTop <= activationLine) {
      currentSection = section;
    }
  });

  if (currentSection) {
    setActiveNavigation(currentSection.id);
  }
}

/**
 * Use requestAnimationFrame so the scroll handler
 * does not run excessively often.
 */
function requestNavigationUpdate() {
  if (scrollSpyFrame !== null) return;

  scrollSpyFrame = window.requestAnimationFrame(() => {
    updateActiveNavigation();
    scrollSpyFrame = null;
  });
}


window.addEventListener('scroll', requestNavigationUpdate, {
  passive: true,
});

window.addEventListener('resize', requestNavigationUpdate);


/**
 * Highlight the selected navigation item immediately
 * when the user clicks it.
 */
navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const sectionId = link.getAttribute('href').replace('#', '');
    setActiveNavigation(sectionId);
  });
});


updateActiveNavigation();

/** Keep the copyright year current automatically. */
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}