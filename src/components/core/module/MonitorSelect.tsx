import { Select,Segmented,Card, Col, Row } from 'antd';
import React, { FC,useState } from 'react';
// import * as echarts from 'echarts';
// import ChartModule from './ChartView'
// const { Content } = Layout;

interface Props {
  changeType: any,
  changeMajor:any
  // title: string
  // subTitle: string
}

const MonitorSelect:FC<Props> = ({changeMajor,changeType}) => {
  // const [major, setMajor] = useState<string>('所属专业1');
  // const [type, setType] = useState<string>('设备类型1');
  // const changeMajor = (value: string) => {
  //   console.log(`selected ${value}`);
  //   setMajor(value)
  // };
  // const changeType = (value: string) => {
  //   console.log(`selected ${value}`);
  //   setType(value)
  // };
  return (
      <div className='monitiorSelect'>
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
  )
};
export default MonitorSelect
