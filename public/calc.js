'use strict';

const calc = {
    createNumberNat(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    },
    createNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default calc;
export let createNumber = calc.createNumber;
export let createNumberNat = calc.createNumberNat;