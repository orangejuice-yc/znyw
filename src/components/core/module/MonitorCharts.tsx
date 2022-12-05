import { Layout,Segmented,Card, Col, Row } from 'antd';
import React, { FC } from 'react';
// import * as echarts from 'echarts';
// import ChartModule from './ChartView'
const { Content } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}

const MonitorCharts : FC<Props> = ({ children }) => {
  return (
      <Content className='monitiorChart'>
        {children}
      </Content>
  )
};
export default MonitorCharts
