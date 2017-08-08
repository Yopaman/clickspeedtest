var hasStarted = false,
    nbrClicks = 0,
    nbrSecondes = 10,
    timer;

function reset() {
  clearInterval(timer);
  hasStarted = false;
  nbrClicks = 0;
  nbrSecondes = $('#nbrSecondesSet').val();
  $('#nbrSecondes').text(nbrSecondes.toString());
  $('#nbrClicks').text(nbrClicks.toString());
  $('#nbrSecondesText').hide();
}

$('#nbrSecondesSet').blur(function() {
  if ($('#nbrSecondesSet').val() <= 0) {
    $('#nbrSecondesSet').val(1);
  }
})

$('#nbrSecondes').text(nbrSecondes.toString());

$('#clickzone').click(function() {
  if (hasStarted === false) {
    nbrSecondes = $('#nbrSecondesSet').val();
    $('#nbrSecondes').text(nbrSecondes.toString());
    $('#nbrSecondesText').show();
    nbrClicks++;
    $('#nbrClicks').text(nbrClicks.toString());
    hasStarted = true;
    timer = setInterval(function() {
      nbrSecondes--;
      $('#nbrSecondes').text(nbrSecondes.toString());
      if (nbrSecondes <= 0) {
        var cps = nbrClicks / $('#nbrSecondesSet').val();
        $('#overlay').fadeIn('fast');
        reset();
        $('#cps').text(cps.toString());
        $('.twitter-share-button').attr('href', "https://twitter.com/intent/tweet?text=J'ai%20fait%20" + cps + "%20clics/secondes%20sur%20https://yopaman.fr/clickspeedtest");
      }
    }, 1000);
  } else {
    nbrClicks++;
    $('#nbrClicks').text(nbrClicks.toString());
  }
});

$('.endReset').click(function() {
  $('#overlay').fadeOut('fast');
});

$('#reset').click(function() {
  reset();
});

$('.twitter-share-button').click(function(event) {
    event.preventDefault();
    window.open($(this).attr("href"), "popupWindow", "width=500,height=300,scrollbars=no");
});
