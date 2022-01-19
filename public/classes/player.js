'use strict';

import Shot from './shot.js';

let c, ctx, img, cShots;

class Player {
    constructor(canvas, cShots, cCollide, url) {
        //console.log(canvas, url);
        // Position relativ zur Canvasbreite
        this.x = .5;
        this.y = .8;
        // Größe relativ zur Canvasbreite
        this.size = .1;
        this.drag = .2;

        this.isShooting = false;

        this.shots = [];
        this.cCollide = cCollide;

        c = canvas;
        ctx = c.getContext('2d');
        img = document.createElement('img');
        img.src = url;
        this.cShots = cShots;
        this.ctxShots = this.cShots.getContext('2d');

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

        if (
            this.isShooting &&
            (this.shots.length == 0 || Date.now() > this.shots[this.shots.length - 1].nextShotIn)
        ) {
            this.shots.push(new Shot(0, this.x, this.y, this.cShots, this.cCollide));
            //console.log(this.shots);
        }

        this.ctxShots.clearRect(0, 0, this.cShots.width, this.cShots.height);

        this.shots.map(shot => {
            shot.update();
            shot.draw();
        });

        this.shots = this.shots.filter(shot => !shot.killMe);

        // console.log(this.shots);
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