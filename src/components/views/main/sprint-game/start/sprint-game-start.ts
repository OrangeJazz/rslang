import { Control } from '../../../control';

import './sprint-game-start.scss';

export class SprintGameStart extends Control {
    onLevelChoise!: (groupNumber: number) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main sprint-game-start');
        const container = new Control(this.node, 'div', 'container sprint-game-start__container');

        new Control(container.node, 'h2', 'sprint-game-start__heading', 'Игра "Спринт"');

        const img = new Control<HTMLImageElement>(container.node, 'img', 'sprint-game-start__img');
        img.node.alt = 'спринт';
        img.node.src = './img/sprint.png';

        new Control(container.node, 'h3', 'sprint-game-start__choise-heading', 'Выберите уровень сложности');

        const select = new Control<HTMLSelectElement>(container.node, 'select', 'sprint-game-start__select');
        const levels = [
            'A1 - Elementary',
            'A2 - Pre-Intermediate',
            'B1 - Intermediate',
            'B2 - Upper-Intermediate',
            'C1 - Advanced',
            'C2 - Proficiency',
        ];
        levels.forEach((level) => {
            const option = new Control<HTMLOptionElement>(select.node, 'option', '', level.toString());
            option.node.value = level.toString();
        });

        const button = new Control<HTMLButtonElement>(
            container.node,
            'button',
            'btn sprint-game-start__start-button',
            'Начать'
        );
        button.node.type = 'button';
        button.node.onclick = () => this.onLevelChoise(select.node.selectedIndex);
    }
}
