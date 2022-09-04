import { Control } from '../../control';
import { GameAnswer, SprintGameItem } from '../../../types';

import './sprint-game.scss';

export class SprintGame extends Control {
    sprintGameItems: SprintGameItem[];
    gameContainer: Control;
    gameField!: Control;
    timer!: Control;
    onChoise!: (word: string, isCorrect: boolean) => void;

    constructor(parentNode: HTMLElement, sprintGameItems: SprintGameItem[]) {
        super(parentNode, 'main', 'main sprint-game');
        const container = new Control(this.node, 'div', 'container sprint-game__container');
        new Control(container.node, 'h2', 'sprint-game__heading', 'Игра "Спринт"');
        this.gameContainer = new Control(container.node, 'div', 'sprint-game__game-container');

        this.sprintGameItems = sprintGameItems;
    }

    renderGameField(gameItem: SprintGameItem, timerValue: number): void {
        this.gameContainer.node.innerHTML = '';
        this.timer = new Control(this.gameContainer.node, 'p', 'sprint-game__timer', `${timerValue}`);
        new Control(this.gameContainer.node, 'p', 'sprint-game__question', gameItem.question.word);
        const buttons = new Control(this.gameContainer.node, 'div', 'sprint-game__buttons');
        gameItem.answers.forEach((answer) => {
            const button = new Control(buttons.node, 'button', 'sprint-game__button', answer.value);
            button.node.onclick = () => this.onChoise(gameItem.question.word, answer.isCorrect);
        });
    }

    renderGameResults(gameAnswers: GameAnswer[]): void {
        this.gameContainer.node.innerHTML = '';
        new Control(this.gameContainer.node, 'p', 'sprint-game__results-heading', 'Ваши результаты: ');
        const resultsCount = new Control(this.gameContainer.node, 'p', 'sprint-game__results-count');
        const results = new Control(this.gameContainer.node, 'div', 'sprint-game__results');

        let correctResultsCount = 0;
        gameAnswers.forEach((gameAnswers) => {
            const result = new Control(results.node, 'p', 'sprint-game__result', gameAnswers.value);
            if (gameAnswers.isCorrect) {
                result.node.classList.add('sprint-game__result_correct');
                correctResultsCount += 1;
            } else {
                result.node.classList.add('sprint-game__result_not-correct');
            }
        });
        resultsCount.node.innerText = `${correctResultsCount} / ${gameAnswers.length}`;
    }
}
