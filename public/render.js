'use strict';

let cBG, cMG, cFG, cPlayer, ctxBG, ctxMG, ctxFG, ctxPlayer;
let imgBG, imgMG, imgFG, imgPlayer;
let imgW = 0,
    imgH = 0;
let scrollPos = 0,
    scrollSpeed = 3;

let player = {
    x: .5,
    y: .8,
    render() {
        ctxPlayer.clearRect(0, 0, cPlayer.width, cPlayer.height);

        ctxPlayer.drawImage(
            imgPlayer,
            cPlayer.width * player.x,
            cPlayer.height * player.y,
            100,
            100
        )
    }
}


const render = {
    drawWorld() {
        //console.log(scrollPos / imgH);
        let relH = Math.floor(imgW / cBG.width * cBG.height);
        ctxBG.drawImage(
            imgBG,
            0, imgH - relH - (scrollPos / 2), imgW, relH,
            0, 0, cBG.width, cBG.height
        )
        ctxMG.drawImage(
            imgMG,
            0, imgH - relH - scrollPos, imgW, relH,
            0, 0, cBG.width, cBG.height
        )
    },
    scroll() {
        scrollPos += scrollSpeed;
        render.drawWorld();
        player.render();
    },
    loadImages() {
        imgBG = document.createElement('img');
        imgBG.src = "img/bg.png";

        imgMG = document.createElement('img');
        imgMG.src = "img/mg.png";

        imgPlayer = document.createElement('img');
        imgPlayer.src = "img/player.png";

        // Funktion, die vom Eventlistener wieder entfernt werden kann, da Promises nur einmal aufgerufen werden können.
        // https://stackoverflow.com/questions/35718645/resolving-a-promise-with-eventlistener
        function loadingDone(resolve) {
            this.removeEventListener('load', loadingDone);
            resolve(this)
        }

        // Ein Sammelpromise, um auf alle Bilder zu reagieren
        return Promise.all([
            new Promise(resolve => {
                imgBG.addEventListener('load', function() {
                    loadingDone.call(this, resolve);
                }, false);
            }),
            new Promise(resolve => {
                imgMG.addEventListener('load', function() {
                    loadingDone.call(this, resolve);
                }, false);
            }),
            new Promise(resolve => {
                imgPlayer.addEventListener('load', function() {
                    loadingDone.call(this, resolve);
                }, false);
            })
        ])
    },
    resize() {
        let h = window.innerHeight;
        let w = window.innerWidth;
        let min = Math.min(w, h);
        cBG.width = min;
        cBG.height = min;
        cMG.width = min;
        cMG.height = min;
        cPlayer.width = min;
        cPlayer.height = min;

        imgW = imgBG.naturalWidth;
        imgH = imgBG.naturalHeight;
    },
    init() {
        cBG = document.querySelector('#backGround');
        ctxBG = cBG.getContext('2d');
        cMG = document.querySelector('#middleGround');
        ctxMG = cBG.getContext('2d');
        cPlayer = document.querySelector('#player');
        ctxPlayer = cPlayer.getContext('2d');

        imgBG = document.querySelector('#imgBG');
        imgMG = document.querySelector('#imgMG');

        window.addEventListener('resize', this.resize);

        this.loadImages().then(
            erg => {
                this.resize();
                setInterval(this.scroll, 30);
                // console.log(erg);
            }
        ).catch(
            console.log
        )

    }
}

export default render;