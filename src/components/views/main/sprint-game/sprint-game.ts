import { Control } from '../../control';
import { GameChoiseOption, SprintGameItem } from '../../../types';

export class SprintGame extends Control {
    gameContainer: Control;
    groupButtons!: Control<HTMLButtonElement>[];
    gameField!: Control;
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
                `Раздел ${i + 1}`
            );
            button.node.type = 'button';
            button.node.style.backgroundColor = `rgb(255, ${220 - i * 20}, ${220 - i * 20})`;
            button.node.onclick = () => this.onWordGroupSelect(i);
            this.groupButtons.push(button);
        }
    }

    renderGameField(gameItem: SprintGameItem): void {
        this.gameContainer.node.innerHTML = '';
        new Control(this.gameContainer.node, 'p', 'sprint-game__question', gameItem.question);
        const buttons = new Control(this.gameContainer.node, 'div', 'sprint-game__buttons');
        gameItem.choiseOptions.forEach((choiseOption) => {
            const button = new Control(buttons.node, 'button', 'sprint-game__button', choiseOption.value);
            button.node.onclick = () => this.onChoise(gameItem.question, choiseOption.isCorrect);
        });
    }

    renderGameResults(gameChoiseOptions: GameChoiseOption[]): void {
        this.gameContainer.node.innerHTML = '';
        gameChoiseOptions.forEach((gameChoiseOption) => {
            const result = `${gameChoiseOption.value} - ${gameChoiseOption.isCorrect}`;
            new Control(this.gameContainer.node, 'p', 'sprint-game__results', result);
        });
    }
}
