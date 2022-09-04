import { Control } from '../../control';
import { GameChoiseOption, SprintGameItem } from '../../../types';

import './sprint-game.scss';

export class SprintGame extends Control {
    gameContainer: Control;
    groupButtons!: Control<HTMLButtonElement>[];
    gameField!: Control;
    timer!: Control;
    onWordGroupSelect!: (groupNumber: number) => void;
    onChoise!: (word: string, isCorrect: boolean) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'main', 'main sprint-game');
        const container = new Control(this.node, 'div', 'container sprint-game__container');
        new Control(container.node, 'h2', 'sprint-game__heading', 'Игра "Спринт"');

        this.gameContainer = new Control(container.node, 'div', 'sprint-game__game-container');
        this.renderGroupButtons(this.gameContainer.node);
    }

    renderGroupButtons(parentNode: HTMLElement): void {
        new Control(parentNode, 'p', 'sprint-game__group-choise', 'Выберите сложность');
        const buttons = new Control(parentNode, 'div', 'sprint-game__group-buttons');
        this.groupButtons = [];

        for (let i = 0; i < 6; i += 1) {
            const button = new Control<HTMLButtonElement>(
                buttons.node,
                'button',
                'sprint-game__group-button',
                `${i + 1}`
            );
            button.node.type = 'button';
            button.node.style.backgroundColor = `rgb(255, ${220 - i * 20}, ${220 - i * 20})`;
            button.node.onclick = () => this.onWordGroupSelect(i);
            this.groupButtons.push(button);
        }
    }

    renderGameField(gameItem: SprintGameItem, timerValue: number): void {
        this.gameContainer.node.innerHTML = '';
        this.timer = new Control(this.gameContainer.node, 'p', 'sprint-game__timer', `${timerValue}`);
        new Control(this.gameContainer.node, 'p', 'sprint-game__question', gameItem.question);
        const buttons = new Control(this.gameContainer.node, 'div', 'sprint-game__buttons');
        gameItem.choiseOptions.forEach((choiseOption) => {
            const button = new Control(buttons.node, 'button', 'sprint-game__button', choiseOption.value);
            button.node.onclick = () => this.onChoise(gameItem.question, choiseOption.isCorrect);
        });
    }

    renderGameResults(gameChoiseOptions: GameChoiseOption[]): void {
        this.gameContainer.node.innerHTML = '';
        new Control(this.gameContainer.node, 'p', 'sprint-game__results-heading', 'Ваши результаты: ');
        const resultsCount = new Control(this.gameContainer.node, 'p', 'sprint-game__results-count');
        const results = new Control(this.gameContainer.node, 'div', 'sprint-game__results');

        let correctResultsCount = 0;
        gameChoiseOptions.forEach((gameChoiseOption) => {
            const result = new Control(results.node, 'p', 'sprint-game__result', gameChoiseOption.value);
            if (gameChoiseOption.isCorrect) {
                result.node.classList.add('sprint-game__result_correct');
                correctResultsCount += 1;
            } else {
                result.node.classList.add('sprint-game__result_not-correct');
            }
        });
        resultsCount.node.innerText = `${correctResultsCount} / ${gameChoiseOptions.length}`;
    }
}
