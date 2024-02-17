import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import "../../styles/sidebar.css"
import AdminCard from "../admincard/adminCard.tsx";

interface JwtPayload {
    name: string;
    surname: string;
}

const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: "", surname: "" });

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (token) {
            const decodedToken: JwtPayload = jwtDecode(token);

            setUserInfo({name: decodedToken.name, surname: decodedToken.surname});
        }
    }, []);

    return (
        <div className="sidebar bg-dark d-flex flex-column">
            {isLoggedIn ?
                <AdminCard name={userInfo.name} surname={userInfo.surname}/>
            : ''}
            <nav className="container-fluid navbar mt-5 ">
                <ul className="navbar-nav justify-content-around align-items-center w-100">
                    <li className="nav-item"><Link className="m-0 p-0 link-underline-opacity-0 link-underline nav-link"
                                                   to="/">Головна сторінка</Link></li>
                    <li className="nav-item"><Link className="m-0 p-0 link-underline-opacity-0 link-underline nav-link"
                                                   to="/users">Користувачі</Link></li>
                    <li className="nav-item"><Link className="m-0 p-0 link-underline-opacity-0 link-underline nav-link"
                                                   to="/admins">Адміни</Link></li>
                    <li className="nav-item"><Link className="m-0 p-0 link-underline-opacity-0 link-underline nav-link"
                                                   to="/defects">Дефекти</Link></li>
                    <li className="nav-item"><Link className="m-0 p-0 link-underline-opacity-0 link-underline nav-link"
                                                   to="/orders">Замовлення</Link></li>
                    {!isLoggedIn && (
                        <li className="nav-item"><Link className="m-0 p-0 link-underline-opacity-0 link-underline nav-link" to="/login">Логін</Link></li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;