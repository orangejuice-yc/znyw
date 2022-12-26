
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState,useEffect } from 'react';
import { useSelector } from "react-redux"
import { RouterState } from "connected-react-router"
import { useLocation,Link, matchRoutes } from "react-router-dom"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AppState } from "../../store/reducers/index"
import router from '../../router'
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

const Navigation = () => {
  // const rootSubmenuKeys = ['/monitor/reliability','/monitor/applicability','3'];
  const [defaultSelectedKeys,setDefaultSelectedKeys] = useState<string[]>([])
  const [defaultOpenKeys,setDefaultOpenKeys] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState(false);
  const [isInit,setIsInit] = useState(false);
  const location = useLocation();
  // const [openKeys, setOpenKeys] = useState<string[]>([]);

  // const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
  //   const latestOpenKey = keys.find((key) => defaultOpenKeys.indexOf(key) === -1);
  //   if (defaultOpenKeys.indexOf(latestOpenKey!) === -1) {
  //     setDefaultOpenKeys(keys);
  //   } else {
  //     setDefaultOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };

  useEffect(()=>{
    console.log(location)
    const routes = matchRoutes(router, location.pathname);
    let pathArr: string[] = [];
    if(routes !== null){
      for(let route of routes){
        
        let path = route.route.path;
        if(path){
          pathArr.push(path)
        }
        console.log(pathArr)
      }
    }
      setDefaultSelectedKeys(pathArr);
      setDefaultOpenKeys(pathArr);
      setIsInit(true)
  }, [location.pathname])
  if(!isInit){
    return null
  }
  // const KEYPATH = localStorage.getItem('KEYPATH')
  // const [openKeys, setOpenKeys] = useState(KEYPATH?.split(','));
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
  // const onClick: MenuProps['onClick'] = e => {
  //   console.log('click ', e.keyPath);
  //   localStorage.setItem('KEYPATH',e.keyPath.join(','))
  //   // setOpenKeys(e.keyPath);
  //   // setCurrent(e.keyPath);
    
  //   // const latestOpenKey = e.keyPath.find(key => openKeys.indexOf(key) === -1);
  //   // if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
  //   //   setOpenKeys(e.keyPath);
  //   // } else {
  //   //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   // }
  //   console.log(openKeys)
  // };
  const items: MenuItem[] = [
    getItem(<Link to="/">首页</Link>, '/',<UserOutlined />),
    getItem('监控中心', '/monitor', <UserOutlined />, [
      getItem('设备可靠性', '/monitor/reliability','',[
        getItem(<Link to="/monitor/reliability/data">线网设备可靠性平均指标</Link>, '/monitor/reliability/data'),
        getItem(<Link to="/monitor/reliability/trend">线网设备可靠性平均指标趋势</Link>, '/monitor/reliability/trend'),
        getItem('线网关键设备可靠性指标', '1-1-3')
      ]),
      getItem('设备可用性', '/monitor/applicability','',[
        getItem(<Link to="/monitor/applicability/data">线网设备可用性平均指标</Link>, '/monitor/applicability/data'),
        getItem(<Link to="/monitor/applicability/trend">线网设备可用性平均指标趋势</Link>, '/monitor/applicability/trend')
      ]),
      getItem('设备可维修性', '/monitor/maintainability','',[
        getItem(<Link to="/monitor/maintainability/data">线网设备维修平均指标</Link>, '/monitor/maintainability/data'),
        getItem(<Link to="/monitor/maintainability/trend">线网设备维修平均指标趋势</Link>, '/monitor/maintainability/trend'),
        getItem('线网设备近期计划巡检', '1-3-3'),
        getItem('线网设备当日故障工单', '1-3-4'),
        getItem('线网设备维修成本比例', '1-3-5')
      ]),
      getItem('设备安全性', '/monitor/security','',[
        getItem(<Link to="/monitor/security/data">线网设备安全性平均指标</Link>, '/monitor/security/data'),
        getItem(<Link to="/monitor/security/trend">线网设备安全性平均指标趋势</Link>, '/monitor/security/trend'),
      ]),
    ]),
    getItem('告警中心', '/alarm', <FileOutlined />,[
      getItem(<Link to="/alarm/statistic">告警统计</Link>, '/alarm/statistic'), 
      getItem(<Link to="/alarm/actualtime">实时告警</Link>, '/alarm/actualtime'),
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
    <Sider  collapsed={collapsed} onCollapse={value => setCollapsed(value)} style={{background:'#05222e'}}>
      {/* <div className="logo" /> */}
      <Menu 
      style={{background:'#05222e'}}
        theme="dark"  
        mode="inline" 
        // defaultSelectedKeys={['0']}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys} 
        // onOpenChange={onOpenChange}
        // onClick={onClick}
        items={items} />
    </Sider>
  )
};

export default Navigation;
