import React from "react";

interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}

interface IDefect {
    roomNumber: number;
    description: string;
    status: boolean;
    reportedBy: IUser;
    createdAt: Date;
    closedAt?: Date;
    imageUrl: string;
}

interface DefectsProps {
    defects: IDefect;
}

const DefectsPage: React.FC<DefectsProps> = () => {

    return (
        <>
            <h3>Defects page</h3>
        </>
    )
}

export default DefectsPage;