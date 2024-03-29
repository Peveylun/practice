export interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}

export default {
    findRepairmanWorkers: (users: Array<IUser>) => {
        let res: Array<IUser> = [];
        for (const i of users) {
            if (i.role === 'Repairman') {
                res.push(i);
            }
        }

        return res;
    }
}