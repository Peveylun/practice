import {useEffect, useState} from "react";
import axios from "axios";
import AdminList from "./adminList.tsx";

const AdminsPage = () => {
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
            <AdminList admins={admins}></AdminList>
        </div>
    )
}

export default AdminsPage;