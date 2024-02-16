export interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}