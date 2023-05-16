import React,{useState,useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [iduser,setIduser] = useState('');
    const [nmuser,setNmuser] = useState('');
    const [token,setToken] = useState('');
    const [expire,setExpire] = useState('');
    const router = useRouter();

    useEffect(()=>{
        refreshToken();
    },[]);
    
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            try {
            const resp = await axios.get('http://localhost:4000/login/refreshToken');
            config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
            setToken(resp.data.accessToken);
            const decoded = jwt_decode(resp.data.accessToken);
            setNmuser(decoded.nmuser);
            setExpire(decoded.exp);
        } catch (error) {
            if(error.response){
                router.push("/latihan/mentor/login");
            }
        }
        }
        return config;
    },(error)=>{
        return Promise.reject(error);
    });

    const refreshToken = async() => {
        try {
            const res = await axios.get('http://localhost:4000/login/refreshToken');
            setToken(res.data.accessToken);
            const decoded = jwt_decode(res.data.accessToken);

            setNmuser(decoded.nmuser);
            setExpire(decoded.exp);
        } catch (error) {
            if(error.response){
                router.push("/latihan/mentor/login");
            }
        }
    }

    const getUsers = async () => {
        try {
           const response = await axiosJWT.get('http://localhost:4000/login/getAllUsers',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                router.push("/latihan/mentor/login");
            }
        }
    }

    const Logout = async() =>{
        try {
            await axios.delete('http://localhost:4000/login/logout');
        } catch (error) {
            console.log(error);
        }
    }
  return (
      <div className="grid">
          <div className="col-12">
              <div className="card">
                  <h5>Halo {nmuser}</h5>
                  <button onClick={getUsers}>Liat users</button>
                  <p>hi is ia ad</p>
                  <button onClick={Logout}>Logout</button>
              </div>
          </div>
      </div>
  )
}

export default Dashboard