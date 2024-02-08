import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from './../../plugins/axiosClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from '../../plugins/Notification';
export default function Register() {
  const navigate = useNavigate()
  const [fullName,setFullname] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const register =(e)=>{
    e.preventDefault()
    axiosClient.post("/auth/signup",{
      full_name:fullName,
      username:username,
      password:password
    }).then(res=>{
      console.log(res);
      if (res.data.tokens.access_token) {
        localStorage.setItem('token',res.data.tokens.access_token)
        setTimeout(()=>{
          navigate("/login")
        },3000)
        Notification({text:"Success",type:"success"})
      }
    }).catch(err=>{
      console.log(err);
      Notification({text: err.response.data.message[0],type:"error"})
    })
  }
  const active = Boolean(fullName) && Boolean(username) && Boolean(password)
  return (
    <div className="container">
      <ToastContainer/>
      <div className="row">
        <div className="col-md-6 offset-3">
            <div className="card">
              <div className="card-header">
                <h1 className='text-center'>Register</h1>
              </div>
              <div className="card-body">
                <form id='register' onSubmit={register}>
                  <input type="text" onChange={(e)=>setFullname(e.target.value)} placeholder='Full name...' className='form-control my-2' />
                  <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder='Username...' className='form-control my-2' />
                  <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Password...' className='form-control my-2' />
                </form>
              </div>
              <div className="card-footer">
                <button type='submit' form='register' disabled={!active} className='btn btn-info'>Register</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
