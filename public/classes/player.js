'use strict';

import Shot from './shot.js';

let c, ctx, img, cShots;

class Player {
    constructor() {
        //console.log(canvas, url);
        // Position relativ zur Canvasbreite
        this.x = .5;
        this.y = .8;
        // Größe relativ zur Canvasbreite
        this.size = .1;
        this.drag = .2;

        this.isShooting = false;

        this.shots = [];

        c = document.querySelector('#cPlayer');
        ctx = c.getContext('2d');

        img = document.createElement('img');
        img.src = './img/player.png';

        this.cShots = document.querySelector('#cShots');
        this.ctxShots = this.cShots.getContext('2d');

        this.cMG = document.querySelector('#middleGround');
        this.ctxMG = this.cMG.getContext('2d');

        this.resize();
        window.addEventListener('resize', this.resize);

        // In der Callback-Funktion bezieht sich this auf das DOM-Element. Daher muss this extra übergeben werden
        c.addEventListener('mousedown', () => this.startShooting(this));
        c.addEventListener('mouseup', () => this.stopShooting(this));
    }
    startShooting(obj) {
        obj.isShooting = true;
    }
    stopShooting(obj) {
        obj.isShooting = false;
    }
    update(mousePos) {
        let diffX = mousePos.x - this.x;
        let diffY = mousePos.y - this.y;

        this.x += diffX * this.drag;
        this.y += diffY * this.drag;

        // Wenn die Maustaste gedrückt und die Wartezeit abgelaufen ist, einen neuen Schuss einhängen
        if (
            this.isShooting &&
            (this.shots.length == 0 || Date.now() > this.shots[this.shots.length - 1].nextShotIn)
        ) {
            this.shots.push(new Shot(0, this.x, this.y, this.cShots, this.cMG));
        }

        // Canvas für die Projektile leeren, um sie später zu füllen
        this.ctxShots.clearRect(0, 0, this.cShots.width, this.cShots.height);

        // Inhalte der Canvasse für die Hittests auslesen
        // Geschieht hier, damit dieser aufwendige Schritt möglichst selten ausgeführt werden muss
        let imgShot = this.ctxShots.getImageData(0, 0, c.width, c.height)
        let imgCollider = this.ctxMG.getImageData(0, 0, c.width, c.height)

        // Alle Projektile zuerst zeichnen, dann updaten
        // Diese Reihenfolge, weil das Projektil ja schon gezeichnet sein muss, um seine Pixels später lesen zu können
        this.shots.map(shot => {
            shot.draw();
            shot.update(imgShot, imgCollider);
        });

        // Als gelöscht markierte Projektile entfernen
        this.shots = this.shots.filter(shot => !shot.killMe);

    }
    draw() {
        // console.log(this.x, c.width, c.width * this.x);
        let size = c.width * this.size;
        ctx.drawImage(
            img,
            (c.width * this.x) - (size / 2),
            (c.height * this.y) - (size / 2),
            size,
            size
        )
    }
    resize() {
        let h = window.innerHeight;
        let w = window.innerWidth;
        let min = Math.min(w, h);
        c.width = min;
        c.height = min;
        this.cShots.width = min;
        this.cShots.height = min;
    }

}

export default Player;