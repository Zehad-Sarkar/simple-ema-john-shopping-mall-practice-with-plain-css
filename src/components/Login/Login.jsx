import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Login = () => {
  const { logUser } = useContext(AuthContext);
const [showPass,setShowPass]=useState(false)
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from=location.state?.from?.pathname || '/'

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    logUser(email, password)
      .then((result) => {
        const logIn = result.user;
        form.reset();
        navigate(from,{replace:true});
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="form-container">
      <h1 className="form-title">Please Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="type your email"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type={showPass?'password':'text'}
            name="password"
            id="password"
            placeholder="type your password"
            required
          />
          <p onClick={() => setShowPass(!showPass)}>
            <small>
              {
                showPass? <span>show password</span>: <span>hide password</span>
              }
            </small>
          </p>
        </div>
        <input className="btn-submit" type="submit" value="Login" />
        <p>
          New to ema john? <Link to="/register">Create New Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
