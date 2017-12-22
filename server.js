var path = require('path');
var http = require('http');

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
var port = process.env.PORT || 5500;
app.set('port', port);
var router = express.Router();
var cors = require('cors')
app.use(cors());
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist/index.html'));});
var server = http.createServer(app);
server.listen(port, () => console.log('running'));
