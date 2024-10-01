
import { NextResponse } from 'next/server';
import { isExpired } from 'react-jwt';

export function middleware(req) {
    const { searchParams } = new URL(req.url)
    let token
    token = searchParams.get("token");

    if (!token) {
        token = req.cookies.get("token")?.value
    }
    const isTokenExpired = isExpired(token);

    if (!isTokenExpired) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
    // return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
