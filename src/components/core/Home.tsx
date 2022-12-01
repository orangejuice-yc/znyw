import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const state = useSelector(state => state)
  return (
    <div>Home 342423423423{JSON.stringify(state)}</div>
  )
}

export default Home
