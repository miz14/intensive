import logo from '../imgs/Логотип.png'
import userimg from '../imgs/user.svg'
import { Outlet, NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/AuthSlice";


const Root = () => {
    // const isMobile = useMediaQuery({
    //     query: "(min-width: 960px)"
    // });
    const auth = useSelector(state => state.auth.data);
    const dispatch = useDispatch();
    return(
        <>
        <header className="main_header uk-margin-medium-bottom">
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
                                <div uk-dropdown="pos: bottom-center; mode: click; animation: slide-top; animate-out: true; duration: 300" className="user-dropdown-nav">
                                    <ul className="uk-nav uk-dropdown-nav">
                                        {auth.accessToken == null? (
                                            <li><h5><NavLink to="/login">Войти</NavLink></h5></li>
                                            
                                        ) :
                                        (   
                                            <>
                                            <li><h5><NavLink to="/upload">Загрузить след</NavLink></h5></li>
                                            <li><button className="uk-button uk-button-default uk-button-small" onClick={() => dispatch(signout())}>Выход</button></li>
                                            </>
                                        )}
                                        
                                    </ul>
                                </div>             
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