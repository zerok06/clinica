import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

/* const rolePermissions = {
  '/admin/dashboard': ['admin'],
  '/editor/posts': ['admin', 'editor'],
  '/viewer/profile': ['admin', 'editor', 'viewer'],
  '/public/home': ['admin', 'editor', 'viewer'], // Ruta pública
}

function hasAccess(role: Role, endpoint: string) {
  const allowedRoles = rolePermissions[endpoint]

  // Si no existe la ruta en el objeto, se asume que está protegida
  if (!allowedRoles) {
    return false
  }

  // Si el rol del usuario está en la lista de roles permitidos, permite acceso
  return allowedRoles.includes(role)
} */

const middleware = async (req: NextRequest) => {
  try {
    const token = cookies().get('auth-cli')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
    const { payload } = await jwtVerify(token!, JWT_SECRET_KEY)
    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }
}

export const config = {
  matcher: [
    '/(!signin)',
    '/dashboard/:path*',
    '/',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
  ],
}

export default middleware
