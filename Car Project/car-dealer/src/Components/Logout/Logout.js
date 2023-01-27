import { UserContext } from "../../contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../services/authService'


export const Logout = () => {
   const {  loggedUser, user } = useContext(UserContext);
   
     const navigate = useNavigate();
    logoutUser(user.accessToken)
    .then(() => {
        loggedUser({});
        localStorage.clear();
        navigate('/');
    })
    .catch((err) => {
        navigate('/login');
    })

};

