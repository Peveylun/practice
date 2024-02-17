import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../userlist/userlist";

interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<string>('');
    const [selectedAccess, setSelectedAccess] = useState<boolean | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get<IUser[]>('http://localhost:8080/api/users');
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [selectedPosition, selectedAccess, users]);

    const filterUsers = () => {
        let filteredUsersByPosition = users;
        let filteredUsersByAccess = users;

        if (selectedPosition !== '') {
            filteredUsersByPosition = users.filter(user => user.role === selectedPosition);
        }

        if (selectedAccess !== null) {
            filteredUsersByAccess = users.filter(user => user.access === selectedAccess);
        }

        const filteredUsersIntersection = filteredUsersByPosition.filter(user =>
            filteredUsersByAccess.includes(user)
        );

        setFilteredUsers(filteredUsersIntersection);
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPosition(event.target.value);
    };

    const handleAccessChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAccess(event.target.value === '' ? null : event.target.value === 'true');
    };

    useEffect(() => {
        filterUsers();
    }, [selectedPosition, selectedAccess, users]);

    return (
        <div className="d-block container">
            <div className="container d-flex justify-content-around mb-2">
                <h3>Список користувачів</h3>
                <div className="d-flex align-items-center">
                    <p className="my-2 mx-3">Оберіть фільтри</p>
                    <div>
                        <div className="access-filter">
                            <label htmlFor="position" className="m-1">Роль:</label>
                            <select value={selectedPosition} onChange={handlePositionChange} id="position">
                                <option value="">Всі</option>
                                <option value="User">User</option>
                                <option value="Repairman">Repairman</option>
                                <option value="Technical">Technical</option>
                            </select>
                        </div>
                        <div className="position-filter">
                            <label htmlFor="access" className="m-1">Доступ:</label>
                            <select value={selectedAccess === null ? '' : String(selectedAccess)}
                                    onChange={handleAccessChange} id="access">
                                <option value="">Всі</option>
                                <option value="true">Активні</option>
                                <option value="false">Неактивні</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <UserList users={filteredUsers}></UserList>
        </div>
    );
}

export default UsersPage;
