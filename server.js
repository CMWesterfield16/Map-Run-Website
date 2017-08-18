var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.listen(42168, function() {
  console.log('listening on port 3000');
});
