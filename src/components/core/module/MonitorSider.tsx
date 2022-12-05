import { Layout } from 'antd';
import React, { FC,useState } from 'react';

const { Sider } = Layout;
interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}

const MonitorSider : FC<Props> = ({ children }) => {

  return (
      <Sider style={{paddingRight:'30px'}}>
        {children}
      </Sider>
  )
};
export default MonitorSider
