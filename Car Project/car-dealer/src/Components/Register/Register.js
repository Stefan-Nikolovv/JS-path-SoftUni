import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../../services/authService'
import { UserContext } from '../../contexts/authContext'

export const Register = () => {
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const[register, setRegister] = useState({
    email:"",
    password:"",
    repeatPass:""
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerUser(register.email, register.password)
    .then(registerData => {
      loggedUser(registerData);
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    })
  };


    const onChangeHandler = (e) => {
      e.preventDefault();
      const target = e.target
      setRegister({
        ...register,
        [target.name]: target.value,
      });
    };

    const validationHandler = () => {
        if(register.password !== register.repeatPass) {
            return('Password missmatch!');
        };

    };


  return (
    <section id="register">
      <div className="container">
        <form id="register-form" onSubmit={onSubmitHandler}>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={register.email}
            onChange={onChangeHandler}
            onBlur={validationHandler}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={register.password}
            onChange={onChangeHandler}
            onBlur={validationHandler}
           
          />
          <label>Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPass"
            value={register.repeatPass}
            onChange={onChangeHandler}
            onBlur={validationHandler}
            
          />
          <hr />
          <input
            type="submit"
            className="registerbtn"
            defaultValue="Register"
          />
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
