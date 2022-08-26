import { Control } from '../../../control';
import { ICard } from '../../../../types';
import './card.scss';

export class Card extends Control {
    constructor(parentNode: HTMLElement, card: ICard, type: string) {
        super(parentNode, 'div', `card-${type}`);
        const imgContainer = new Control(this.node, 'div', `card-${type}__img_container`);
        const img = new Control<HTMLImageElement>(imgContainer.node, 'img', `card-${type}__img`);
        img.node.alt = 'picture';
        img.node.src = `./assets/img/${card.path}.png`;
        const contentContainer = new Control(this.node, 'div', `card-${type}__content`);
        new Control(contentContainer.node, 'h2', `card-${type}__heading`, `${card.name}`);
        new Control(contentContainer.node, 'p', `card-${type}__text`, `${card.content}`);
        const btn = new Control<HTMLAnchorElement>(contentContainer.node, 'a', `btn card-${type}__btn`, 'Начинаем!');
        btn.node.href = `${card.link}`;
    }
}
