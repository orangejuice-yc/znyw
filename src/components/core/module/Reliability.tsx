import React from 'react'
import { useSelector } from 'react-redux'
import MonitorLayout from './MonitorLayout'

const Reliability = () => {
  const state = useSelector(state => state)
  return (
    <MonitorLayout>Reliability4234234234234 {JSON.stringify(state)}</MonitorLayout>
  )
}

export default Reliability