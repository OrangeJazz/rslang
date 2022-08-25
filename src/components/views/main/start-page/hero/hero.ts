import { Control } from '../../../control';
import { HeroLogo } from '../logo/logo';
import './hero.scss';

export class Hero extends Control {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'section', 'hero');
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'hero__wrapper');
        const leftDiv = new Control(wrapper.node, 'div', 'hero__img-container_left');
        const leftImg = new Control<HTMLImageElement>(leftDiv.node, 'img', 'hero__img hero__img_left');
        leftImg.node.src = './assets/img/photo1.jpg';
        leftImg.node.alt = 'photo1';
        const centralDiv = new Control(wrapper.node, 'div', 'hero__content');
        new HeroLogo(centralDiv.node);
        new Control(centralDiv.node, 'h1', '', 'Учи английский играя');
        new Control(centralDiv.node, 'p', '', 'Образовательная онлайн-платформа изучения английского языка');
        const btn = new Control<HTMLAnchorElement>(centralDiv.node, 'a', 'btn btn_secondary btn_animated', 'Начать');
        btn.node.href = '#';
        const rightDiv = new Control(wrapper.node, 'div', 'hero__img-container_right');
        const rightImg = new Control<HTMLImageElement>(rightDiv.node, 'img', 'hero__img hero__img_right');
        rightImg.node.src = './assets/img/photo2.jpg';
        rightImg.node.alt = 'photo2';
    }
}
