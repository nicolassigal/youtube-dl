var search = require('youtube-search');

var opts = {
 maxResults: 10,
 key: 'AIzaSyCnqAFM5z0dsC_gPE-DQeFrQe2PScejMMw'
};

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();
router.get('/', function(req, res) {
  search('deadmau5', opts, function(err, results) {
    if(err) return console.log(err);
    res.json(results);
   });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
