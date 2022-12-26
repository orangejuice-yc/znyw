import React from 'react'
import { useSelector } from 'react-redux'
import HomeChart from './module/HomeChart'
const Home = () => {
  const state = useSelector(state => state)
  return (
    <div><HomeChart></HomeChart></div>
    
  )
}

export default Home
