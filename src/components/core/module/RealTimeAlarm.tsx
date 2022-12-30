import { Layout,Segmented,Tree,Table,DatePicker, Select, Space, TimePicker,Button, Form, Row, Col ,Modal} from 'antd';
import type { DatePickerProps, TimePickerProps } from 'antd';
import React, { FC,useState } from 'react';
// import type { MenuProps } from 'antd';
import { useSelector } from 'react-redux'
import MonitorLayout from './MonitorLayout'
// import MonitorCharts from './MonitorCharts';
import MonitorSider from './MonitorSider';
import type { ColumnsType } from 'antd/es/table';
import {columns,data,treeDataLine,treeDataState} from '../../../mock'
import ChartMultipleYLine from './ChartMultipleYLineView'
const { Option } = Select;
type LayoutType = Parameters<typeof Form>[0]['layout'];

type PickerType = 'time' | 'date' |'year' | 'month';
interface DataType {
  key: number;
  num:string;
  id:string;
  level:string;
  type:string;
  trigerType:string;
  content:string;
  time:string;
  line:string;
  station:string;
  specify:string;
  deviceType:string;
  device:string;
}
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

const RealTimeAlarm = () => {
  const state = useSelector(state => state)
  const [value, setValue] = useState<string | number>('车站');
  const [checkedKeys, setCheckedKeys] = useState<string[]>(['一号线-车站1','一号线-车站2','一号线-车站3']);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const [modalOpen, setModalOpen] = useState(false);
  // const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
  //   setFormLayout(layout);
  // };
  
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        }
      : null;

  const buttonItemLayout =
  formLayout === 'horizontal'
    ? {
        wrapperCol: { span: 6, offset: 18 },
      }
    : null;

  const onCheck = (checkedKeysValue : any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const showAlarmDes = (record :any) => {
    console.log(record);
    setModalOpen(true)
  }

  const columns: ColumnsType<DataType> = [             
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '告警编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '告警级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '告警类别',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '触发类型',
      key: 'trigerType',
      dataIndex: 'trigerType',
    },
    {
      title: '告警内容',
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: '告警时间',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: '线路',
      key: 'line',
      dataIndex: 'line',
    },
    {
      title: '车站',
      key: 'station',
      dataIndex: 'station',
    },
    {
      title: '专业',
      key: 'specify',
      dataIndex: 'specify',
    },
    {
      title: '设备类型',
      key: 'deviceType',
      dataIndex: 'deviceType',
    },
    {
      title: '设备',
      key: 'device',
      dataIndex: 'device',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={(record) => showAlarmDes(record)}>告警摘要</Button>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: 0,
      num:'1',
      id:'12345',
      level:'一般',
      type:'检测告警',
      trigerType:'平台检测',
      content:'该采集项值大于阈值40',
      time:'2022-05-14 17:39:40',
      line:'二号线',
      station:'西湖站，九堡站',
      specify:'轨道交通',
      deviceType:'风机',
      device:'扇叶'
    },
    {
      key: 0,
      num:'2',
      id:'12345',
      level:'一般',
      type:'检测告警',
      trigerType:'平台检测',
      content:'该采集项值大于阈值40',
      time:'2022-05-14 17:39:40',
      line:'二号线',
      station:'西湖站，九堡站',
      specify:'轨道交通',
      deviceType:'风机',
      device:'扇叶'
    },
    {
      key: 0,
      num:'3',
      id:'12345',
      level:'一般',
      type:'检测告警',
      trigerType:'平台检测',
      content:'该采集项值大于阈值40',
      time:'2022-05-14 17:39:40',
      line:'二号线',
      station:'西湖站，九堡站',
      specify:'轨道交通',
      deviceType:'风机',
      device:'扇叶'
    },
    {
      key: 0,
      num:'4',
      id:'12345',
      level:'一般',
      type:'检测告警',
      trigerType:'平台检测',
      content:'该采集项值大于阈值40',
      time:'2022-05-14 17:39:40',
      line:'二号线',
      station:'西湖站，九堡站',
      specify:'轨道交通',
      deviceType:'风机',
      device:'扇叶'
    },
  ];
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
        <Form
        {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          // className='formLayout'
        >
          <Row>
            <Col span={12}>
              <Form.Item label="专业" name='specify'>
                  <Select placeholder="请选择专业" >
                    <Select.Option value="1">专业一</Select.Option>
                    <Select.Option value="2">专业二</Select.Option>
                    <Select.Option value="3">专业三</Select.Option>
                  </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备类型" name='type'>
                  <Select placeholder="请选择设备类型">
                    <Select.Option value="1">设备类型1</Select.Option>
                    <Select.Option value="2">设备类型2</Select.Option>
                    <Select.Option value="3">设备类型3</Select.Option>
                  </Select>
                </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="告警级别" name='level'>
                <Select placeholder="请选择告警级别">
                  <Select.Option value="1">一级</Select.Option>
                  <Select.Option value="2">二级</Select.Option>
                  <Select.Option value="3">三级</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="触发类型" name='triggerType'>
                <Select placeholder="请选择触发类型">
                  <Select.Option value="1">触发类型1</Select.Option>
                  <Select.Option value="2">触发类型2</Select.Option>
                  <Select.Option value="3">触发类型3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
              <Form.Item {...buttonItemLayout}>
                <Button type="primary">查询</Button>&nbsp;&nbsp;
                <Button type="primary" onClick={() => {form.resetFields();}}>重置</Button>
              </Form.Item>

          </Form>

          <Table columns={columns} dataSource={data} />
          <Modal
            title="告警摘要"
            width={800}
            style={{left:'180px',top:'-100px'}}
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          >
            <ChartMultipleYLine />
          </Modal>
      </Layout> 
    </MonitorLayout>
  )
}

export default RealTimeAlarm