import { NextResponse } from 'next/server'
import   { NextRequest } from 'next/server';
export function middleware(request) {
//   const basicAuth = req.headers.get('authorization')
//   if (basicAuth) {
//     const auth = basicAuth.split(' ')[1]
//     const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')
//     if (user === 'mydmin' && pwd === 'mypassword') {
//       return NextResponse.next()
//     }
//   }
//   return new Response('Auth required', {
//     status: 401,
//     headers: {
//       'WWW-Authenticate': 'Basic realm="Secure Area"',
//     },
//   })
console.log('middleware.....');
return NextResponse.next()
}
export const config = {
    matcher: ['/latihan/:path*', '/dashboard/:path*']
  };