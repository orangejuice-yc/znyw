
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState,useEffect } from 'react';
import { useSelector } from "react-redux"
import { RouterState } from "connected-react-router"
import { useLocation,Link } from "react-router-dom"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AppState } from "../../store/reducers/index"
// import React from 'react';
// import 'antd/dist/antd.min.css'

// import 'antd/dist/antd.less';
// import { ConfigProvider } from 'antd';
import './Layout.less';
// import axios from '../../api/axios'
// import {getToken} from '../../api/api'
    
const { Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label?: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  element?:React.ReactNode,
  path?:String
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    element,
    path
  } as MenuItem;
}

const rootSubmenuKeys = ['0','1','1-1','1-1-1','1-1-2']
const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {pathname} = location;
  useEffect(()=>{
    // console.log(pathname)
  }, [location])
  const KEYPATH = localStorage.getItem('KEYPATH')
  const [openKeys, setOpenKeys] = useState(KEYPATH?.split(','));
  // const router = useSelector<AppState, RouterState>(state => state.router)
  // const pathname = router.location
  // console.log(pathname)
  // const navigate = useNavigate();
  
  // const [current, setCurrent] = useState(['0']);

  

  // const onOpenChange: MenuProps['onOpenChange'] = keys => {
  //   const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e.keyPath);
    localStorage.setItem('KEYPATH',e.keyPath.join(','))
    // setOpenKeys(e.keyPath);
    // setCurrent(e.keyPath);
    
    // const latestOpenKey = e.keyPath.find(key => openKeys.indexOf(key) === -1);
    // if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    //   setOpenKeys(e.keyPath);
    // } else {
    //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    // }
    console.log(openKeys)
  };
  const items: MenuItem[] = [
    getItem(<Link to="/">首页</Link>, '0',<UserOutlined />),
    getItem('监控中心', '1', <UserOutlined />, [
      getItem('设备可靠性', '1-1','',[
        getItem(<Link to="/reliability">线网设备可靠性平均指标</Link>, '1-1-1'),
        getItem(<Link to="/reliability/trend">线网设备可靠性平均指标趋势</Link>, '1-1-2'),
        getItem('线网关键设备可靠性指标', '1-1-3')
      ]),
      getItem('设备可用性', '1-2','',[
        getItem('线网设备可用性平均指标', '1-2-1'),
        getItem('线网设备可用性平均指标趋势', '1-2-2')
      ]),
      getItem('设备可维修性', '1-3','',[
        getItem('线网设备维修平均指标', '1-3-1'),
        getItem('线网设备维修平均指标趋势', '1-3-2'),
        getItem('线网设备近期计划巡检', '1-3-3'),
        getItem('线网设备当日故障工单', '1-3-4'),
        getItem('线网设备维修成本比例', '1-3-5')
      ]),
      getItem('设备安全性', '1-4','',[
        getItem('线网设备安全性平均指标', '1-4-1'),
        getItem('线网设备安全性平均指标趋势', '1-4-2'),
      ]),
    ]),
    getItem('告警中心', '2', <FileOutlined />,[
      getItem('告警统计', '2-1'), 
      getItem('实时告警', '2-2'),
      getItem('历史告警', '2-3'),
    ]),
    getItem('分析中心', '3', <FileOutlined />,[
      getItem('设备故障分析', '3-1','',[
        getItem('某专业设备故障分析', '3-1-1'),
      ]),
      getItem('设备健康分析', '3-2','',[
        getItem('设备健康分值展示', '3-2-1'),
        getItem('设备健康分均值排名', '3-2-2'),
        getItem('设备健康分对比', '3-2-3')
      ]),
      getItem('设备检修分析', '3-3','',[
        getItem('检修成本分析', '3-3-1'), 
        getItem('检修绩效分析', '3-3-2'),
        getItem('供应商分析', '3-3-3'),
      ]),
      
    ])
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className="logo" />
      <Menu 
        theme="dark"  
        mode="inline" 
        defaultSelectedKeys={openKeys}
        defaultOpenKeys={openKeys} 
        onClick={onClick}
        items={items} />
    </Sider>
  )
};

export default Navigation;
