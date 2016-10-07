var express = require('express');  //This will look inside our node modules and find the express modules.
                                  // It exports a function to initialize our application.

var bodyParser = require('body-parser'); // THis provides us a middleware function that converts the body into something
                                        // that we can use
var path = require('path');
var app = express(); //This then invokes that function

app.use(bodyParser.urlencoded({extended: true}));  //Take this function and use it anywhere, no matter what kind of request it is.

app.post('/', function(req, res) { //With a method of post, use the root path and print out whatever is in request.body
                                  // and then send an OK response!
  res.send('this is what is in the request.body: ', req.body);
  res.sendStatus(200);
});

app.get('/', function(req, res){                        //Listen for get requests. THe '/' designates the path which is 'root' in this case, or localhost:3000/.
      console.log('Received a request at', new Date()); // handler/middlware = function (req, res, next). In fact, any fucntion that takes a request and response and
      var filename = path.join(__dirname, 'public/views/index.html');   // does something with them is considers a handler/middleware
      console.log('filename: ', filename);                                                    //This whole chunck is known as a "route". It is a combo of the method type (get,put,post,delete)
      res.sendFile(filename);                                                    // plus the path ('/' in this example), and a handlers (function(req, res)).

});

app.get('/kittens', function(req, res) {
  console.log('Query params:', req.query);
  res.send('ROAR!');
});
var songs = [];
var repeat = false;
app.post('/songs', function(req, res){
    songs.forEach(function(song){
    //toLowerCase() and .trim() are used to ensure that the data is formatted the same.
    if (req.body.artist.toLowerCase().trim() == song.artist.toLowerCase().trim()
    && req.body.title.toLowerCase().trim() == song.title.toLowerCase().trim()) {
      repeat = true;
      res.sendStatus(400);
    }
    else if (req.body.artist.trim() == '' || req.body.title.trim() == '') {
        repeat = 'NA';
        res.sendStatus(400);
      }
    });

  if (repeat === false){
    var date = new Date;
    req.body.date = date.toDateString();
    songs.push(req.body);
    console.log('req.body: ', req.body);
    console.log('songs', songs);
    res.sendStatus(200);
  }

}); //end of post response

app.get('/songs', function(req, res){
  res.send(songs);
});

//middleware for serving static files -- static because the contents of the files don't change and its typically
//all the files needed to run our client side app.
app.use(express.static('public')); //This takes the name of the directory and makes everything inside that directory publicly avaialble.

app.listen(3000);
