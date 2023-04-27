import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAuth } from "../store/AuthSlice";
import axios, {URL_AUTH} from "../api/axios";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    
    const [error, setError] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false);

    const dispatchAuth = useDispatch();
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError(null)
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(
            //     URL_AUTH,
            //     JSON.stringify({"user": user, "password": password}),
            //     {
            //         headers: {'Content-Type' : 'application/json'},
            //         withCredentials: true //пока пусть будет
            //     }
            // );
            const response =
            {
                "data": {"accessToken": "123-123-123"},
                "status": 200,
                "headers": {
                    "content-length": "162",
                    "content-type": "application/json; charset=utf-8"
                }
    
            }
            dispatchAuth(setAuth({"user": user, "password": password, "accessToken": response.data.accessToken}))   

            navigate(fromPage, {replace: true})
            setLoginStatus(true);
            setUser(null);
            setPassword(null)
            setLoginStatus(true);
        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err?.response?.status === 400) {
                setError('Incorrect Username or Password');
            } else {
                setError("Login Failed");
            }
            errRef.current.focus();
        }
    }   

    return (
    <>  
        <main uk-height-viewport="expand: true">
            <form onSubmit={handleSubmit} className="uk-container size560">
            <div className="uk-card uk-card-default uk-card-body reg_card">
                <h2 className="uk-margin-small-bottom uk-text-center">Добро пожаловать</h2>
                <div className="uk-card uk-card-body uk-card-small">
                    <h4 className="uk-margin-small-bottom uk-margin-small-top">Логин</h4>
                        <input 
                            ref={userRef}
                            className="uk-input"
                            name="username"
                            type="text"
                            placeholder="Введите логин"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            autoComplete="off"/>
                    <h4 className="uk-margin-small-bottom">Пароль</h4>
                        <input
                            className="uk-input
                            uk-margin-medium-bottom"
                            name="userpass"
                            type="password"
                            placeholder="Введите пароль"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="off"
                            rows="3"/>
                        <div className="reg_card_linkAndbutton">
                        <div>
                        <span>Еще нет аккаунта?</span>
                        <a className="text_color3">Зарегистрироваться</a>
                        </div>
                        <button type="submit" className="uk-button uk-button-default confirm-button">Отправить</button>
                        </div>
                    </div>
                    {error ? (<p ref={errRef}>{error}</p>) : null}
                </div>
            </form>
        </main>
        </>
    )
}

export default Login;