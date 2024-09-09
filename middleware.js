import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'


const allowedOrigins = ['*']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function middleware(request) {

  if(request.nextUrl.pathname.startsWith('/api')) {
    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin) || allowedOrigins.includes('*')
  
    // Handle preflighted requests
    const isPreflight = request.method === 'OPTIONS'
  
    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
      }
      return NextResponse.json({}, { headers: preflightHeaders })
    }
  
    // Handle simple requests
    const response = NextResponse.next()
  
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
  
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
  
    return response

  }

}








const isProtectedRoute = createRouteMatcher([
  '/admin(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  return middleware(req)
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};