import React,{useState,useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
// import { config } from 'dotenv';

const coba = () => {
  // const token = Cookies.get('token');
  // const refreshToken = Cookies.get('refreshToken');
  const [token,setToken] = useState('');
  const [refreshToken,setRefreshToken] = useState('');
  useEffect(()=>{
    setToken(Cookies.get('token'));
    setRefreshToken(Cookies.get('refreshToken'));
    console.log(process.env.SERVER_API);
    // console.log(process.env);
},[]);

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>coba</h5>
          <p>token dari cookie : {token} </p>
          <p>refreshToken dari cookie : {refreshToken} </p>
          <p>server API :  {process.env.SERVER_API} </p>
        </div>
      </div>
    </div>
  )
}

export default coba
