'use strict';

const createImage = url => {
    let img = document.createElement('img');
    img.src = url;
    return img;
}

const Types = [
    class {
        constructor(angle = Math.PI * 1.5) {
            this.speed = Math.random() * 1 + 5;
            this.angle = Math.PI * 1.5; // Senkrecht nach oben
            this.img = createImage('./img/shot.png');
            this.w = .02;
            this.h = .02;
            this.nextShotIn = Date.now() + 200;
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
    update() {
        let speed = this.speed / this.c.width
        // console.log(speed, this.y - speed);
        if (this.bgHitTest()) this.killMe = true;

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
    bgHitTest() {
        let imgShot = this.ctx.getImageData(
            this.x * this.c.width,
            this.y * this.c.width,
            3,3
        )
        let imgCollider = this.ctxCollider.getImageData(
            this.x * this.c.width,
            this.y * this.c.width,
            3,3
        )
        // console.log(imgShot.data.length);

        let hit = false;
       /* for (let i = 0; i < imgShot.data.length; i += 4) {
            if (imgShot.data[i] > 0) {
                console.log(imgShot.data[i], imgShot.data[i + 1], imgShot.data[i + 2]);
            }
        }
        */
    }
}

export default Shot;