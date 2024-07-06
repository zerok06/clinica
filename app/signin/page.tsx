'use client'
import React from 'react'
import { authentication, getSession } from '@/lib/actions/auth/signin'

const Login = async () => {
  return (
    <div>
      <form action={data => authentication(data).then(res => console.log(res))}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button>login</button>
      </form>
    </div>
  )
}

export default Login
