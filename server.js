'use strict';

import fs from 'fs'
import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import browserify from 'browserify-middleware';
import routes from './app/routes';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

let PORT = process.env.PORT || 3000;

let conf = {
  common: {
    bundle: 'common.js',
    packages: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'history'
    ]
  }
}

app.get('/js/' + conf.common.bundle, browserify(conf.common.packages, {
  cache: true,
  precompile: true
}));

app.use('/js', browserify('./client', {
  external: conf.common.packages,
  transform: [
    ['babelify', {presets: ["es2015", "react", "stage-2"]}]
  ]
}));

app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('*', (req, res) => {
    res.status(404).send({ message : 'Access here is forbidden' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
});

let server = http.createServer(app);
server.listen(PORT);
