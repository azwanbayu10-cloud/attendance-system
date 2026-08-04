import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Login(){ const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const { login }=useAuth(); const nav=useNavigate(); return <form className="card mx-auto max-w-md space-y-4" onSubmit={async e=>{e.preventDefault(); await login(email,password); nav('/');}}><h1 className="text-2xl font-bold">Login</h1><input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} /><input className="input" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} /><button className="btn">Sign in</button></form>; }
