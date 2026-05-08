import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/signin', '/signup', '/verify'];


export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/static') ||
		pathname === '/favicon.ico' ||
		pathname.includes('.')
	) {
		return NextResponse.next();
	}
    
    const token = req.cookies.get('token')?.name;
    console.log('token: ', token)

    if(token){
         if(PUBLIC_PATHS.some((path) => pathname === path) || pathname.startsWith(`${PUBLIC_PATHS}/`)){
            const url = req.nextUrl.clone()
            url.pathname = '/'
        return NextResponse.redirect(url);
    };
    }

    if(PUBLIC_PATHS.some((path) => pathname === path) || pathname.startsWith(`${PUBLIC_PATHS}/`)){
        return NextResponse.next();
    };


    if(!token){
        const loginUrl  = req.nextUrl.clone();
        loginUrl.pathname = '/signin';
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    };

   

     return NextResponse.next();
}

export const config = {
	match: ['/((?!_next|api|_static|favicon.ico).*)'],
};
