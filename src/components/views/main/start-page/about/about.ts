import { Control } from '../../../control';
import './about.scss';

export class About extends Control {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'section', 'about');
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'about__wrapper');
        const item1 = new Control(wrapper.node, 'div', 'about__item');
        new Control(item1.node, 'h2', 'about__heading', '3 500+');
        new Control(item1.node, 'p', 'about__text', 'слов на английском языке в нашем словаре');
        const item2 = new Control(wrapper.node, 'div', 'about__item');
        new Control(item2.node, 'h2', 'about__heading', '6');
        new Control(item2.node, 'p', 'about__text', 'уровней сложности');
        const item3 = new Control(wrapper.node, 'div', 'about__item');
        new Control(item3.node, 'h2', 'about__heading', '2');
        new Control(item3.node, 'p', 'about__text', 'увлекательные мини-игры');
    }
}
