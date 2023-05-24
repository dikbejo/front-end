import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { refreshToken } from '../demo/service/AuthService';
import Cookies from 'js-cookie';

// import { refreshToken } from '../demo/service/AuthUtil';

export default function MyApp({ Component, pageProps }) {
    // console.log('_app');
    // console.log(d);
    // console.log(Cookies.get('token'));
    // console.log(JSON.stringify(Cookies.get('token')));
    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
}
