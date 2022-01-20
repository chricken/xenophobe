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
        // Debugging only
        this.cFG = document.querySelector('#foreGround');
        this.ctxFG = this.cFG.getContext('2d');
    }
    update(shotData, mgData) {
        let speed = this.speed / this.c.width

        if (this.bgHitTest(shotData, mgData)) this.killMe = true;

        if (this.y - speed > 0) {
            this.y -= speed;
        } else {
            this.killMe = true;
        }
    }
    draw() {
        let w = this.w * this.c.width;
        let h = this.h * this.c.width;
        this.ctx.drawImage(
            this.img,
            (this.x * this.c.width) - (w / 2),
            (this.y * this.c.width) - (h / 2),
            this.c.width * this.w,
            this.c.width * this.h,
        )
    }
    bgHitTest(imgDataShot, imgDataCollider) {

        let x = ~~(this.x * this.c.width);
        let y = ~~(this.y * this.c.width);

        let hit = false;

        console.clear()
            // Um die Mitte herum auf Hit prüfen
        let radius = 3;
        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                let pxRed = (((y + i) * this.c.width) + (x + j)) * 4;
                if (
                    imgDataCollider.data[pxRed + 3] > 128
                ) {
                    hit = true;
                }
            }
        }

        return hit;
    }
}

export default Shot;