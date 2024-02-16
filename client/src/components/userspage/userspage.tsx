import { SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import UserList from "../userlist/userlist.tsx";

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
            const res = await axios.get('http://localhost:8080/api/users');
            setUsers(res.data);
        }

        fetchUsers()
            .catch(e => {console.log(e)});
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

    const handlePositionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedPosition(event.target.value);
        filterUsers();
    };

    const handleAccessChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedAccess(event.target.value === '' ? null : event.target.value === 'true');
        filterUsers();
    };

    return (
        <div className="d-block container">
            <div className="container d-flex justify-content-around mb-2">
                <h3>Список користувачів</h3>
                <p>Виберіть один із фільтрів</p>
                <div className="container">
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
            <UserList users={filteredUsers}></UserList>
        </div>
    )
}

export default UsersPage;
