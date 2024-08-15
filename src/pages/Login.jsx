import React, { useState } from 'react'
import { getTokenApi } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [user,setUser]=useState({username:'',password:''})

    const navigate=useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        let res=await getTokenApi(user)
        if(res.status>199 && res.status<300){
            let accessToken=res.data.access

            let refreshToken=res.data.refresh

            localStorage.setItem("access",accessToken)
            localStorage.setItem("refresh",refreshToken)
            
            navigate("/index")

        }
        else{
            alert("Failed to login")
        }
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-2"></div>
                <div className="col-8 border border-2 p-5 shadow rounded">
                    <h3 className='text-center fw-bold'>Login</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="">Username</label>
                            <input type="text" onChange={(e)=>setUser({...user,username:e.target.value})} className="form-control" placeholder='enter username' />
                        </div>
                        <div className="mb-3">

                            <label htmlFor="">Password</label>
                            <input type="text" onChange={(e)=>setUser({...user,password:e.target.value})} className="form-control" placeholder='enter password' />

                        </div>
                        <div className="mb-3">
                            <button type='submit' className='btn btn-info form-control'>Login</button>
                        </div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>

        </div>
    )
}

export default Login