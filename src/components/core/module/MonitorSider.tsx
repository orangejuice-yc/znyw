import { Layout,Segmented } from 'antd';
import React, { useState } from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';

interface Props {
  children: React.ReactNode
  // title: string
  // subTitle: string
}

const { Sider } = Layout;
const treeDataState: DataNode[] = [
  {
    title: '一号线',
    key: 'line-1',
    disabled:true,
    children: [
      {
        title: '车站1',
        key: 'line1-state1'
      },
      {
        title: '车站2',
        key: 'line1-state2'
      },
      {
        title: '车站3',
        key: 'line1-state3'
      },
      {
        title: '车站4',
        key: 'line1-state4'
      },
      {
        title: '车站5',
        key: 'line1-state5'
      },
    ],
  },
  {
    title: '二号线',
    key: 'line-2',
    disabled:true,
    children: [
      {
        title: '车站1',
        key: 'line2-state1'
      },
      {
        title: '车站2',
        key: 'line2-state2'
      },
      {
        title: '车站3',
        key: 'line2-state3'
      },
      {
        title: '车站4',
        key: 'line2-state4'
      },
      {
        title: '车站5',
        key: 'line2-state5'
      },
    ],
  },
];

const treeDataLine: DataNode[] = [
  {
    title: '一号线',
    key: 'line1',
  },
  {
    title: '二号线',
    key: 'line2',
  },
];


const MonitorSider = () => {
  const [value, setValue] = useState<string | number>('线路');

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    // if(checkedKeys.length > 2) {
    //   return false
    // }
  };

  return (
      <Sider style={{paddingRight:'30px'}}>
        {/* <div style={{textAlign:'center'}}>对比维度</div> */}
        <Segmented block options={['线路', '车站']} defaultValue='线路' value={value} onChange={setValue} />
        <Tree
          checkable
          defaultExpandAll={true}
          // defaultExpandedKeys={[]}
          // defaultSelectedKeys={[]}
          // defaultCheckedKeys={[]}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={value == '线路' ? treeDataLine : value == '车站' ? treeDataState : []}
        />
      </Sider>
  )
};
export default MonitorSider
