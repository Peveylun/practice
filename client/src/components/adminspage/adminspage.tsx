import React, {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "react-bootstrap";

interface IAdmin {
    _id: string
    login: string;
    password: string;
    name: string;
    surname: string;
}

interface AdminsProps {
    admins: IAdmin[];
}

const AdminsPage: React.FC<AdminsProps> = () => {
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        const fetchAdmins = async () => {
            const res = await axios.get('http://localhost:8080/api/admins');
            setAdmins(res.data);
        }

        fetchAdmins()
            .catch(e => console.log(e));
    }, [])

    return (
        <div className="container w-100">
            <div className="container d-flex justify-content-center">
                <h3>Список адмінів</h3>
            </div>
            <div className="container w-100">
                <Table striped borderless size="sm">
                    <thead className="">
                    <tr>
                        <th>№</th>
                        <th>Логін</th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admins.map((admin: IAdmin, index) => (
                        <tr className="listItem" key={admin._id}>
                            <td>{index + 1}</td>
                            <td>{admin.login}</td>
                            <td>{admin.name}</td>
                            <td>{admin.surname}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AdminsPage;