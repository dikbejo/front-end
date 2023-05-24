/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        SERVER_API : 'http://localhost:4000/',
        LOGIN_PAGE : '/latihan/mentor/login'
    }
};

module.exports = nextConfig;
