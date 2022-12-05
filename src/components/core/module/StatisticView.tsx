import React, { FC,useEffect } from 'react';
import { Layout,Segmented,Tree,Row,Col,Statistic ,Card} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

interface Props {
  dimension?: string | number,
  mode?: string | number,
  time?: string | number,
  checkedKeys?:string[]
}

const StatisticView: FC<Props> = ({ dimension,mode,time,checkedKeys }) => {
  const mockData = () => {
    let data = (Math.random()*(90)+10).toFixed(2);
    return data
  }

  useEffect(() => {

}, [mode,time,checkedKeys])

  return (
    <div className="site-statistic-demo-card">
    {/* 第一行 */}
    <Row gutter={16} style={{marginTop:'16px',marginBottom:'16px'}}>
      <Col span={12}>
        <Row>
        <Col span={12}>
          <Card>
            <Statistic
              title="今日"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="昨日"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        </Row>
      </Col>

      <Col span={12}>
      <Row>
        <Col span={12}>
          <Card>
            <Statistic
              title="本周"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="上周"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        </Row>
      </Col>
    </Row>
    {/* 第二行 */}
    <Row gutter={16} style={{marginBottom:'16px'}}>
    <Col span={12}>
        <Row>
        <Col span={12}>
          <Card>
            <Statistic
              title="本月"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="上月"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        </Row>
      </Col>

      <Col span={12}>
      <Row>
        <Col span={12}>
          <Card>
            <Statistic
              title="本年度"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="上年度"
              value={mockData()}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        </Row>
      </Col>
    </Row>
    {/* 第三行 */}
    <Row gutter={16}>
      <Col span={12}>
      <Card><Statistic title="本月平均值" value={mockData()} suffix="%" /></Card>
      </Col>
      <Col span={12}>
      <Card><Statistic title="本年平均值" value={mockData()} suffix="%" /></Card>
      </Col>
    </Row>
    </div>
  )
}

export default StatisticView
