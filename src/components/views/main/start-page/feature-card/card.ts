import { Control } from '../../../control';
import { Card } from '../../../../models/model';
import './card.scss';

export class FeatureCard extends Control {
    constructor(parentNode: HTMLElement, card: Card) {
        super(parentNode, 'div', 'card');
        const imgContainer = new Control(this.node, 'div', 'card__img_container');
        const img = new Control<HTMLImageElement>(imgContainer.node, 'img', 'card__img');
        img.node.alt = 'picture';
        img.node.src = `./assets/img/${card.path}.png`;
        const contentContainer = new Control(this.node, 'div', 'card__content');
        new Control(contentContainer.node, 'h2', 'card__heading', `${card.name}`);
        new Control(contentContainer.node, 'p', 'card__text', `${card.content}`);
        const btn = new Control<HTMLAnchorElement>(contentContainer.node, 'a', 'btn btn_primary', 'Начинаем');
        btn.node.href = `${card.link}`;
    }
}
