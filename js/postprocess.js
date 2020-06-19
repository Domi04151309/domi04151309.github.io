document.addEventListener("DOMContentLoaded", function(){
  document.querySelector("h2, h3").forEach((item, i) => {
    var headingText = item.innerHTML.toLowerCase().trim().replace(/[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/[ ]/g,"-");
    item.id = headingText;
    item.prepend( "<a href='#" + headingText + "' class='hash'>&#35;</a>" );
  });
  document.querySelector("img").forEach((item, i) => {
    var wrapper = document.createElement("a");
    wrapper.href = item.src;
    item.parentNode.insertBefore(wrapper, item);
    wrapper.appendChild(item);
  });
  document.querySelector(".hash").forEach((item, i) => {
    item.preventDefault();
    $('html,body').animate({
      scrollTop: $(item.href).offset().top - 86
    }, 500);
    window.history.pushState(null, null, item.href);
  });
  setTimeout(loadHash, 1000);
});

function loadHash(){
  if (location.hash) {
    $('html,body').animate({
      scrollTop: $(location.hash).offset().top - 86
    }, 500);
  }
}
