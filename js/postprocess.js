document.querySelectorAll('h2, h3').forEach(item => {
  const headingText = item.innerHTML.toLowerCase().trim().replace(/[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,'').replace(/[ ]/g,'-');
  item.id = headingText;
  item.innerHTML = '<a href="#' + headingText + '" class="hash">&#35;</a>' + item.innerHTML;
});

document.querySelectorAll('img').forEach(item => {
  const wrapper = document.createElement('a');
  wrapper.href = item.src;
  item.parentNode.insertBefore(wrapper, item);
  wrapper.appendChild(item);
});

document.querySelectorAll('.hash').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToY(item.offsetTop - 86, 500, 'easeInOutQuint');
    window.history.pushState(null, null, item.href);
  });
});

setTimeout(function(){
  if (location.hash) {
    scrollToY(document.getElementById(location.hash.substring(1)).offsetTop - 86, 500, 'easeInOutQuint');
  }
}, 1500);

var i = null;
var headers = null;

document.addEventListener('scroll', () => {
  headers = document.getElementsByTagName('HEADER')
  for (i = 0; i < headers.length; i++) {
    headers[i].classList.toggle('header-shadow', window.pageYOffset > 0)
  }
})
