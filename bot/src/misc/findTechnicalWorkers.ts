export interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    work_score: number;
    access: boolean;
}

export default {
    findTechnicalWorkers: (users: Array<IUser>) => {
        let res: Array<IUser> = [];
        for (const i of users) {
            if (i.role === 'Technical') {
                res.push(i);
            }
        }

        // @ts-ignore
        return res;
    }
}