import { Layout, Table } from 'antd';
import React, { FC } from 'react';
// import type { ColumnsType } from 'antd/es/table';
const { Content } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}


const MonitorTable : FC<Props> = ({ children }) => {
  return (
    <Content className='monitiorTable'>
      {children}
    </Content>
  )
};
export default MonitorTable
