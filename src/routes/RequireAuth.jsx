import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const auth = useSelector(state => state.auth.data);

    if (!auth.accessToken) {
        return <Navigate to='/login' state={{from: location}} />
    }

  return children;
}

export {RequireAuth};