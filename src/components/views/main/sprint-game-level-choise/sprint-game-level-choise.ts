import { Control } from '../../control';

import './sprint-game-level-choise.scss';

export class SprintGameLevelChoise extends Control {
    onLevelChoise!: (groupNumber: number) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main sprint-game-level-choise');
        const container = new Control(this.node, 'div', 'container sprint-game-level-choise__container');

        new Control(container.node, 'h2', 'sprint-game-level-choise__heading', 'Игра "Спринт"');

        const img = new Control<HTMLImageElement>(container.node, 'img', 'sprint-game-level-choise__img');
        img.node.alt = 'спринт';
        img.node.src = './img/sprint.png';

        new Control(container.node, 'h3', 'sprint-game-level-choise__choise-heading', 'Выберите уровень сложности');

        const select = new Control<HTMLSelectElement>(container.node, 'select', 'sprint-game-level-choise__select');
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
            'btn sprint-game-level-choise__start-button',
            'Начать'
        );
        button.node.type = 'button';
        button.node.onclick = () => this.onLevelChoise(select.node.selectedIndex);
    }
}
