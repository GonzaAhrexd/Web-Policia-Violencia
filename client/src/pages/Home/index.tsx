import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import  { useNavigate } from 'react-router-dom'



function Home() {
  const navigate = useNavigate();
  // @ts-ignore
  const { signUp, user, isAuthenticated} = useAuth()

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  }, [user, isAuthenticated])




  return (
    <div>Home</div>
  )
}

export default Home