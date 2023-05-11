import logo from '../imgs/Логотип.png'
import userimg from '../imgs/user.svg'
import { Outlet, NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/AuthSlice";
import useMediaQuery from '../components/MediaQuer';

const Root = () => {
    const notMobile = useMediaQuery("(min-width: 760px)");
    const auth = useSelector(state => state.auth.data);
    const dispatch = useDispatch();
    return(
        <>
        <header className="uk-margin-medium-bottom main_header">
            <div className="header_block1">
                <div className="uk-container uk-container-large main_header_block1_container">
                    <div className="header_block1_flex">
                        <NavLink to="/" className="logo_block">
                            <img src={logo} className="logo_block_img" alt="logo"/>
                            <span className="logo_block_name">Цифровой профиль студента</span>
                        </NavLink>
                        <div className="userAndSearch_block">
                                
                                <form className="uk-search uk-search-default">
                                    {auth.accessToken != null? (<input className="uk-search-input search" type="search" placeholder="Найти..."/>) :
                                    (<input className="uk-search-input search" type="search" placeholder="Найти..." disabled/>) 
                                    }  
                                </form>
                                <img src={userimg} className="userimg" alt="user"/>
                                <nav uk-dropdown="pos: bottom-center; mode: click; animation: slide-top; animate-out: true; duration: 300" className="user-dropdown-nav">
                                    <ul className="uk-nav uk-dropdown-nav">
                                        {auth.accessToken == null? (
                                            <li><p className='user_text'><NavLink to="/login">Войти</NavLink></p></li>
                                            
                                        ) :
                                        (   
                                            <>
                                            <li><p className='user_text'><NavLink to="/traces">Загрузить след</NavLink></p></li>
                                            <li><button className="uk-button uk-button-default uk-button-small" onClick={() => dispatch(signout())}>Выход</button></li>
                                            </>
                                        )}
                                        
                                    </ul>
                                </nav>             
                            </div>
                    </div>
                </div>
            </div>
        </header>
        <Outlet/>
        </>
    );
}
export default Root