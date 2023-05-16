// require('dotenv').config();
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;
import jwt_decode from 'jwt-decode';

export const refreshToken = async() => {
    const router = useRouter();
    try {
        const res = await axios.get('http://localhost:4000/login/refreshToken');
        setToken(res.data.accessToken);
        const decoded = jwt_decode(res.data.accessToken);
        Cookies.set('token', decoded,{expires: decoded.exp-5});
        setNmuser(decoded.nmuser);
        setExpire(decoded.exp);
    } catch (error) {
        if(error.response){
            router.push('/latihan/mentor/login');
        }
    }
}

export const cekToken = () => {
    const [iduser,setIduser] = useState('');
    const [nmuser,setNmuser] = useState('');
    const [token,setToken] = useState('');
    const [expire,setExpire] = useState('');
    const axiosJWT = axios.create();



    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            try {
            const resp = await axios.get('http://localhost:4000/login/refreshToken');
            config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
            setToken(resp.data.accessToken);
            const decoded = jwt_decode(resp.data.accessToken);
            Cookies.set('token', JSON.stringify(decoded),{expires: decoded.exp-5});
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
}

export const Logout = async() =>{
    try {
        await axios.delete('http://localhost:4000/login/logout');
    } catch (error) {
        console.log(error);
    }
}

const LoginPage = () => {
    const [iduser, setIduser] = useState('');
    const [password, setPassword] = useState('');
    const [thang, setThang] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const thangValues = [
        { name: '2023', thang: '2023' },
        { name: '2024', thang: '2024' }
    ];
    const Auth = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/login', {
                iduser: iduser,
                password: password,
                thang: thang.thang
            });
            const token = jwt_decode(res.data.accessToken);
            Cookies.set('token', JSON.stringify(token),{expires: token.exp-5});
            // console.log(res.data.accessToken);
            router.push("/latihan/mentor/Dashboard");
        } catch (error) {
            if (error.response){
                console.log(error.response.data.msg);
            }
        }
    }
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src='/demo/images/login/avatar.png' alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">DSW</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>
                        <form onSubmit={Auth}>
                            <div>
                                <label htmlFor="iduser" className="block text-900 text-xl font-medium mb-2">
                                    Userid
                                </label>
                                <InputText inputid="iduser" type="text" value={iduser} onChange={(e) => setIduser(e.target.value)} placeholder="iduser" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                    Password
                                </label>
                                <Password inputid="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="****" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>
                                <label htmlFor="thang" className="block text-900 text-xl font-medium mb-2">
                                    Tahun Anggaran
                                </label>
                                <Dropdown inputid="thang" value={thang} onChange={(e) => setThang(e.target.value)} options={thangValues} placeholder="Tahun Anggaran" className="w-full md:w-30rem mb-5" optionLabel="name" />

                                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                    <div className="flex align-items-center">
                                        <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                        <label htmlFor="rememberme1">Remember me</label>
                                    </div>
                                    <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                        Forgot password?
                                    </a>
                                </div>
                                <Button label="Sign In" className="w-full p-3 text-xl" ></Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
