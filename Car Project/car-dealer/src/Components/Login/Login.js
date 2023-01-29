import {  useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/authContext";

export const Login = () => {

  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const[isSubmit, setSubmit] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSubmit(true);
  };
  const onChangeLoginHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
   
    if(Object.keys(error).length === 0 && isSubmit){
      login(user.email, user.password)
    .then(userData => {
        loggedUser(userData);
        navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
    }
  },[error]);
  const onBlurHandler = () => {
    setError(validate(user))
  }

  const validate = (user) => {
   const errors = {};
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
   if(!user.email || user.email === ''){
    errors.email = 'Email is required!'
   }else if(!regex.test(user.email)){
    errors.email = "This is not a valid email format!";
   }
   if(!user.password){
    errors.password = 'Password is required!'
   }else if(user.password.length < 4){
    errors.password = "Password must be more than 4 characters";
   }else if(user.password.length > 10){
    errors.password = "Password must be less than 10 characters";
   
   }
   return errors;
  };
  return (
   
    <section id="login">
      <div className="container">
        <form id="login-form" onSubmit={onSubmitHandler}>
          <h1>Login</h1>
          <p>Please enter your credentials.</p>
          <hr />
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter Username"
            name="email"
            type="text"
            value={user.email}
            onBlur={onBlurHandler}
            onChange={onChangeLoginHandler}
          />
          <p>{error.email}</p>
          <label htmlFor="login-pass">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onBlur={onBlurHandler}
            onChange={onChangeLoginHandler}
          />
          <p>{error.password}</p>
          <button type="submit" className="registerbtn" defaultValue="Login">Login</button>
        </form>
        <div className="signin">
          <label>
            Dont have an account?
            <Link to="/register">Sign up</Link>.
          </label>
        </div>
      </div>
    </section>

  );
};
