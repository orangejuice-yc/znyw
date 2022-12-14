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


const Reliability = () => {
  const state = useSelector(state => state)
  const [value, setValue] = useState<string | number>('线路');
  const [mode, setMode] = useState<string | number>('设备完好率');
  const [time, setTime] = useState<string | number>('本年');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线','二号线']);
  const [xAixsData] = useState<string[]>(['设备1', '设备2', '设备3', '设备4', '设备5']);
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
          <Segmented block options={['设备完好率', '设备可靠度', '设备停机率']} value={mode} onChange={setMode}/>
          <Segmented size="small" options={['本年', '本月', '本周']} value={time} onChange={setTime} style={{textAlign:'right',marginTop:'10px'}}/>
          <ChartBar xAixsData={xAixsData} dimension={value} mode={mode} time={time} checkedKeys={checkedKeys}/>
        </MonitorCharts>
        <MonitorTable>
          <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
        </MonitorTable>
      </Layout> 
    </MonitorLayout>
  )
}

export default Reliability