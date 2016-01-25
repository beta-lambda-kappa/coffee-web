'use strict';

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './app/routes';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

let PORT = process.env.PORT || 3000;

app.use('/api', routes);

app.get('*', (req, res) => {
    res.status(404).send({ message : 'Access here is forbidden' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
});

let server = http.createServer(app);
server.listen(PORT);
