import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import axios from 'axios';
import './module.less'
// import {baseURL} from '../../../config/config.default'

const ChartModule = () => {

  useEffect(() => {

     /* globals BMapSub */
     var subwayCityName = '哈尔滨';
     var list = BMapSub.SubwayCitiesList;
     console.log(list)
     var subwaycity = null;
     for (var i = 0; i < list.length; i++) {
         if (list[i].name === subwayCityName) {
             subwaycity = list[i];
             break;
         }
     }
     console.log(subwaycity)
     // 获取北京地铁数据-初始化地铁图
     var subway = new BMapSub.Subway('container', subwaycity.citycode);
     console.log(subway)
     subway.setZoom(0.8);
     var zoomControl  = new BMapSub.ZoomControl({
          offset: new BMapSub.Size(10,100)
      });
      subway.addEventListener('tap', function(e) {
        alert('您点击了"' + e.station.name + '"站');
    });
      subway.addControl(zoomControl);
    //站点标注
    var startIcon = new BMapSub.Icon(
        'https://api.map.baidu.com/images/subway/start-bak.png',
        new BMapSub.Size(50, 80)
    );
    var marker = new BMapSub.Marker('博物馆', {icon: startIcon});
    subway.addMarker(marker);
    subway.setCenter('博物馆');
    subway.setZoom(1);

    //信息窗口
    var infowindow = new BMapSub.InfoWindow(
      '<div id="bd-subwayInfo">'
      + '<div id="bd-subwayTitle">'
      + '博物馆站'
      + '</div>'
      + '</div>'
      ); 
      subway.openInfoWindow(infowindow, '博物馆站');
}, [])

  return (
    <div id='container'></div>
  )
}

export default ChartModule
