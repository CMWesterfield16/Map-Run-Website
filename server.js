var express = require('express');
var app = express();

app.use(express.static(__dirname));

var port = process.env.PORT;

app.listen(port, function() {
  console.log('listening on port ' + port);
});

//42168
