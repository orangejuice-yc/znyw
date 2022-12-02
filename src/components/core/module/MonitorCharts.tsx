import { Layout,Segmented,Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import * as echarts from 'echarts';
import ChartModule from './ChartView'
const { Content } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}

const MonitorCharts = () => {
  return (
      <Content className='monitiorChart'>
        {/* <Row gutter={24}>
          <Col span={24}>
            <Card title={<div style={{textAlign:'center'}}>设备可靠性概览</div>} bordered={false}>
              <Segmented block options={['设备完好率', '设备可靠度', '设备停机率']} />
              <Segmented size="small" options={['本年', '本月', '本周']} style={{float:'right',marginTop:'10px'}}/>
              <ChartModule />
            </Card>
          </Col>
        </Row> */}
        <Segmented block options={['设备完好率', '设备可靠度', '设备停机率']} />
        <Segmented size="small" options={['本年', '本月', '本周']} style={{textAlign:'right',marginTop:'10px'}}/>
        <ChartModule />
      </Content>
  )
};
export default MonitorCharts
