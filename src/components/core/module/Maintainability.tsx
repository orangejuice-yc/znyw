import { Layout,Segmented,Tree,Table } from 'antd';
import React, { FC,useState } from 'react';
import type { TreeProps } from 'antd/es/tree';
import { useSelector } from 'react-redux'
import MonitorLayout from './MonitorLayout'
import MonitorCharts from './MonitorCharts';
import MonitorSider from './MonitorSider';
import MonitorTable from './MonitorTable';
import ChartBar from './ChartBarView'
import {columns,data,treeDataLine,treeDataState} from '../../../mock'


const Maintainability = () => {
  const state = useSelector(state => state)
  const [value, setValue] = useState<string | number>('线路');
  const [mode, setMode] = useState<string | number>('设备平均维修时间');
  const [time, setTime] = useState<string | number>('周统计');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线','二号线']);
  const [xAixsData] = useState<string[]>(['自动扶梯', '门禁系统', '设备X', '设备Y', '设备Z']);

  const onCheck = (checkedKeysValue : any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  return (

    <MonitorLayout>
      {/* Reliability{JSON.stringify(state)} */}
      <MonitorSider>
        {/* <div style={{textAlign:'center'}}>对比维度</div> */}
        <Segmented block options={['线路', '车站']} defaultValue='线路' value={value} onChange={setValue} />
        <Tree
          checkable
          defaultExpandAll={true}
          // defaultExpandedKeys={[]}
          // defaultSelectedKeys={[]}
          // defaultCheckedKeys={[]}
          // onSelect={onSelect}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          
          treeData={value == '线路' ? treeDataLine : value == '车站' ? treeDataState : []}
        />
      </MonitorSider>
      <Layout style={{overflow:'hidden'}}>
        <MonitorCharts>
          <Segmented block options={['设备平均维修时间', '维修及时率', '设备维修返工率','维修到位率']} value={mode} onChange={setMode}/>
          <Segmented size="small" options={['周统计', '月统计', '年统计']} value={time} onChange={setTime} style={{textAlign:'right',marginTop:'10px'}}/>
          <ChartBar xAixsData={xAixsData} dimension={value} mode={mode} checkedKeys={checkedKeys}/>
        </MonitorCharts>
        <MonitorTable>
          <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
        </MonitorTable>
      </Layout> 
    </MonitorLayout>
  )
}

export default Maintainability