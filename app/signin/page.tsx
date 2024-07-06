import React from 'react'
import { authentication } from '@/lib/actions/auth/signin'
import Prueba from '@/components/Prueba'

const Login = async () => {
  return (
    <div>
      <form action={authentication}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button>login</button>
      </form>
      <Prueba />
    </div>
  )
}

export default Login
