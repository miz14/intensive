import { useState, useEffect } from "react";
import { URL_REG } from "../api/axios";
import { useLocation, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [reglogin, setReglogin] = useState(null);
    const [regpass1, setRegpass1] = useState(null);
    const [regpass2, setRegpass2] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null)
    }, [firstname, lastname, reglogin, regpass1, regpass2]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (regpass1 == regpass2) {
            try {
                const response = await axios.post(
                    URL_AUTH,
                    JSON.stringify({"firstname": firstname, "lastname": lastname, "reglogin": reglogin, "password": regpass}),
                    {
                        headers: {'Content-Type' : 'application/json'},
                        withCredentials: true //пока пусть будет
                    }
                );
                // const response =
                // {
                //     "status": 200,
                //     "headers": {
                //         "content-type": "application/json; charset=utf-8"
                //     }
        
                // }
                navigate(fromPage, {replace: true})
                setFirstname(null);
                setLastname(null);
                setReglogin(null);
                setRegpass1(null);
                setRegpass2(null);
            } catch (err) {
                if (!err?.response) {
                    setError('No Server Response');
                } else if (err?.response?.status === 400) {
                    setError('Гser already exists');
                } else {
                    setError("Registration failed");
                }
            }
        }
        else {
            setError('Password mismatch')
        }
    }

    return (
        <>  
        <main uk-height-viewport="expand: true">
            <form onSubmit={handleSubmit} className="uk-container size560">
            <div className="uk-card uk-card-default uk-card-body reg_card">
                <h2 className="uk-margin-small-bottom uk-text-center">Регистрация</h2>
                <div className="uk-card uk-card-body uk-card-small">
                    <h4 className="uk-margin-small-bottom uk-margin-small-top">Имя</h4>
                    <input 
                        className="uk-input"
                        name="firstname"
                        type="text"
                        placeholder="Введите имя"
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                        autoComplete="off"/>
                    <h4 className="uk-margin-small-bottom uk-margin-small-top">Фамилия</h4>
                    <input 
                        className="uk-input"
                        name="lastname"
                        type="text"
                        placeholder="Введите фамилию"
                        onChange={(e) => setLastname(e.target.value)}
                        required
                        autoComplete="off"/>
                        <h4 className="uk-margin-small-bottom uk-margin-small-top">Логин</h4>
                    <input 
                        className="uk-input"
                        name="login"
                        type="text"
                        placeholder="Введите логин"
                        onChange={(e) => setReglogin(e.target.value)}
                        required
                        autoComplete="off"/>
                    <h4 className="uk-margin-small-bottom uk-margin-small-top">Пароль</h4>
                    <input 
                        className="uk-input uk-margin-bottom"
                        name="password"
                        type="text"
                        placeholder="Введите пароль"
                        onChange={(e) => setRegpass1(e.target.value)}
                        required
                        autoComplete="off"/>
                    <input 
                        className="uk-input uk-margin-bottom"
                        name="repeatpassword"
                        type="text"
                        placeholder="Повторите пароль"
                        onChange={(e) => setRegpass2(e.target.value)}
                        required
                        autoComplete="off"/>
                    <div className="register_button_block">
                        <button type="submit" className="uk-button uk-button-default confirm-button">Отправить</button>
                    </div>
                </div>
                {error ? (<p>{error}</p>) : null}
            </div>
            
            </form>
        </main>
        </>
    )
}

export default Register;