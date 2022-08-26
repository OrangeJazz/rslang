import { Control } from '../../../control';
import { Model } from '../../../../models/model';
import './features.scss';
import { Card } from '../card/card';
// import '../card/card.scss';

export class Features extends Control {
    model: Model;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'features');
        this.model = new Model();
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'features__wrapper');
        new Control(wrapper.node, 'h2', '', 'Учиться с нами - здорово');
        const cardsContainer = new Control(wrapper.node, 'div', 'features__cards');
        for (let i = 0; i < this.model.features.length; i++) {
            new Card(cardsContainer.node, this.model.features[i], 'feature');
        }
    }
}
