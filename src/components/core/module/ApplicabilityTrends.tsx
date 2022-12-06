import { Layout,Segmented,Tree,Select } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React, { FC,useState } from 'react';
// import type { TreeProps } from 'antd/es/tree';
import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux'
import MonitorLayout from './MonitorLayout'
import MonitorCharts from './MonitorCharts';
import MonitorSider from './MonitorSider';
import MonitorCompare from './MonitorCompare';
import ChartHeatMap from './ChartHeatMapView'
import ChartLine from './ChartLineView'
import StatisticView from './StatisticView';
import {columns,data,treeDataLine,treeDataState} from '../../../mock'


const ApplicabilityTrends = () => {
  const state = useSelector(state => state)
  const [major, setMajor] = useState<string>('所属专业1');
  const [type, setType] = useState<string>('设备类型1');
  const [value, setValue] = useState<string | number>('线路');
  const [mode, setMode] = useState<string | number>('责任事故次数');
  const [time, setTime] = useState<string | number>('周统计');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线','二号线']);
  const [chartType, setChartType] = useState<string | number>('热力图');
  const [lineTitle] = useState<string>('设备可用性趋势曲线图');


  const onCheck = (checkedKeysValue : any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const changeMajor = (value: string) => {
    console.log(`selected ${value}`);
    setMajor(value)
  };
  const changeType = (value: string) => {
    console.log(`selected ${value}`);
    setType(value)
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
          <div>
          <span>所属专业：</span>
          <Select
            allowClear={true}
            placeholder="选择所属专业"
            optionFilterProp="children"
            onChange={changeMajor}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: '所属专业1',
                label: '所属专业1',
              },
              {
                value: '所属专业2',
                label: '所属专业2',
              },
              {
                value: '所属专业3',
                label: '所属专业3',
              },
            ]}
          />
          &nbsp;&nbsp;&nbsp;
          <span>设备类型：</span>
          <Select
            allowClear={true}
            placeholder="选择设备类型"
            optionFilterProp="children"
            onChange={changeType}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: '设备类型1',
                label: '设备类型1',
              },
              {
                value: '设备类型2',
                label: '设备类型2',
              },
              {
                value: '设备类型3',
                label: '设备类型3',
              },
            ]}
          />
          </div>
          {/* <Segmented block options={['责任事故次数', '信号系统故障率', '车辆系统故障率']} value={mode} onChange={setMode}/> */}
          {/* <Segmented options={['热力图', '折线图']} value={chartType} onChange={setChartType}/> */}
          <Segmented size="small" options={['周统计', '月统计', '年统计']} value={time} onChange={setTime} style={{textAlign:'right',marginTop:'10px'}}/>
          {/* {chartType == '热力图'  && <ChartHeatMap dimension={value} mode={mode} time={time} checkedKeys={checkedKeys}/>} */}
          <ChartLine lineTitle={lineTitle} dimension={value} mode={mode} time={time} major={major} type={type} checkedKeys={checkedKeys}/>
        </MonitorCharts>
        <MonitorCompare>
          <StatisticView dimension={value} mode={mode} time={time} checkedKeys={checkedKeys}/>
        </MonitorCompare>
        
      </Layout> 
    </MonitorLayout>
  )
}

export default ApplicabilityTrends