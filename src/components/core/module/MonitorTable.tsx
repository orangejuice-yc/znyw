import { Layout,Card, Col, Row } from 'antd';
import React, { FC } from 'react';

const { Content } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}

const MonitorTable = () => {
  return (
    <Content className='monitiorTable'>
      {/* <Row gutter={24}>
        <Col span={24}>
          <Card title={<div style={{textAlign:'center'}}>设备可靠性详细展示</div>} bordered={false}>
           content
          </Card>
        </Col>
      </Row> */}
      content
    </Content>
  )
};
export default MonitorTable
