'use strict';

let cBG, cMG, cFG, ctxBG, ctxMG, ctxFG;
let imgBG, imgMG, imgFG;
let imgW = 0,
    imgH = 0;
let scrollPos = 0,
    scrollSpeed = 3;


const render = {
    drawBG() {
        console.log(scrollPos);
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
        render.drawBG();


    },
    loadImages() {
        imgBG = document.createElement('img');
        imgBG.src = "img/bg.png";

        imgMG = document.createElement('img');
        imgMG.src = "img/mg.png";

        return Promise.all([
            new Promise(res => {
                //imgBG.addEventListener('load', () => )
            }),

        ])
    },
    resize() {
        let h = window.innerHeight;
        let w = window.innerWidth;
        cBG.width = w;
        cBG.height = h;
        cMG.width = w;
        cMG.height = h;


        imgW = imgBG.naturalWidth;
        imgH = imgBG.naturalHeight;
    },
    init() {
        cBG = document.querySelector('#backGround');
        ctxBG = cBG.getContext('2d');
        cMG = document.querySelector('#middleGround');
        ctxMG = cBG.getContext('2d');

        imgBG = document.querySelector('#imgBG');
        imgMG = document.querySelector('#imgMG');

        this.resize();
        setInterval(this.scroll, 30);
        /*
        loadImages().then(
            () => {
            }
        ).catch(
            console.log
        )
        */
    }
}

export default render;