function ready(callback) {
  if (document.readyState!='loading') callback();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
}

document.querySelectorAll("h2, h3").forEach((item) => {
  const headingText = item.innerHTML.toLowerCase().trim().replace(/[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/[ ]/g,"-");
  item.id = headingText;
  item.innerHTML = "<a href='#" + headingText + "' class='hash'>&#35;</a>" + item.innerHTML;
});

document.querySelectorAll("img").forEach((item) => {
  const wrapper = document.createElement("a");
  wrapper.href = item.src;
  item.parentNode.insertBefore(wrapper, item);
  wrapper.appendChild(item);
});

document.querySelectorAll(".hash").forEach((item) => {
  item.addEventListener("click", function(e){
    e.preventDefault();
    scrollToY(item.offsetTop - 86, 500, 'easeInOutQuint');
    window.history.pushState(null, null, item.href);
  });
});

setTimeout(function() {
  if (location.hash) {
    console.log(document.getElementById(location.hash.substring(1)).offsetTop - 86);
    ready(function() {
      console.log(document.getElementById(location.hash.substring(1)).offsetTop - 86);
      scrollToY(document.getElementById(location.hash.substring(1)).offsetTop - 86, 500, 'easeInOutQuint');
    });
  }
}, 1000);
