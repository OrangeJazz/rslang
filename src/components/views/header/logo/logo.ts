import { Control } from '../../control';

import './logo.scss';
export class Logo extends Control {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div');
        const logoLink = new Control<HTMLAnchorElement>(this.node, 'a', 'logo');
        logoLink.node.href = '#';
        const logoImg = new Control<HTMLImageElement>(logoLink.node, 'img', 'logo__img');
        logoImg.node.src = '././assets/icons/icon.svg';
        logoImg.node.alt = 'logotype';
        new Control<HTMLElement>(logoLink.node, 'h3', 'logo__heading', 'LearnEng');
    }
}
