var Hapi = require('hapi'),
    postHandler = require('../lib/post-handler'),
    fs = require('fs');


var server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 7000
});

//Endpoint to test server setup
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    fs.readFile('./pages/index.html', function(err, html) {
      reply(html + "");
    });
  }
});


//Endpoint to recieve git post request
server.route({
  method: 'POST',
  path: '/validateCommitMessages',
  handler: postHandler
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('server running at: ' + server.info.uri);
});