var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/status', (req, res) => {
  res.status(200);
  res.send({ status: 200, message: 'Online' });
});

app.listen(port, () => {
  console.log('App running at:', port);
});

module.exports = app;
