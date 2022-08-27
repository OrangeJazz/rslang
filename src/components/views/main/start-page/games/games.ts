import { Control } from '../../../control';
import { Card } from '../card/card';
import { Model } from '../../../../models/model';
import './games.scss';

export class Games extends Control {
    model: Model;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'section', 'games');
        this.model = new Model();
        this.node.id = 'games';
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'games__wrapper');
        new Control(wrapper.node, 'h2', 'games__heading', 'Выбери свою игру');
        const cardsContainer = new Control(wrapper.node, 'div', 'games__cards');
        for (let i = 0; i < this.model.games.games.length; i++) {
            const card = new Card(cardsContainer.node, this.model.games.games[i], 'game');
            if (i === 0) card.node.classList.add('card-game_left');
            if (i === this.model.games.games.length - 1) card.node.classList.add('card-game_right');
        }
    }
}
