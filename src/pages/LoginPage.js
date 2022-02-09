import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cPassword, setCPassword] = useState() 
  return (
    <div className="register-parent">
      <div className="register-top">

      </div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_6wutsrox.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">

            <h2>Login</h2>
            <hr/>
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
             <input type="password" className="form-control" placeholder="Confirm Password" value={cPassword} onChange={(e)=>setCPassword(e.target.value)} />

             <button className="my-3">Login</button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
