import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
    const[fullName,setName] = useState("");
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("");
    const[age,setAge] = useState("");
    const[occupation,setOccupation] = useState("");
    const[annualIncome,setAnnualIncome] = useState("");

    const navigate = useNavigate();

    const handleRegister = async() => {
        try {
            const data = await registerUser(fullName,email,password,age,occupation,annualIncome);
            navigate("/");
        }
        catch(error) {
          console.log(error);
          alert(
            error.response?.data?.message
            || error.message
            || "Register failed"
    );
}
    }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <label>Name</label>
        <input type='text' value={fullName} onChange={(e) => setName(e.target.value)}/>
        <label>Email</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <label>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
        <label>Occupation</label>
        <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
        <label>Annual Income</label>
        <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}/>
        <button type='button' onClick={handleRegister}>Register</button>
      </div>
    </div>
  )
}

export default Register


