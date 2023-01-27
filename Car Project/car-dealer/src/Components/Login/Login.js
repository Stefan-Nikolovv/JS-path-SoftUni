import {  useState, useContext } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/authContext";

export const Login = () => {

  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
   
    login(user.email, user.password)
    .then(userData => {
      loggedUser(userData);
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const onChangeLoginHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const validatorHandler = () => {
   return "hello"
  };



  return (
    <section id="login">
      <div className="container">
        <form id="login-form" onSubmit={onSubmitHandler}>
          <h1>Login</h1>
          <p>Please enter your credentials.</p>
          <hr />
          <label>Email</label>
          <input
            placeholder="Enter Username"
            name="email"
            type="text"
            value={user.email}
            onBlur={validatorHandler}
            onChange={onChangeLoginHandler}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onBlur={validatorHandler}
            onChange={onChangeLoginHandler}
          />
          <input type="submit" className="registerbtn" defaultValue="Login" />
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
