import { Model } from '../models/model';
import { Word } from '../types';

export class Audiogame {
    correctWords: Word[];
    wrongAnswers: Set<Word>;
    rightAnswers: Set<Word>;
    words: Word[];
    model: Model;
    restWords: Word[];

    constructor(model: Model) {
        this.model = model;
        this.correctWords = [];
        this.wrongAnswers = new Set();
        this.rightAnswers = new Set();
        this.words = [];
        this.restWords = [];
        this.getShuffledWords();
    }

    async getWords(): Promise<Word[]> {
        const group = sessionStorage.getItem('group') ? Number(sessionStorage.getItem('group')) : 0;
        const page = sessionStorage.getItem('page')
            ? Number(sessionStorage.getItem('page'))
            : Math.floor(Math.random() * 20);
        const words = (await this.model.getWords(group, page)) as Word[];
        return words;
    }

    shuffleWords(words: Word[]): Word[] {
        const shuffledWords = [...words];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        return shuffledWords as Word[];
    }

    async getShuffledWords(): Promise<void> {
        const words = await this.getWords();
        this.words = this.shuffleWords(words);
        this.restWords = [...this.words];
    }

    getWord(): Word {
        const word = this.restWords.pop() as Word;
        if (this.correctWords) this.correctWords.push(word);
        else this.correctWords = [word];
        return word;
    }

    checkAnswer(answer: Word): boolean {
        const arrLength = this.correctWords.length;
        const correctAnswer = this.correctWords[arrLength - 1];
        return answer === correctAnswer;
    }

    generateAnswers(correctAnswer: Word): Word[] {
        const answers: Word[] = [correctAnswer];
        while (answers.length < 4) {
            const words = this.words as Word[];
            const i = Math.floor(Math.random() * words.length);
            const randomWord = words[i];
            if (randomWord === correctAnswer) continue;
            answers.push(randomWord);
        }
        const shuffleAnswers = this.shuffleWords(answers);
        return shuffleAnswers;
    }

    addWrongAnswer(word: Word): void {
        this.wrongAnswers.add(word);
    }

    addRightAnswer(word: Word): void {
        this.rightAnswers.add(word);
    }

    // getAnswer() => {

    // }

    async start(): Promise<void> {
        await this.getShuffledWords();
    }
}
