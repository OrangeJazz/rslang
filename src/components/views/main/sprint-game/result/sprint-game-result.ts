import { Control } from '../../../control';
import { GameAnswer } from '../../../../types';

import './sprint-game-result.scss';

export class SprintGameResult extends Control {
    onRegister!: () => void;

    constructor(parentNode: HTMLElement, gameAnswers: GameAnswer[]) {
        super(parentNode, 'main', 'main sprint-game-result');
        const container = new Control(this.node, 'div', 'container sprint-game-result__container');
        new Control(container.node, 'h2', 'sprint-game-result__heading', 'Игра "Спринт"');
        const gameContainer = new Control(container.node, 'div', 'sprint-game-result__game-container');

        new Control(gameContainer.node, 'p', 'sprint-game-result__results-heading', 'Ваш результат: ');
        const resultsCount = new Control(gameContainer.node, 'p', 'sprint-game-result__results-count');
        const results = new Control(gameContainer.node, 'div', 'sprint-game-result__results');
        new Control<HTMLHRElement>(results.node, 'hr', 'sprint-game-result__hr');
        new Control(results.node, 'p', 'sprint-game-result__result', 'Угадываемое слово - правильный перевод');
        new Control<HTMLHRElement>(results.node, 'hr', 'sprint-game-result__hr');

        let correctResultsCount = 0;
        gameAnswers.forEach((gameAnswer) => {
            const resultText = `${gameAnswer.word.word} - ${gameAnswer.word.wordTranslate}`;
            const result = new Control(results.node, 'p', 'sprint-game-result__result', resultText);
            if (gameAnswer.isCorrect) {
                result.node.classList.add('sprint-game-result__result_correct');
                correctResultsCount += 1;
            } else {
                result.node.classList.add('sprint-game-result__result_not-correct');
            }
        });
        resultsCount.node.innerText = `${correctResultsCount} правильных ответов из ${gameAnswers.length}`;
    }
}
