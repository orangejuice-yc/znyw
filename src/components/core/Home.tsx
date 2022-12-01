import React from 'react'
import { useSelector } from 'react-redux'
import Layout from './Layout'

const Home = () => {
  const state = useSelector(state => state)
  return (
    <Layout>Home 342423423423{JSON.stringify(state)}</Layout>
  )
}

export default Home
