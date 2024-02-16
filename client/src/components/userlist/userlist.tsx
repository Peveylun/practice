import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/user';
import {Table} from "react-bootstrap";
import "../../styles/userlist.css";

interface UserListProps {
    users: IUser[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div className="container w-100">
            <Table striped borderless size="sm">
                <thead className="">
                <tr>
                    <th>№</th>
                    <th>Telegram ID</th>
                    <th>Ім'я</th>
                    <th>Прізвище</th>
                    <th>Посада</th>
                    <th>Доступ</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr className="listItem" key={user.telegramId}>
                        <td>{index + 1}</td>
                        <td>{user.telegramId}</td>
                        <td>{user.name}</td>
                        <td>{user.surname ? user.surname : 'Відсутнє'}</td>
                        <td>{user.role}</td>
                        <td>{user.access ? 'Активний' : 'Неактивний'}</td>
                        <td>
                            <Link to={`/edit-user/${user.telegramId}`}>Edit</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserList;
