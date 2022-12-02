import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import Navigation from "./Navigation"
import {Outlet} from 'react-router-dom'
// import React from 'react';
// import 'antd/dist/antd.min.css'

// import 'antd/dist/antd.less';
// import { ConfigProvider } from 'antd';
import './Layout.less';
import axios from '../../api/axios'
import {getToken} from '../../api/api'
const { Content, Footer, Sider } = Layout;

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


// const callBackLogin = () => {
//   const data={

//   }
//   axios.post(getToken, data, false , '', false).then( (res:any) => {                 //获取token
//     sessionStorage.clear();
//     sessionStorage.setItem('token', res.data.data)       //token存储到sessionStorage
//   })
// }
// callBackLogin()

const LayoutModule= () => {
  return (
  <Layout style={{ minHeight: '100vh' }}>
    <Navigation />
  <Layout className="site-layout">
    <Content style={{ margin: '0 16px' }}>
      <div className="site-layout-background" style={{ padding: 20 }}>
        {/* {children} */}
        <Outlet />
      </div>
    </Content>
    {/* <Footer style={{ textAlign: 'center' }}>哈尔滨地铁智能运维系统 ©2022 Created by CYT</Footer> */}
  </Layout>
</Layout>
)
  };
export default LayoutModule
