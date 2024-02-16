import React, {useState} from "react";
import axios from "axios";

const Login = () => {
    const [loginData, setLoginData] = useState({login: "", password: ""});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                loginData
            );

            localStorage.setItem("token", response.data.token);
            console.log(localStorage);
            console.log('login successful');
            // window.location.href = "/dashboard";
        } catch (error) {
            console.log(localStorage);
            setError("Неправильний email або пароль.");
        }
    };

    return (
        <div>
            <h2>Увійти</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="login">Логін:</label> {/* Виправляємо htmlFor на login */}
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={loginData.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Увійти</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
