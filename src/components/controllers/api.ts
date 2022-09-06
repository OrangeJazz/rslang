import { User } from '../types';
import { BACKEND_BASE_URL } from './config';

export class Api {
    private readonly backendBaseURL: string;
    jwt: string | null;
    userId: string | null;

    constructor(backendBaseURL: string) {
        this.backendBaseURL = backendBaseURL;
        this.jwt = localStorage.getItem('jwt');
        this.userId = localStorage.getItem('userId');
    }

    async signUp({ email, password, name }: User): Promise<{ id: string; email: string; name: string }> {
        const res = await fetch(`${this.backendBaseURL}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status.toString());
    }

    async signIn({ email, password }: Omit<User, 'name'>): Promise<void> {
        const res = await fetch(`${this.backendBaseURL}signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            const { token, userId } = await res.json();
            this.jwt = token;
            this.userId = userId;
            localStorage.setItem('jwt', token);
            localStorage.setItem('userId', userId);
            return;
        }
        throw new Error(res.status.toString());
    }

    async getUserInfo(): Promise<{ name: string; id: string; email: string }> {
        const res = await fetch(`${this.backendBaseURL}users/${this.userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status.toString());
    }

    async getUserStatistic(): Promise<void> {
        const res = await fetch(`${this.backendBaseURL}users/${this.userId}/statistics`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            return res.json();
        }
        throw new Error(res.status.toString());
    }
}

export const api = new Api(BACKEND_BASE_URL);
