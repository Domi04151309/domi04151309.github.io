const headers = document.getElementsByTagName('HEADER');
const topBtn = document.getElementById('to-top');
let i = 0;

function checkClasses() {
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.toggle('header-shadow', window.pageYOffset > 0);
  }
  topBtn.classList.toggle('hidden', window.pageYOffset == 0);
}
checkClasses();
document.addEventListener('scroll', checkClasses);
