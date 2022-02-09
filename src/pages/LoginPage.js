import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="login-parent">
      <div className="login-bottom"></div>
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="my-3">Login</button>
            <hr/>

            <Link to='/register'>Click here to register</Link>
          </div>
        </div>
        <div className="col-md-5">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_jtzgxdui.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
