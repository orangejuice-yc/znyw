import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../Layout'

const ReliabilityTrends = () => {
  const state = useSelector(state => state)
  return (
    <Layout>ReliabilityTrends {JSON.stringify(state)}</Layout>
  )
}

export default ReliabilityTrends