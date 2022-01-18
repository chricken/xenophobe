'use strict';

const dom = {
    DOMElementAnlegen({
        inhalt = '',
        typ = 'div',
        eltern = ausgabe,
        klassen = [],
        attr = {},
        listeners = {},
        styles = {},
        amEnde = true,
    } = {}) {
        let neu = document.createElement(typ);
        if (inhalt) neu.innerHTML = inhalt;
        if (klassen.length) neu.className = klassen.join(' ');

        Object.entries(attr).forEach(el => neu.setAttribute(...el));
        Object.entries(listeners).forEach(el => neu.addEventListener(...el));
        Object.entries(styles).forEach(style => neu.style[style[0]] = style[1]);

        if (!amEnde && eltern.children.length) eltern.insertBefore(neu, eltern.children[0]);
        else eltern.append(neu);

        return neu;
    }

}

export default dom;