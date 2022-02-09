import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cPassword, setCPassword] = useState() 
  return (
    <div className="register-parent">
      <div className="row">
        <div className="col-md-5">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_6wutsrox.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4">
          <div className="login-form">

            <h2>Register</h2>
            <hr/>
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
             <input type="password" className="form-control" placeholder="Confirm Password" value={cPassword} onChange={(e)=>setCPassword(e.target.value)} />

             <button>Register</button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
