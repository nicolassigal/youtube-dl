var search = require('youtube-search');
var fyda = require('fyda');

var opts = {
 maxResults: 10,
 key: 'AIzaSyCnqAFM5z0dsC_gPE-DQeFrQe2PScejMMw'
};
var YD = new YoutubeMp3Downloader({
  "ffmpegPath": "/path/to/ffmpeg",        // Where is the FFmpeg binary located?
  "outputPath": "/downloads",    // Where should the downloaded and encoded files be stored?
  "youtubeVideoQuality": "highest",       // What video quality should be used?
  "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
  "progressTimeout": 2000                 // How long should be the interval of the progress reports
});
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/search/:query', function(req, res) {
  search(req.params.query, opts, function(err, results) {
    if(err) return console.log(err);
    res.json(results);
   });
});

router.get('/download/:id', function(req, res) {
  var uri = 'https://www.youtube.com/watch?v=' + req.params.id;
  fyda.downloadMp3(uri, '/server', 'developers.mp3');
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
