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
    $('html,body').animate({
      scrollTop: item.offsetTop - 86
    }, 500);
    window.history.pushState(null, null, item.href);
  });
});
setTimeout(function(){
  if (location.hash) {
    $('html,body').animate({
      scrollTop: document.getElementById(location.hash.substring(1)).offsetTop - 86
    }, 500);
  }
}, 1000);
