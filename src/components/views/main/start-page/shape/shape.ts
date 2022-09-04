import { Control } from '../../../control';
import { Person } from '../../../../types';
import './shape.scss';

export class Shape extends Control {
    constructor(parentNode: HTMLElement, person: Person, type: string) {
        super(parentNode, 'div', `${type}`);
        const fig = new Control(this.node, 'figure', `${type}__shape`);
        const img = new Control<HTMLImageElement>(fig.node, 'img', `${type}__img`);
        img.node.src = `./img/${person.imgPath}.jpg`;
        img.node.alt = `${person.name} photo`;
        new Control(fig.node, 'figcaption', `${type}__caption`, `${person.role}`);
        const text = new Control(this.node, 'div', `${type}__text`);
        const link = new Control<HTMLAnchorElement>(text.node, 'a');
        link.node.href = `${person.link}`;
        new Control<HTMLImageElement>(link.node, 'h3', `${type}__header`, `${person.name}`);
        const icon = new Control<HTMLImageElement>(link.node, 'img', 'icon');
        icon.node.src = `./img/git-icon.png`;
        new Control(text.node, 'p', '', `${person.work}`);
    }
}
