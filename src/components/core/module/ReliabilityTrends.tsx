import { Layout,Segmented,Tree,Row,Col,Statistic ,Card} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React, { FC,useState } from 'react';
import type { TreeProps } from 'antd/es/tree';
import { useSelector } from 'react-redux'
import MonitorLayout from './MonitorLayout'
import MonitorCharts from './MonitorCharts';
import MonitorSider from './MonitorSider';
import MonitorCompare from './MonitorCompare';
import ChartHeatMap from './ChartHeatMapView'
import ChartLine from './ChartLineView'
import StatisticView from './StatisticView';
import {columns,data,treeDataLine,treeDataState} from '../../../mock'


const Reliability = () => {
  const state = useSelector(state => state)
  const [value, setValue] = useState<string | number>('线路');
  const [mode, setMode] = useState<string | number>('设备完好率');
  const [time, setTime] = useState<string | number>('本年');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线','二号线']);
  const [chartType, setChartType] = useState<string | number>('热力图');
  const [lineTitle] = useState<string>('设备可靠性24H趋势曲线图');
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
          <Segmented options={['热力图', '折线图']} value={chartType} onChange={setChartType}/>
          {/* <Segmented size="small" options={['本年', '本月', '本周']} value={time} onChange={setTime} style={{textAlign:'right',marginTop:'10px'}}/> */}
          {chartType == '热力图'  && <ChartHeatMap dimension={value} mode={mode} time={time} checkedKeys={checkedKeys}/>}
          {chartType == '折线图'  && <ChartLine  lineTitle={lineTitle} dimension={value} mode={mode} time={time} checkedKeys={checkedKeys}/>}
        </MonitorCharts>
        <MonitorCompare>
          <StatisticView dimension={value} mode={mode} time={time} checkedKeys={checkedKeys}/>
        </MonitorCompare>
        
      </Layout> 
    </MonitorLayout>
  )
}

export default Reliability