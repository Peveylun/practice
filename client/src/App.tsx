import './App.css';
import Login from './components/login/login.tsx';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Homepage from './components/homepage/homepage.tsx';
import Userspage from './components/userspage/userspage.tsx';
import { useEffect, useState } from 'react';
import PageNotFound from "./components/404/404.tsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="app mh-100 d-flex flex-row m-2">
            <nav className="navbar bg-dark sidebar">
                <ul className="navbar-nav">
                    <li>
                        <Link to="/">Homepage</Link>
                    </li>
                    {!isLoggedIn && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Homepage />} />
                {!isLoggedIn && <Route path="/login" element={<Login />} />}
                {isLoggedIn ? (
                    <Route path="/users" element={<Userspage />} />
                ) : (
                    <Route path="/users" element={<Navigate to="/login" />} />
                )}
                {isLoggedIn ? (
                    <Route path="/users" element={<Userspage />} />
                ) : (
                    <Route path="/users" element={<Navigate to="/login" />} />
                )}
                {isLoggedIn ? (
                    <Route path="/users" element={<Userspage />} />
                ) : (
                    <Route path="/users" element={<Navigate to="/login" />} />
                )}
                <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
