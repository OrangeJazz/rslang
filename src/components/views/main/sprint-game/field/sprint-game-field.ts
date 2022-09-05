import { Control } from '../../../control';
import { GameAnswer, SprintGameItem, Word } from '../../../../types';

import './sprint-game-field.scss';

export class SprintGameField extends Control {
    groupNumber: number;
    pageNumber: number | undefined;
    sprintGameItems: SprintGameItem[];
    gameContainer: Control;
    timer!: Control;
    answerButtons: Control<HTMLButtonElement>[];
    onChoise!: (word: Word, isCorrect: boolean) => void;

    constructor(parentNode: HTMLElement, group: number, page: number | undefined) {
        super(parentNode, 'main', 'main sprint-game-field');
        const container = new Control(this.node, 'div', 'container sprint-game-field__container');
        new Control(container.node, 'h2', 'sprint-game-field__heading', 'Игра "Спринт"');
        this.gameContainer = new Control(container.node, 'div', 'sprint-game-field__game-container');

        this.groupNumber = group;
        this.pageNumber = page;
        this.sprintGameItems = [];
        new Control(this.gameContainer.node, 'p', 'sprint-game-field__preloading', 'Слова загружаются...');
        this.answerButtons = [];
    }

    renderGameField(gameItem: SprintGameItem, timerValue: number): void {
        this.gameContainer.node.innerHTML = '';
        this.timer = new Control(this.gameContainer.node, 'p', 'sprint-game-field__timer', `${timerValue}`);
        this.setTimerValue(timerValue);
        new Control(this.gameContainer.node, 'p', 'sprint-game-field__question', gameItem.question.word);
        const buttons = new Control(this.gameContainer.node, 'div', 'sprint-game-field__buttons');

        this.answerButtons = [];
        gameItem.answers.forEach((answer) => {
            const button = new Control<HTMLButtonElement>(
                buttons.node,
                'button',
                'btn sprint-game-field__button',
                answer.word.wordTranslate
            );
            button.node.type = 'button';
            button.node.onclick = () => this.onChoise(gameItem.question, answer.isCorrect);
            this.answerButtons.push(button);
        });
    }

    setTimerValue(timeInSeconds: number): void {
        this.timer.node.innerText = `Осталось времени: ${timeInSeconds} с`;
    }

    renderGameResults(gameAnswers: GameAnswer[]): void {
        this.gameContainer.node.innerHTML = '';
        new Control(this.gameContainer.node, 'p', 'sprint-game-field__results-heading', 'Ваши результаты: ');
        const resultsCount = new Control(this.gameContainer.node, 'p', 'sprint-game-field__results-count');
        const results = new Control(this.gameContainer.node, 'div', 'sprint-game-field__results');

        let correctResultsCount = 0;
        gameAnswers.forEach((gameAnswer) => {
            const result = new Control(results.node, 'p', 'sprint-game-field__result', gameAnswer.word.wordTranslate);
            if (gameAnswer.isCorrect) {
                result.node.classList.add('sprint-game-field__result_correct');
                correctResultsCount += 1;
            } else {
                result.node.classList.add('sprint-game-field__result_not-correct');
            }
        });
        resultsCount.node.innerText = `${correctResultsCount} / ${gameAnswers.length}`;
    }
}
