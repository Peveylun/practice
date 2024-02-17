import React, { useEffect, useState } from "react";
import axios from "axios";
import DefectList from "./defectList.tsx";

interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}

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

const DefectsPage = () => {
    const [defects, setDefects] = useState<IDefect[]>([]);
    const [filteredDefects, setFilteredDefects] = useState<IDefect[]>([]);
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchDefects = async () => {
            const res = await axios.get('http://localhost:8080/api/defects');
            setDefects(res.data);
        };

        fetchDefects().catch(e => console.log(e));
    }, []);

    useEffect(() => {
        if (statusFilter !== null) {
            const filtered = defects.filter(defect => defect.status === statusFilter);
            setFilteredDefects(filtered);
        } else {
            setFilteredDefects(defects);
        }
    }, [statusFilter, defects]);

    const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(event.target.value === '' ? null : event.target.value === 'true');
    };

    return (
        <div className="container w-100">
            <div className="container d-flex justify-content-center">
                <h3>Список дефектів</h3>
            </div>
            <div className="container w-100">
                <label htmlFor="status" className="m-1">Статус:</label>
                <select value={statusFilter === null ? '' : String(statusFilter)} onChange={handleFilter} id="status">
                    <option value="">Всі</option>
                    <option value="true">Виконано</option>
                    <option value="false">Не виконано</option>
                </select>
            </div>
            <DefectList defects={filteredDefects}></DefectList>
        </div>
    );
};

export default DefectsPage;
