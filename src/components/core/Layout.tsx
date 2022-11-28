import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
// import React from 'react';
// import 'antd/dist/antd.min.css'

// import 'antd/dist/antd.less';
import { ConfigProvider } from 'antd';
import './Layout.less';
import axios from '../../api/axios'
import {getToken} from '../../api/api'
// import 'antd/dist/antd.variable.less';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  element?:React.ReactNode,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    element
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('监控中心', '1', <UserOutlined />, [
    getItem('设备可靠性', '1-1','',[
      getItem('线网设备可靠性平均指标', '1-1-1'),
      getItem('线网设备可靠性平均指标趋势', '1-1-2'),
      getItem('线网关键设备可靠性指标', '1-1-3')
    ]),
    getItem('设备可用性', '1-2','',[
      getItem('线网设备可用性平均指标', '1-2-1'),
      getItem('线网设备可用性平均指标趋势', '1-2-2')
    ]),
    getItem('设备可维修性', '1-3','',[
      getItem('线网设备维修平均指标', '1-3-1'),
      getItem('线网设备维修平均指标趋势', '1-3-2'),
      getItem('线网设备近期计划巡检', '1-3-3'),
      getItem('线网设备当日故障工单', '1-3-4'),
      getItem('线网设备维修成本比例', '1-3-5')
    ]),
    getItem('设备安全性', '1-4','',[
      getItem('线网设备安全性平均指标', '1-4-1'),
      getItem('线网设备安全性平均指标趋势', '1-4-2'),
    ]),
  ]),
  getItem('告警中心', '2', <FileOutlined />,[
    getItem('告警统计', '2-1'), 
    getItem('实时告警', '2-2'),
    getItem('历史告警', '2-3'),
  ]),
  getItem('分析中心', '3', <FileOutlined />,[
    getItem('检修成本分析', '6'), 
    getItem('检修绩效分析', '8'),
    getItem('检修绩效分析', '8'),
  ])
];
interface Props {
  children: React.ReactNode
}
// const LayoutModule : React.FC<Props> = ({children}) => {
//   return (
//     <div>
//     Layout {children}
//     </div>
//   )
// }
const callBackLogin = () => {
  const data={

  }
  axios.post(getToken, data, false , '', false).then( (res:any) => {                 //获取token
    sessionStorage.clear();
    sessionStorage.setItem('token', res.data.data)       //token存储到sessionStorage
  })
}
callBackLogin()

const LayoutModule: React.FC<Props> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
  // <ConfigProvider prefixCls="custom">
  <Layout style={{ minHeight: '100vh' }}>
  <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
    <div className="logo" />
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
  </Sider>
  <Layout className="site-layout">
    {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
    <Content style={{ margin: '0 16px' }}>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb> */}
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        Bill is a cat.
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
</Layout>
)
  // </ConfigProvider>
  };
export default LayoutModule
