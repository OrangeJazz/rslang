import { Control } from '../../control';

import './logo.scss';
export class Logo extends Control {
    onStartPage!: () => void;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div');
        const logoLink = new Control<HTMLAnchorElement>(this.node, 'a', 'logo');
        logoLink.node.onclick = () => this.onStartPage();
        logoLink.node.href = '#';
        const logoImg = new Control<HTMLImageElement>(logoLink.node, 'img', 'logo__img');
        logoImg.node.src = './icons/icon.svg';
        logoImg.node.alt = 'logotype';
        new Control<HTMLElement>(logoLink.node, 'h3', 'logo__heading', 'LearnEng');
    }
}
