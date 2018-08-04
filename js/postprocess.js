$(document).ready(function() {
  $("h2").each(function(i) {
    var heading = $(this);
    var headingtext = heading.text().toLowerCase().trim().replace(/[\.,-\/#!?$%\^&\*;:{}=\-_`~()]/g,"").replace(/[ ]/g,"-");
    heading.attr("id",headingtext );
    heading.prepend( "<a href='#" + headingtext + "' class='hash'>&#35;</a>" );
  });
  $("img").each(function(i) {
    var image = $(this);
    var imageSrc = $(this).attr('src');
    image.wrap( "<a href='" + imageSrc + "'></a>" );
  });
  $(".hash").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top-86},500);
    window.history.pushState(null, null, aid);
  });
  setTimeout(loadHash,1000);
});
function loadHash() {
  if (location.hash) {
    var aid = location.hash;
    $('html,body').animate({scrollTop: $(aid).offset().top-86},500);
  }
}
