import { Word } from '../types';

export class Model {
    private backendBaseURL: string;

    constructor(backendBaseURL = '') {
        this.backendBaseURL = backendBaseURL;
    }

    setBackendBaseURL(backendBaseURL: string) {
        this.backendBaseURL = backendBaseURL;
    }

    async getWords(group: number, page: number): Promise<Word[]> {
        const url = `${this.backendBaseURL}words?group=${group}&page=${page}`;
        const response = await fetch(url);
        const words = response.json();
        return words;
    }
}
