$(document).ready(function() {
  //ask the server for songs, and then draw them
  getSongs();

  // listen for sumbiot events and end new songs to the server
  $('form').on('submit', function(event){
    event.preventDefault();
//.serialize() is different serializeArray in that it returns raw stings like 'title=Dream&Artist=The%Cranberries'
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax ({
      type: 'POST',
      url: '/songs',
      data: formData,
      success: getSongs
    });
  });
});

function getSongs() {
  $.ajax ({
    type: 'GET',
    url:'/songs',
    success: function(songs){
      $('#songs').empty();
      songs.forEach(function(song){
        var $li = $('<li></li>');
        $li.append('<p>' + song.title + '</p>');
        $li.append('<p> by: ' + song.artist + '</p>');
        $li.append('<p> Date added: ' + song.date + '</p>');
        $('#songs').append($li);
      });
    }
  });
}
