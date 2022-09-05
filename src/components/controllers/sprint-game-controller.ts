import { GameAnswer, SprintGameItem } from '../types';

import { Model } from '../models/model';

import { View } from '../views/view';
import { SprintGameField } from '../views/main/sprint-game/field/sprint-game-field';

const LAST_PAGE_NUMBER = 29;
const GAME_TIMER_VALUE = 60;

export class SprintGameController {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }

    async addItemsInGame(gameField: SprintGameField) {
        gameField.sprintGameItems = [
            ...(await this.getShuffledWords(gameField.groupNumber, gameField.pageNumber)),
            ...gameField.sprintGameItems,
        ];
    }

    async startGame(gameField: SprintGameField) {
        if (gameField.pageNumber === undefined) {
            gameField.pageNumber = LAST_PAGE_NUMBER;
        }
        gameField.sprintGameItems = await this.getShuffledWords(gameField.groupNumber, gameField.pageNumber);
        for (let i = 0; i < 3; i += 1) {
            if (gameField.pageNumber) {
                gameField.pageNumber -= 1;
                await this.addItemsInGame(gameField);
            }
        }

        const sprintGameItems = gameField.sprintGameItems;
        const sprintGameItem = sprintGameItems.pop() as SprintGameItem;
        const gameAnswers = [] as GameAnswer[];

        const handleArrowKeys = (event: KeyboardEvent) => {
            if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
                if (event.code === 'ArrowLeft') {
                    gameField.answerButtons[0].node.dispatchEvent(new Event('click'));
                } else {
                    gameField.answerButtons[1].node.dispatchEvent(new Event('click'));
                }
            }
        };

        let timerValueInSeconds = GAME_TIMER_VALUE;
        gameField.renderGameField(sprintGameItem, timerValueInSeconds);
        let timerID: number | undefined = undefined;

        const updateTimer = () => {
            timerValueInSeconds -= 1;
            gameField.setTimerValue(timerValueInSeconds);
            if (timerValueInSeconds === 0) {
                clearInterval(timerID);
                document.removeEventListener('keydown', handleArrowKeys);
                this.view.onSprintGameResult(gameAnswers);
            }
        };
        timerID = setInterval(updateTimer, 1000) as unknown as number;

        gameField.onChoise = (word, isCorrect) => {
            gameAnswers.push({ word, isCorrect });
            if (sprintGameItems.length === 0) {
                document.removeEventListener('keydown', handleArrowKeys);
                this.view.onSprintGameResult(gameAnswers);
            } else {
                const sprintGameItem = sprintGameItems.pop() as SprintGameItem;
                gameField.renderGameField(sprintGameItem, timerValueInSeconds);
            }
        };

        document.addEventListener('keydown', handleArrowKeys);
    }

    async getShuffledWords(group: number, page: number | undefined): Promise<SprintGameItem[]> {
        let pageNumber = page;
        if (pageNumber === undefined) {
            pageNumber = LAST_PAGE_NUMBER;
        }
        const words = await this.model.getWords(group, pageNumber);
        const sprintGameItems: SprintGameItem[] = words.map((word, i) => {
            const gameAnswers: GameAnswer[] = [];
            gameAnswers.push({
                word,
                isCorrect: true,
            });

            const otherWords = words.filter((_, j) => j !== i);
            const randomWordIndex = Math.floor(Math.random() * otherWords.length);
            const randomWord = otherWords[randomWordIndex];
            gameAnswers.push({
                word: randomWord,
                isCorrect: false,
            });

            return {
                question: word,
                answers: this.shuffleArray<GameAnswer>(gameAnswers),
            };
        });
        return this.shuffleArray<SprintGameItem>(sprintGameItems);
    }

    shuffleArray<T>(array: T[]): T[] {
        return [...array].sort(() => Math.random() - 0.5);
    }
}
