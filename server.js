const restify = require('restify');
const project = require('./package.json');
const ticketingController = require('./controllers/ticketing.controller');


function AppServer() {
  // create server
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });
  
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.queryParser());

  // root
  this.server.get('/', (req, res) => {
    res.send({ success:true, data:'index', message:'This service is running properly', code:200 });
  });

  // book route
  this.server.get('/me', ticketingController.getHandler);
  this.server.post('/pengaduan', ticketingController.postHandler);
  this.server.put('/pengaduan/:id', ticketingController.putHandler);
  this.server.del('/pengaduan/:id', ticketingController.deleteHandler);
}

module.exports = AppServer;