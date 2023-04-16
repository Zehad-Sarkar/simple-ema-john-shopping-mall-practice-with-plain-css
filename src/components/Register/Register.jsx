import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Register = () => {
  const [error, setError] = useState("");

  const {createUser}=useContext(AuthContext)

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    setError('')
    console.log(email, password, confirm);

    if (password !== confirm) {
      setError("password didnt match");
      return;
    } else if (password.length < 6) {
      setError("password under 6 charecter");
      return;
    }

    createUser(email, password)
      .then(result => {
        const regUser = result.user;
        console.log(regUser);
      })
      .catch(error => {
      setError(error.message);
    })

  };

  return (
    <div className="form-container">
      <h1 className="form-title">Please Register</h1>
      <form onSubmit={handleRegister}>
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
            type="password"
            name="password"
            id=""
            placeholder="type your password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            id=""
            placeholder="type your password"
            required
          />
        </div>
        <input className="btn-submit" type="submit" value="Register" />
        <p>
          Already have an account? <Link to="/login">Login Now</Link>
        </p>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Register;
