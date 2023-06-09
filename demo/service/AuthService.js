import axios from 'axios';
axios.defaults.withCredentials = true;
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import Cookies from 'js-cookie';

const cobaRefreshToken = async()=>{
    await axios.get('http://localhost:4000/login/refreshToken',{ withCredentials: true })
    .then(function (response){
        const decoded = jwt_decode(response.data.accessToken);
        // Cookies.set('token', JSON.stringify(decoded),{expires: decoded.exp-5});
        // console.log(decoded);
        console.log('berhasil');
        console.log(response.data.accessToken);
        // setHasil('response.data.accessToken');
            })
    .catch(function (res){
        console.log('error refreshToken');
        // setHasil('false');
    });
    return 'hasil';
    // setToken(res.data.accessToken);
    
    // console.log(decoded);
    
    // setNmuser(decoded.nmuser);
    // setExpire(decoded.exp);

    // router.push('/latihan/mentor/login');
}

export const refreshToken = async() => {
    // const [hasil,setHasil] = useState('sss');
    var hasil = new Object();
    try {
        console.log('refreshToken');
        const res =   await axios.get('http://localhost:4000/login/refreshToken');
        // setToken(res.data.accessToken);
        const decoded = jwt_decode(res.data.accessToken);   
        Cookies.set('token', JSON.stringify(decoded),{expires: decoded.exp-5,secure: true,SameSite:'None'});
        // console.log('decoded :' + decoded);
        console.log('berhasil');
        console.log(jwt_decode(res.data.accessToken));
        hasil = new Object();
        hasil.status = 'ok';
        hasil.accessToken = res.data.accessToken;
        hasil.accessTokenDecoded = jwt_decode(res.data.accessToken);
        return hasil;
        // setNmuser(decoded.nmuser);
        // setExpire(decoded.exp);
    } catch (error) {
        // console.log(error);
        hasil.status = 'error';
        if(error.response){
            // router.push('/latihan/mentor/login');
            
            console.log(error.response.data);
            console.log('error refreshToken');
            hasil.msg=error.response.data;
            // return (error.response);
        }
        console.log(hasil);
        return hasil;
    }
    return hasil;
}
