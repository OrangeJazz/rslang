export interface Word {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
}

export interface Link {
    name: string;
    link: string;
}

export interface Person {
    name: string;
    link: string;
    role: string;
    imgPath: string;
    work: string;
}

export interface ICard {
    name: string;
    content: string;
    path: string;
    link: string;
}

export interface SprintGameItem {
    question: Word;
    answers: GameAnswer[];
}

export interface GameAnswer {
    value: string;
    isCorrect: boolean;
}
