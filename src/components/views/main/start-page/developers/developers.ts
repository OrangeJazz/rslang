import { Control } from '../../../control';
import { Model } from '../../../../models/model';
import { Shape } from '../shape/shape';
import './developers.scss';

export class Developers extends Control {
    model: Model;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'section', 'developers');
        this.model = new Model();
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'developers__wrapper');
        new Control(wrapper.node, 'h2', '', 'Разработчики');
        const content = new Control(wrapper.node, 'div', 'developers__content');
        for (let i = 0; i < this.model.developers.devs.length; i++) {
            new Shape(content.node, this.model.developers.devs[i], 'developer');
        }
    }
}
