import './App.css';
import Login from './components/login/login.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/homepage/homePage.tsx';
import UsersPage from './components/userspage/usersPage.tsx';
import { useEffect, useState } from 'react';
import PageNotFound from "./components/404/404.tsx";
import AdminsPage from "./components/adminspage/adminsPage.tsx";
import EditUserPage from "./components/edituser/editUserPage.tsx";
import DefectsPage from "./components/defectspage/defectsPage.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="app">
            <Sidebar></Sidebar>
            <Routes>
                <Route path="/" element={<Homepage />} />
                {!isLoggedIn && <Route path="/login" element={<Login />} />}
                <Route path="/users" element={isLoggedIn ? <UsersPage/> : <Navigate to="/login"/>} />
                <Route path="/admins" element={isLoggedIn ? <AdminsPage/> : <Navigate to="/login"/>} />
                <Route path="/edit-user/:telegramId" element={isLoggedIn ? <EditUserPage/> : <Navigate to="/login"/>} />
                <Route path="/defects" element={isLoggedIn ? <DefectsPage /> : <Navigate to="/login" />} />
                <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
