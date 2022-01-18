'use strict';

const express = require('express');
let server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

const init = () => {
    server.listen(80, err => console.log(err || 'Server läuft'));

}

init();