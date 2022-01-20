'use strict';

class Environment {
    constructor() {
        this.imgW = 0;
        this.imgH = 0;
        this.scrollPos = 0;
        this.scrollSpeed = 3;

        this.cBG = document.querySelector('#backGround');
        this.ctxBG = this.cBG.getContext('2d');
        this.cMG = document.querySelector('#middleGround');
        this.ctxMG = this.cMG.getContext('2d');
        this.cFG = document.querySelector('#foreGround');
        this.ctxFG = this.cFG.getContext('2d');

        window.addEventListener('resize', this.resize);

        this.loadImages().then(
            erg => {
                this.resize();
            }
        ).catch(
            console.log
        )
    }
    resize() {
        let h = window.innerHeight;
        let w = window.innerWidth;
        let min = Math.min(w, h);
        this.cBG.width = min;
        this.cBG.height = min;
        this.cMG.width = min;
        this.cMG.height = min;
        this.cFG.width = min;
        this.cFG.height = min;

        this.imgW = this.imgBG.naturalWidth;
        this.imgH = this.imgBG.naturalHeight;
    }
    loadImages() {
        this.imgBG = document.createElement('img');
        this.imgBG.src = "img/bg.png";

        this.imgMG = document.createElement('img');
        this.imgMG.src = "img/mg.png";

        this.imgFG = document.createElement('img');
        this.imgFG.src = "img/fg.png";

        // Funktion, die vom Eventlistener wieder entfernt werden kann, da Promises nur einmal aufgerufen werden können.
        // https://stackoverflow.com/questions/35718645/resolving-a-promise-with-eventlistener
        function loadingDone(resolve) {
            this.removeEventListener('load', loadingDone);
            resolve(this)
        }

        // Ein Sammelpromise, um auf alle Bilder zu reagieren
        return Promise.all([
            new Promise(resolve => {
                this.imgBG.addEventListener('load', function() {
                    loadingDone.call(this, resolve);
                }, false);
            }),
            new Promise(resolve => {
                this.imgMG.addEventListener('load', function() {
                    loadingDone.call(this, resolve);
                }, false);
            }),
            new Promise(resolve => {
                this.imgFG.addEventListener('load', function() {
                    loadingDone.call(this, resolve);
                }, false);
            })
        ])
    }
    update(mousePos) {
        this.scrollPos += this.scrollSpeed;
    }
    draw() {
        let relH = Math.floor(this.imgW / this.cBG.width * this.cBG.height);

        this.ctxBG.drawImage(
            this.imgBG,
            0, this.imgH - relH - (this.scrollPos * .5), this.imgW, relH,
            0, 0, this.cBG.width, this.cBG.height
        )
        this.ctxMG.drawImage(
            this.imgMG,
            0, this.imgH - relH - this.scrollPos, this.imgW, relH,
            0, 0, this.cBG.width, this.cBG.height
        )
        this.ctxFG.drawImage(
            this.imgFG,
            0, this.imgH - relH - (this.scrollPos * 1.5), this.imgW, relH,
            0, 0, this.cFG.width, this.cFG.height
        )
    }
}

export default Environment;