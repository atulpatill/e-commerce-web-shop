import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";



function RegisterPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [cPassword, setCPassword] = useState() 
  const [loading, setLoading] = useState(false)
  
  const auth = getAuth();
  const register =async ()=>{
      try{
        setLoading(true)
       const result = await createUserWithEmailAndPassword(auth, email, password)
       toast.success('Registration Successful')
       window.location.href='/'
       setLoading(false)
       
      }catch(error){
  
     console.log(error)
     toast.error('Registration Failed')
     setLoading(false)
      }
  }
 
  return (
    <div className="register-parent">
      {loading && <Loader />}
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

            <h2>Register</h2>
            <hr/>
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
             <input type="password" className="form-control" placeholder="Confirm Password" value={cPassword} onChange={(e)=>setCPassword(e.target.value)} />

             <button className="my-3" onClick={register}>Register</button>

             <hr/>
             <Link to='/login'>Click here to Login</Link>


          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
