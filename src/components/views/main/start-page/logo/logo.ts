import { Control } from '../../../control';

import './logo.scss';
export class HeroLogo extends Control {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'logo hero__logo');
        const logoImg = new Control<HTMLImageElement>(this.node, 'img', 'logo__img');
        logoImg.node.src = './assets/icons/icon.svg';
        logoImg.node.alt = 'logotype';
        new Control<HTMLElement>(this.node, 'h3', 'logo__heading', 'LearnEng');
    }
}
