// simple express server for serving data
"use strict";
const express = require('express');
const app     = express();

app.use(express.static('public'));

app.set('port', (process.env.PORT || 3000));
var server = app.listen(app.get('port'), () => console.log('app is running on port', app.get('port')));
