import {IUser} from "./user.ts";

interface IDefect {
    _id: string;
    roomNumber: number;
    description: string;
    status: boolean;
    reportedBy: IUser;
    createdAt: Date;
    closedAt?: Date;
    imageUrl: string;
}

export default IDefect;