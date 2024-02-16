import './App.css'
import Login from "./components/login/login.tsx";
import { Routes, Route, Link } from "react-router-dom"
import Homepage from "./components/homepage/homepage.tsx";
import Userspage from "./components/userspage/userspage.tsx";
function App() {

    return (
        <>
            <div className="sidebar">
                <Link to="/">Homepage</Link>
                <br/>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/users">Users</Link>
            </div>
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/users" element={<Userspage/>}></Route>
            </Routes>
        </>
    )
}

export default App
