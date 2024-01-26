const headers = document.getElementsByTagName('HEADER');
const topButton = document.getElementById('to-top');
let revealContainers = document.querySelectorAll('.reveal');

/**
 * @returns {void}
 */
export function updateRevealContainers() {
  revealContainers = document.querySelectorAll('.reveal');
}

/**
 * @returns {void}
 */
function checkClasses() {
  for (
    const container of revealContainers
  ) container.classList.toggle(
    'revealed',
    container.getBoundingClientRect().top < window.innerHeight
  );
  for (
    const header of headers
  ) header.classList.toggle('header-shadow', window.scrollY > 0);
  topButton?.classList.toggle('hidden', window.scrollY === 0);
}

checkClasses();
window.addEventListener('scroll', checkClasses);
