
import axios from 'axios';
axios.defaults.withCredentials = true;
import jwt_decode from 'jwt-decode';
import { useState } from 'react';

export async function refreshToken() {
    // const router = useRouter();
    
        const res =  await axios.get('http://localhost:4000/login/refreshToken',{ withCredentials: true })
        .then(function (resp){
            const decoded = jwt_decode(res.data.accessToken);
            console.log(decoded);
            console.log('berhasil');
            return decoded;
        })
        .catch(function (resp){
            console.log('error');
            return 'false';
        });
        // setToken(res.data.accessToken);
        
        // console.log(decoded);
        
        // setNmuser(decoded.nmuser);
        // setExpire(decoded.exp);
   
        // router.push('/latihan/mentor/login');

}