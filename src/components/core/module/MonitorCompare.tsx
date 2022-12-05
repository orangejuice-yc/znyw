import { Layout } from 'antd';
import React, { FC } from 'react';
// import type { ColumnsType } from 'antd/es/table';

const { Content } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}


const MonitorCompare : FC<Props> = ({ children }) => {
  return (
    <Content className='monitiorCompare'>
      {children}
    </Content>
  )
};
export default MonitorCompare
