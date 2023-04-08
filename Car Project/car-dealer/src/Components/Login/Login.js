import { useState, useContext, useEffect } from "react";
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
  const [isSubmit, setSubmit] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSubmit(true);
    setError({ ...error, login: undefined });
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
    if (
      Object.values(error).filter((x) => x !== undefined).length === 0 &&
      isSubmit
    ) {
      login(user.email, user.password)
        .then((userData) => {
          if (userData.code === 403) {
            setError({ ...error, login: "Email or password don't match" });
            user.email = "";
            user.password = "";
            setSubmit(false);
          } else if (userData) {
            loggedUser(userData);
            navigate("/");
          }
        })
        .catch((err) => {
          setError({ ...error, login: err });
        });
    }
  }, [isSubmit]);

  // const errorMessagePElement = {
  //   color: "red",
  // };

  const validate = (user, target) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (target === "email") {
      if (!user) {
        errors.email = "Email is required!";
      } else if (!regex.test(user)) {
        errors.email = "This is not a valid email format!";
      } else {
        setError({ ...error, login: errors.email });
      }
      setError({ ...error, email: errors.email });
    }
    if (target === "password") {
      if (user === "") {
        errors.password = "Password is required!";
      } else if (user.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (user.length > 10) {
        errors.password = "Password must be less than 10 characters";
      } else {
        setError({ ...error });
      }
      setError({ ...error, password: errors.password });
    }

    return errors;
  };
  return (
    <section data-testid="login" id="login">
      <div className="container">
        <form id="login-form" onSubmit={onSubmitHandler}>
          <h1>Login</h1>
          <p> Please enter your credentials.</p>
          <hr/>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            placeholder="Enter Username"
            name="email"
            type="text"
            value={user.email}
            onBlur={(e) => validate(e.target.value, e.target.name)}
            onChange={onChangeLoginHandler}
          />
          <p className="error" data-testid="emailError" >
            {error.email}
          </p>
          <hr/>
          <br/>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onBlur={(e) => validate(e.target.value, e.target.name)}
            onChange={onChangeLoginHandler}
          />
          <p className="error" data-testid="passwordError" >
            {error.password}
          </p>
          <p className="error" data-testid="loginError" >
            {error.login}
          </p>
          <hr />
          <button type="click" className="registerbtn" defaultValue="Login">
            Login
          </button>
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
