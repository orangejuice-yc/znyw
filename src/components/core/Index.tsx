import React from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'

const Index = () => {
  const state = useSelector(state => state)
  return (
    <div>index {JSON.stringify(state)}123124314</div>
  )
}

export default Index
