import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../Layout'

const Reliability = () => {
  const state = useSelector(state => state)
  return (
    <Layout>Reliability {JSON.stringify(state)}</Layout>
  )
}

export default Reliability