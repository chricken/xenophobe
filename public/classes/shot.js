'use strict';

const createImage = url => {
    let img = document.createElement('img');
    img.src = url;
    return img;
}

const Types = [
    class {
        constructor(angle = Math.PI * 1.5) {
            this.speed = Math.random() * 1 + 8;
            this.angle = Math.PI * 1.5; // Senkrecht nach oben
            this.img = createImage('./img/shot.png');
            this.w = .03;
            this.h = .03;
            this.nextShotIn = Date.now() + 100;
            this.killMe = false;
        }
    }
]

class Shot {
    constructor(type, x, y, c, cCollide, angle) {
        Object.assign(this, new Types[type](angle));
        this.x = x;
        this.y = y;
        this.c = c;
        this.ctx = c.getContext('2d');
        this.cCollide = cCollide;
        this.ctxCollider = cCollide.getContext('2d');
    }
    update(shotData, mgData) {
        let speed = this.speed / this.c.width

        if (this.bgHitTest(shotData.data, mgData.data)) this.killMe = true;

        if (this.y - speed > .1) {
            this.y -= speed;
        } else {
            this.killMe = true;
        }
    }
    draw() {
        this.ctx.drawImage(
            this.img,
            this.x * this.c.width,
            this.y * this.c.width,
            this.c.width * this.w,
            this.c.width * this.h,
        )
    }
    bgHitTest(imgDataShot, imgDataCollider) {

        let x = ~~(this.x * this.c.width);
        let y = ~~(this.y * this.c.width);

        let hit = false;

        if (imgDataCollider[((y * this.c.width + x) * 4) + 3] > 128) {
            hit = true;
        }
        //console.log();

        return hit;
    }
}

export default Shot;