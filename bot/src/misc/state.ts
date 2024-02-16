export interface IDefect {
    _id: string;
    roomNumber: number;
    description: string;
    status: boolean;
    reportedBy: IUser;
    createdAt: Date;
    closedAt?: Date;
    imageUrl: string;
}

interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}

const initialDefect: IDefect = {
    _id: '',
    roomNumber: 0,
    description: '',
    status: false,
    reportedBy: {
        telegramId: 0,
        name: '',
        surname: '',
        registeredAt: new Date(),
        role: '',
        access: false
    },
    createdAt: new Date(),
    closedAt: undefined,
    imageUrl: ''
};

let state = {
    defect: initialDefect
};

const getState = () => state;

const setState = (newState: { defect: IDefect }) => {
    state = { ...state, defect: { ...state.defect, ...newState.defect } };
};

export default {
    getState,
    setState
};
