const headers = document.getElementsByTagName('HEADER');
const revealContainers = document.querySelectorAll('.reveal');
const topButton = document.getElementById('to-top');

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
  ) header.classList.toggle('header-shadow', window.pageYOffset > 0);
  topButton?.classList.toggle('hidden', window.pageYOffset === 0);
}

checkClasses();
window.addEventListener('scroll', checkClasses);
