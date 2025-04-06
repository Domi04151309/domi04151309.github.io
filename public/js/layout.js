const headers = document.getElementsByTagName('HEADER');
let revealContainers = document.querySelectorAll('.reveal');
const topButton = document.getElementById('to-top');

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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      registration.addEventListener('updatefound', () => {
        const updatedWorker = registration.installing;
        if (updatedWorker === null) return;
        updatedWorker.addEventListener('statechange', () => {
          if (
            updatedWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) updatedWorker.postMessage({ action: 'skipWaiting' }, []);
        });
      });
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    location.reload();
    refreshing = true;
  });
}
