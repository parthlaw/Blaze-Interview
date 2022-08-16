import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuery from './useQuery';

const Callback = () => {
    const query=useQuery()
    const navigate=useNavigate()
    useEffect(()=>{
        const code= query.get('code')
        console.log(code);
        const func=async()=>{
            const response=await fetch('http://localhost:8000/auth/google/callback',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({code})
            })
            const json=await response.json()
            console.log(json)
            if(json.success){
                localStorage.setItem('token',json.data.access_token)
                localStorage.setItem('refresh',json.data.refresh_token)
                navigate('/dashboard')
            }else{
                navigate('/')
            }
        }
        func();
    },[])
    return (
        <div>
            <h1>Callback</h1>
        </div>
    );
};

export default Callback;