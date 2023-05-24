import React, {useState,useEffect} from 'react'
import { AuthService } from '../../../demo/service/AuthService';
import { useRouter } from 'next/router';
import { refreshToken } from '../../../demo/service/AuthService';


const HarusLogin = () => {
  const [user, setUser] = ('');
  const router = useRouter();
  useEffect(() => {
    try {
      cek();
      // const d = refreshToken();
      // console.log('mmmmmmmmmmmmm');
      // console.log(d);
      // console.log('useeffect di harus login');
    } catch (error) {

      console.log('useeffect error');

      router.push('/latihan/mentor/login');

    }
    // const d = AuthService.refreshToken();
    // console.log(d);
    // console.log('useeffect');
  }, []);

  const cek = async () => {
    const d = await refreshToken();
    if (d.status=='error'){
      router.push('/latihan/mentor/login');
    }
    console.log('dddddd');
    console.log(d);
  }
  return (
    <div className="grid">
    <div className="col-12">
      <div className="card">
        <h5>Harus login</h5>
       
      </div>
    </div>
  </div>
  )
}

export default HarusLogin