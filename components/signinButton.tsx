'use client'
import React from 'react'

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";


export default function SigninButton() {
  return (
    <button
        onClick={() => signIn("github", { callbackUrl: "/admin" })}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full disabled:opacity-50 flex justify-center items-center">
    
        <FaGithub className="mr-2" />
        Sign in with GitHub 
        
  </button>
  )
}
