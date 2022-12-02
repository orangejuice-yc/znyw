import { Layout } from 'antd';
import React, { FC } from 'react';
import MonitorCharts from './MonitorCharts';
import MonitorSider from './MonitorSider';
import MonitorTable from './MonitorTable';
import './module.less'
const { Content, Sider } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}

const MonitorLayout : FC<Props> = ({ children }) => {
  return (
    <Layout className='monitorLayout'>
      <MonitorSider />
      <Layout style={{overflow:'hidden'}}>
        <MonitorCharts />
        <MonitorTable />
      </Layout>
    </Layout>
)
  };
export default MonitorLayout


