const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3000;
const prometheus = require('express-prom-bundle')

// This will create the /metrics endpoint for you and expose Node default
// metrics.
const metricsMiddleware = prometheus({
  includeMethod: true,
  includePath: true,
  promClient: { collectDefaultMetrics: {} }
})
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(metricsMiddleware);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // <-- change if not using index.html
});

app.listen(port);