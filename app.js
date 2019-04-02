var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose');
var express  = require('express');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
const bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb+srv://Jammy:aobUjySlRq9spp9H@cluster0-hqaur.mongodb.net/test?retryWrites=true',
{
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// swaggerRouter configuration
var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development'
  };
  
// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
app.use(middleware.swaggerMetadata());

// Validate Swagger requests
app.use(middleware.swaggerValidator());

// Route validated requests to appropriate controller
app.use(middleware.swaggerRouter(options));

// Serve the Swagger documents and Swagger UI
app.use(middleware.swaggerUi());

});

app.use('/views/css', express.static('views/css'));
app.set('view engine', 'ejs');
app.get('/', function(request, response){
  response.render('index');
});

module.exports = app;