import { Layout } from 'antd';
import React, { FC } from 'react';
// import MonitorCharts from './MonitorCharts';
// import MonitorSider from './MonitorSider';
// import MonitorTable from './MonitorTable';
import './module.less'
// const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode
}
// 监控中心layout
const MonitorLayout : FC<Props> = ({ children }) => {
  return (
    <Layout className='monitorLayout'>
      {children}
    </Layout>
)
  };
export default MonitorLayout


