import { Model } from '../models/model';
import { Word } from '../types';

export class Audiogame {
    correctWords: Word[];
    uncorrectWords: Word[];
    // words: Word[];
    model: Model;

    constructor(model: Model) {
        this.model = model;
        this.correctWords = [];
        this.uncorrectWords = [];
        // this.words = this.shuffleWords(await this.getWords());
    }

    async getWords(): Promise<Word[]> {
        const group = sessionStorage.getItem('group') ? Number(sessionStorage.getItem('group')) : 0;
        const page = Math.floor(Math.random() * 20);
        const words = (await this.model.getWords(group, page)) as Word[];
        return words;
    }

    shuffleWords(words: Word[]): Word[] {
        const suffledWords = [...words];
        for (let i = suffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [suffledWords[i], suffledWords[j]] = [suffledWords[j], suffledWords[i]];
        }
        return suffledWords as Word[];
    }

    getWord(words: Word[]): Word {
        const word = words.pop() as Word;
        return word;
    }

    generateAnswers(words: Word[], correctAnswer: Word): Word[] {
        const answers: Word[] = [correctAnswer];
        while (answers.length < 4) {
            const i = Math.floor(Math.random() * words.length);
            const randomWord = words[i];
            answers.push(randomWord);
        }
        this.shuffleWords(answers);
        return answers;
    }
}
