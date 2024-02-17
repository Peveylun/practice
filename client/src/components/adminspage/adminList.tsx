import {Table} from "react-bootstrap";
import IAdmin from "../../interfaces/admin.ts";
import React from "react";

interface AdminProps {
    admins: IAdmin[];
}

const AdminList: React.FC<AdminProps> = ({admins}) => {
    return (
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
    )
}

export default AdminList;