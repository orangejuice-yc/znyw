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
  const [value, setValue] = useState<string | number>('车站');
  const [mode, setMode] = useState<string | number>('责任事故次数');
  const [chartType, setChartType] = useState<string | number>('柱状图');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线-车站1','一号线-车站2','一号线-车站3']);
  const [xAixsData, setXAixsData] = useState<string[]>(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']);
  const [type, setType] = useState<PickerType>('year');

  const onCheck = (checkedKeysValue : any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const changeType = (val:any) => {
    setType(val);
    if(val == 'year'){
        setXAixsData(['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'])
    }
  }

  const changeMonth = (val:any) => {
    const date = new Date(val);
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year,month+1,0).getDate();
    let dayArr = [];
    console.log(days);
    for(let i=1;i<=days; i++){
        dayArr.push(String(i))
    }
    // console.log(dayArr)
    setXAixsData(dayArr);
    // console.log(xAixsData)
    // setType(val);
  }
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
                <Select value={type} onChange={changeType}>
                    <Option value="year">年统计</Option>
                    <Option value="month">月统计</Option>
                </Select>
                <PickerWithType type={type} onChange={changeMonth} />
            </Space>
          {/* <Segmented block options={['责任事故次数', '信号系统故障率', '车辆系统故障率']} value={mode} onChange={setMode}/> */}
          <div style={{marginTop:'20px'}}><Segmented options={['柱状图', '饼图']} value={chartType} onChange={setChartType} style={{textAlign:'right'}}/></div>
          {chartType == '柱状图' && <ChartBar xAixsData={xAixsData} dimension={value} mode={mode} chartType={chartType} checkedKeys={checkedKeys}/>}
          {chartType == '饼图' && <ChartPie xAixsData={xAixsData} dimension={value} mode={mode} chartType={chartType} checkedKeys={checkedKeys}/>}
        </MonitorCharts>
        <div style={{marginTop:'20px'}}></div>
        <MonitorCharts>
            <ChartTimeBar xAixsData={xAixsData} type={type} dimension={value} mode={mode} checkedKeys={checkedKeys}/>
        </MonitorCharts>
      </Layout> 
    </MonitorLayout>
  )
}

export default AlarmStatistic