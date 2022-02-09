import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";


function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false) 

  const auth = getAuth();
  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login Successful");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
      setLoading(false);
    }
  };
  

  return (
    <div className="login-parent">
         {loading && <Loader />}
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

            <button className="my-3" onClick={login}>
              Login
            </button>
            <hr />

            <Link to="/register">Click here to register</Link>
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
