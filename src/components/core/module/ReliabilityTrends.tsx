import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../Layout'

const ReliabilityTrends = () => {
  const state = useSelector(state => state)
  return (
    <Layout>ReliabilityTrends 5236425623236 {JSON.stringify(state)}</Layout>
  )
}

export default ReliabilityTrends