import { GameChoiseOption, SprintGameItem, Word } from '../types';

export class Model {
    private backendBaseURL: string;

    constructor(backendBaseURL = '') {
        this.backendBaseURL = backendBaseURL;
    }

    setBackendBaseURL(backendBaseURL: string) {
        this.backendBaseURL = backendBaseURL;
    }

    async getWord(id: number): Promise<Word> {
        const url = `${this.backendBaseURL}words/${id}`;
        const response = await fetch(url);
        let word: Word = await response.json();
        word = this.addBaseURLToImageAndAudio(word);
        return word;
    }

    async getWords(group: number, page: number): Promise<Word[]> {
        const url = `${this.backendBaseURL}words?group=${group}&page=${page}`;
        const response = await fetch(url);
        let words: Word[] = await response.json();
        words = words.map((word) => this.addBaseURLToImageAndAudio(word));
        return words;
    }

    addBaseURLToImageAndAudio(word: Word): Word {
        const newWord = { ...word };
        const fieldsToChange: Array<keyof Word> = ['image', 'audio', 'audioMeaning', 'audioExample'];
        fieldsToChange.forEach((field) => {
            (newWord[field] as string) = `${this.backendBaseURL}${word[field]}`;
        });
        return newWord;
    }

    async getWordsForSprintGame(group: number): Promise<SprintGameItem[]> {
        const words = (await this.getWords(group, 0)).slice(0, 10);
        const sprintGameItems: SprintGameItem[] = words.map((word, i) => {
            const choiseOptions: GameChoiseOption[] = [];
            choiseOptions.push({
                value: word.wordTranslate,
                isCorrect: true,
            });

            const otherWords = words.filter((_, j) => j !== i);
            const randomWordIndex = Math.floor(Math.random() * otherWords.length);
            const randomWord = otherWords[randomWordIndex];
            choiseOptions.push({
                value: randomWord.wordTranslate,
                isCorrect: false,
            });

            return {
                question: word.word,
                choiseOptions: shuffleArray<GameChoiseOption>(choiseOptions),
            };
        });
        return shuffleArray<SprintGameItem>(sprintGameItems);
    }
}

function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}
