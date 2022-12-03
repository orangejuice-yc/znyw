import { Layout, Table } from 'antd';
import React, { FC } from 'react';
import type { ColumnsType } from 'antd/es/table';
const { Content } = Layout;

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '设备名称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  // { title: 'Column 8', dataIndex: 'address', key: '8' },
  // {
  //   title: 'Action',
  //   key: 'operation',
  //   fixed: 'right',
  //   width: 100,
  //   render: () => <a>action</a>,
  // },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `设备 ${i + 1}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}


const MonitorTable = () => {
  return (
    <Content className='monitiorTable'>
      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
    </Content>
  )
};
export default MonitorTable
