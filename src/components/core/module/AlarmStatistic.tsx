import { Layout,Segmented,Tree,Table,DatePicker, Select, Space, TimePicker } from 'antd';
import type { DatePickerProps, TimePickerProps } from 'antd';
import React, { FC,useState } from 'react';
// import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux'
import MonitorLayout from './MonitorLayout'
import MonitorCharts from './MonitorCharts';
import MonitorSider from './MonitorSider';
import MonitorTable from './MonitorTable';
import ChartBar from './ChartHorizontalBarView';
import ChartPie from './ChartPieView';
import ChartTimeBar from './ChartTimeBarView'
import {columns,data,treeDataLine,treeDataState} from '../../../mock'

const { Option } = Select;

type PickerType = 'time' | 'date' |'year' | 'month';
const PickerWithType = ({
    type,
    onChange,
  }: {
    type: PickerType;
    onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
  }) => {
    if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

const AlarmStatistic = () => {
  const state = useSelector(state => state)
  const [value, setValue] = useState<string | number>('线路');
  const [mode, setMode] = useState<string | number>('责任事故次数');
  const [chartType, setChartType] = useState<string | number>('柱状图');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线','二号线']);
  const [xAixsData] = useState<string[]>(['车辆系统', '信号系统', '硬件系统', '通讯系统', '安全系统']);
  const [type, setType] = useState<PickerType>('year');

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
            <Space>
                <Select value={type} onChange={setType}>
                    <Option value="year">年统计</Option>
                    <Option value="month">月统计</Option>
                </Select>
                <PickerWithType type={type} onChange={(value) => console.log(value)} />
            </Space>
          {/* <Segmented block options={['责任事故次数', '信号系统故障率', '车辆系统故障率']} value={mode} onChange={setMode}/> */}
          <Segmented options={['柱状图', '饼图']} value={chartType} onChange={setChartType} style={{textAlign:'right'}}/>
          {chartType == '柱状图' && <ChartBar xAixsData={xAixsData} dimension={value} mode={mode} chartType={chartType} checkedKeys={checkedKeys}/>}
          {chartType == '饼图' && <ChartPie xAixsData={xAixsData} dimension={value} mode={mode} chartType={chartType} checkedKeys={checkedKeys}/>}
        </MonitorCharts>
        <div style={{marginTop:'20px'}}></div>
        <MonitorCharts>
            <ChartTimeBar xAixsData={xAixsData} dimension={value} mode={mode} checkedKeys={checkedKeys}/>
        </MonitorCharts>
      </Layout> 
    </MonitorLayout>
  )
}

export default AlarmStatistic