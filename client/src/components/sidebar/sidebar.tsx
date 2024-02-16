import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="sidebar m-0 p-0">
            <nav className="container-fluid navbar bg-dark sidebar">
                <ul className="navbar-nav">
                    <li><Link className="text-light link-underline-opacity-0 link-underline" to="/">Головна сторінка</Link></li>
                    <li><Link className="text-light link-underline-opacity-0 link-underline" to="/users">Користувачі</Link></li>
                    <li><Link className="text-light link-underline-opacity-0 link-underline" to="/admins">Адміни</Link></li>
                    <li><Link className="text-light link-underline-opacity-0 link-underline" to="/defects">Дефекти</Link></li>
                    <li><Link className="text-light link-underline-opacity-0 link-underline" to="/orders">Замовлення</Link></li>
                    {!isLoggedIn && (
                        <li><Link to="/login">Логін</Link></li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;