'use strict';

import dom from './dom.js';
import Environment from './environment.js';

// KLASSEN
import Player from './classes/player.js';



// VARIABLEN
// Canvas
let cBG, cMG, cFG, cPlayer, ctxBG, ctxMG, ctxFG, ctxPlayer;
let player, environment;
let mousePos = { x: 0, y: 0 };
// Interval-IDs
let timerIDPlay;


// DOM-MAPPING
const obererCanvas = document.querySelector('#player');


// FUNKTIONEN
const handleMouseMove = evt => {
    mousePos.x = evt.layerX / obererCanvas.offsetWidth;
    mousePos.y = evt.layerY / obererCanvas.offsetWidth;
    //console.log(evt.target);
}

const animate = () => {
    ctxBG.clearRect(0, 0, cBG.width, cBG.height);
    ctxMG.clearRect(0, 0, cMG.width, cMG.height);
    ctxFG.clearRect(0, 0, cFG.width, cFG.height);
    ctxPlayer.clearRect(0, 0, cPlayer.width, cPlayer.height);

    [environment, player].forEach(obj => obj.update(mousePos));
    [environment, player].forEach(obj => obj.draw());
}

const mapDOM = () => {
    cBG = document.querySelector('#backGround');
    cMG = document.querySelector('#middleGround');
    cFG = document.querySelector('#foreGround');
    cPlayer = document.querySelector('#player');

    ctxBG = cBG.getContext('2d');
    ctxMG = cMG.getContext('2d');
    ctxFG = cFG.getContext('2d');
    ctxPlayer = cPlayer.getContext('2d');
}

const init = () => {
    mapDOM();
    player = new Player(cPlayer, cShots, cMG, './img/player.png');
    environment = new Environment();
    //player.init
    // render.init();
    timerIDPlay = setInterval(animate, 30);
}

// EVENTLISTENER 
obererCanvas.addEventListener('mousemove', handleMouseMove);

init();