import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { UserContext } from "../../contexts/authContext";

export const Register = () => {
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSubmit, setSubmit] = useState(false);
  const [error, setError] = useState({});
  const [register, setRegister] = useState({
    email: "",
    password: "",
    repeatPass: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (register.password !== register.repeatPass) {
      setError({ ...error, missMatch: "Passwords missmatch!" });
    } else {
      setError({ ...error, missMatch: undefined, register: undefined });
      setSubmit(true);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    setRegister({
      ...register,
      [target.name]: target.value,
    });
  };

  if (
    Object.values(error).filter((x) => x !== undefined).length === 0 &&
    isSubmit
  ) {
    registerUser(register.email, register.password)
      .then((registerData) => {
        if (registerData.code === 409) {
          setError({
            ...error,
            register: "A user with the same email already exists!",
          });
          setSubmit(false);
        } else if (registerData) {
          loggedUser(registerData);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

 

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
      } else if (user.length >= 10) {
        errors.password = "Password must be less than 10 characters";
      } else {
        setError({ ...error });
      }
      setError({ ...error, password: errors.password });
    }
    if (target === "repeatPass") {
      if (user === "") {
        errors.repeatPass = "RePassword is required!";
      } else {
        setError({ ...error });
      }
      setError({ ...error, repeatPass: errors.repeatPass });
    }

    return errors;
  };

  return (
    <section data-testid="register" id="register">
      <div className="container">
        <form id="register-form" onSubmit={onSubmitHandler}>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter Username"
            name="email"
            value={register.email}
            onChange={onChangeHandler}
            onBlur={(e) => validate(e.target.value, e.target.name)}
          />
          <p className="error" data-testid={"emailError"}>
            {error.email}
          </p>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            name="password"
            value={register.password}
            onChange={onChangeHandler}
            onBlur={(e) => validate(e.target.value, e.target.name)}
          />
          <p className="error" data-testid={"passError"}>
            {error.password}
          </p>
          <label htmlFor="repeatPass">Repeat Password</label>
          <input
            id="repeatPass"
            type="password"
            placeholder="Repeat Password"
            name="repeatPass"
            value={register.repeatPass}
            onChange={onChangeHandler}
            onBlur={(e) => validate(e.target.value, e.target.name)}
          />
          <p className="error" data-testid={"RePassError"}>
            {error.repeatPass}
          </p>
          <p className="error" data-testid={"missMatchError"}>
            {error.missMatch}
          </p>

          <p className="error" data-testid={"reRgisterError"}>
            {error.register}
          </p>
          <hr />
          <button type="click" className="registerbtn" defaultValue="Register">
            Register
          </button>
        </form>
        <div className="signin">
          <p>
            Already have an account?
            <Link to="/login">Sign in</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};
