import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface IUser {
    telegramId: number;
    name: string;
    surname: string;
    registeredAt: Date;
    role: string;
    access: boolean;
}

const EditUserPage = () => {
    const { telegramId } = useParams<{ telegramId: string }>();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get<IUser>(`http://localhost:8080/api/users/${telegramId}`);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser()
            .catch(e => console.log(e));
    }, [telegramId]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser!,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setUser(prevUser => ({
            ...prevUser!,
            [name]: checked
        }));
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser!,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${telegramId}`, user);
            window.location.href = "/"
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        window.location.href = "/";
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h3>Редагування користувача</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Ім'я:</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Прізвище:</label>
                    <input type="text" className="form-control" id="surname" name="surname" value={user.surname} onChange={handleInputChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="access" name="access" checked={user.access} onChange={handleCheckboxChange} />
                    <label className="form-check-label" htmlFor="access">Активний</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Роль:</label>
                    <select className="form-select" id="role" name="role" value={user.role} onChange={handleSelectChange}>
                        <option value="User">User</option>
                        <option value="Repairman">Тех. працівник</option>
                        <option value="Technical">Прибиральник</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary me-2">Зберегти</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Скасувати</button>
            </form>
        </div>
    );
};

export default EditUserPage;
