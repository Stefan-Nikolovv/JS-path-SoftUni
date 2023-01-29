import { useState, useContext, useEffect } from "react";
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
    setSubmit(true);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const target = e.target;
    setRegister({
      ...register,
      [target.name]: target.value,
    });
  };

  const onBlurHandler = () => {
    setError(validate(register))

  };


  const validate = (registerData) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!registerData.email){
      errors.email = 'Email is required!'
    }else if(!regex.test(registerData.email)){
      errors.email = "This is not a valid email format!";
    }
     if(!registerData.password){
      errors.password = 'Password is required!'
     }else if(registerData.password !== registerData.repeatPass){
      errors.password = 'Passwords missmatch!';
     }
     else if(registerData.password.length < 4){
      errors.password = "Password must be more than 4 characters";
     }else if(registerData.password.length > 10){
      errors.password = "Password must be less than 10 characters";
     }
     return errors;
  };


  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      registerUser(register.email, register.password)
        .then((registerData) => {
          loggedUser(registerData);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[setError]);

  return (
    <section id="register">
      <div className="container">
        <form id="register-form" onSubmit={onSubmitHandler}>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label htmlFor="email">Email</label>
          {register.email && <div></div>}
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={register.email}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          <p>{error.email}</p>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={register.password}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          <p>{error.password}</p>
          <label htmlFor="con-pass">Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPass"
            value={register.repeatPass}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          <hr />
          <button type="submit" className="registerbtn" defaultValue="Register">
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
