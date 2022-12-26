// React
import React, { useEffect } from 'react';
import { Table,Select,Button } from 'antd';
// import React, { FC,useEffect } from 'react';
// import './App.css';
import '../css/map.css'
import '../css/bootstrap-slider.css'
import hrbmtr from './hrbmtr';

const ChartModule = () => {


  
  useEffect(() => {
    console.log(SvgMap)//eslint-disable-line
    if(BrowserType() == "0"){ //eslint-disable-line
        alert("您的浏览器不支持，请使用IE9以上版本浏览。");
        return;
    }

    let svgMap = new SvgMap('sw_svg',hrbmtr);//eslint-disable-line
    svgMap.init();
    svgMap.zoomBy(2);

    window.onresize = function () {
      svgMap.reSize();
      svgMap.reSizeAnimation();
    }

    //点击顶部线路button
    document.getElementById('line0').addEventListener('click', function () { svgMap.showLine(0) });
    document.getElementById('line1').addEventListener('click', function () { svgMap.showLine(1) });
    document.getElementById('line2').addEventListener('click', function () { svgMap.showLine(2) });

     //加载地图缩放滑条/
     let map_slider = new Slider("#map-zoom-slider", { min: 0, max: 7, value: 4, reversed :true,}); //eslint-disable-line
     map_slider.on('change',function(){
         svgMap.zoomBy(map_slider.getValue());
     });
    //  document.getElementsByClassName("move_button").addEventListener('onmouseover', function (ev) { 
    //   document.getElementById("move-controls").css("background-image","url(../../../images/"+this.id+".png)");
    //   })
    //  document.getElementsByClassName("move_button").onmouseover(function(){
    //      document.getElementById("move-controls").css("background-image","url(../../../images/"+this.id+".png)");
    //  });
    //  document.getElementsByClassName("move_button").onmouseout(function(){
    //   document.getElementById("move-controls").css("background-image","url(../../../images/mc_default.png)");
    //  });
    //  document.getElementsByClassName("move_button").onmousedown(function(){
    //   document.getElementById("move-controls").css("background-image","url(../../../images/"+this.id+"_md.png)");
    //  });
    //  document.getElementsByClassName("move_button").onmouseup(function(){
    //   document.getElementById("move-controls").css("background-image","url(../../../images/"+this.id+".png)");
    //  });
       //调整地图缩放滑条的位置
       svgMap.reSize();

    // document.getElementById('move_left').addEventListener('click', function (ev) { svgMap.move(300, 0); });
    //     document.getElementById('move_right').addEventListener('click', function (ev) { svgMap.move(-300, 0); });
    //     document.getElementById('move_up').addEventListener('click', function (ev) { svgMap.move(0, 300); });
    //     document.getElementById('move_down').addEventListener('click', function (ev) { svgMap.move(0, -300); });
    //     //地图放大
    //     document.getElementById('zoom-in').addEventListener('click', function (ev) {
    //         map_slider.setValue(svgMap.getZoomLevel() + 1); 
    //         svgMap.zoomBy(map_slider.getValue());
    //     });
    //     //地图缩小
    //     document.getElementById('zoom-out').addEventListener('click', function (ev) {
    //         map_slider.setValue(svgMap.getZoomLevel() - 1); 
    //         svgMap.zoomBy(map_slider.getValue());
    //     });
  
       //地图鼠标滚轮缩放
        var addEvent = (function(){
            if (window.addEventListener) {
                return function(el, sType, fn, capture) {
                    el.addEventListener(sType, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function(el, sType, fn, capture) {
                    el.attachEvent("on" + sType, fn);
                };
            } else {
                return function(){};
            }
        })(),
        mousewheel = BrowserType()=="FireFox" ? "DOMMouseScroll" : "mousewheel"; //eslint-disable-line
        addEvent(document.getElementById('sw_svg'), mousewheel, function(e) {
            e=e || window.event; 
            if(e.wheelDelta){//IE/Opera/Chrome 
                var value=e.wheelDelta;
            }else if(e.detail){//Firefox 
                var value= 0-e.detail; 
            }
            if(value>0){
                map_slider.setValue(svgMap.getZoomLevel() + 1);
            }else{
                map_slider.setValue(svgMap.getZoomLevel() - 1);
            }
            svgMap.zoomBy(map_slider.getValue(), e.clientX, e.clientY);
        }, false);


        //设置红点
        console.log(document.querySelectorAll('.svg-station'))
        const svgStationList = document.querySelectorAll('.line1'); //一号线红点 line1 line2
        for(let i=0;i<svgStationList.length;i++){
            svgStationList[i].classList.replace('svg-station','svg-station-red')
        }
        // document.querySelectorAll('.svg-station')[0].classList.replace('svg-station','svg-station-red')

  }, [])

  const SvgMapView = () => {
    return (
      <svg
      id='sw_svg'
      textRendering="geometricPrecision"
      style={{backgroundColor:'rgb(10,53,72)'}}
    //   style={{backgroundColor:'#000'}}
    >
      <g id="g1"/>
    </svg>
    );
  };
  const dataSource = [
    {
      key: '1',
      level: '三级',
      name:'列车交换机',
      time: '2022-12-21 15:39:32',
      detail: '故障详情内容故障详情内容故障详情内容',
    },
    {
        key: '2',
        level: '二级',
        name:'列车交换机',
        time: '2022-12-21 15:39:32',
        detail: '故障详情内容故障详情内容故障详情内容',
      },
      {
        key: '3',
        level: '一级',
        name:'列车交换机',
        time: '2022-12-21 15:39:32',
        detail: '故障详情内容故障详情内容故障详情内容',
      },
      {
        key: '4',
        level: '二级',
        name:'列车交换机',
        time: '2022-12-21 15:39:32',
        detail: '故障详情内容故障详情内容故障详情内容',
      },
  ];
  
  const columns = [
    {
      title: '故障等级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '故障时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
        title: '故障详情',
        dataIndex: 'detail',
        key: 'detail',
      },
  ];
  return (
    <div id='container'>
      <SvgMapView />
      <div id="map-controls">
          {/* <div id="move-controls">
              <div></div><div id="move_up" className="move_button"></div><div></div>
              <div id="move_left" className="move_button"></div><div></div><div id="move_right" className="move_button"></div>
              <div></div><div id="move_down" className="move_button"></div><div></div>
          </div> */}
          <div id="zoom-in">+</div>
          <div id="zoom-out">-</div>
          {/* <div id="north">北</div> */}
          <input id="map-zoom-slider" type="text" data-slider-min="0" data-slider-max="7" data-slider-step="1" data-slider-value="2" data-slider-orientation="vertical"/>
      </div>
      <div id="line-box" style={{right:'20px',left:'0'}}>
          <div className="line-name" id='line0' style={{backgroundColor:'#00b0f0'}}>1号线</div>
          <div className="line-name" id='line1' style={{backgroundColor:'#f5ed4c'}}>2号线</div> 
          <div className="line-name" id='line2' style={{backgroundColor:'#00b050'}}>3号线</div> 
      </div>
      <div id="station-box" style={{display:'none'}}>
        <div id="station">
        <div id="station-title">站点融合状态详情</div>
        <div id="station-close"><svg t="1671608552136" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2704" width="30" height="30"><path d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z" fill="#1296db" p-id="2705"></path></svg></div>
        <div id="station-content" style={{borderBottom: 'none'}}>
            <div style={{marginBottom:'10px'}}>
            <Select
                // defaultValue="lucy"
                style={{ width: 120,border:'1px solid #1898b4' }}
                placeholder="故障等级"
                options={[
                    {
                        value: '1',
                        label: '一级',
                    },
                    {
                        value: '2',
                        label: '二级',
                    },
                    {
                        value: '3',
                        label: '三级',
                    },
                ]}
                />&nbsp;&nbsp;
                <Select
                // defaultValue="lucy"
                style={{ width: 120,border:'1px solid #1898b4' }}
                placeholder="设备名称"
                options={[
                    {
                        value: '1',
                        label: '列车交换机',
                    },
                    {
                        value: '2',
                        label: '列车交换机',
                    },
                    {
                        value: '3',
                        label: '列车交换机',
                    },
                ]}
                />&nbsp;&nbsp;
                <Select
                // defaultValue="lucy"
                style={{ width: 120,border:'1px solid #1898b4' }}
                placeholder="故障类型"
                options={[
                    {
                        value: '1',
                        label: '系统故障',
                    },
                    {
                        value: '2',
                        label: '操作故障',
                    },
                    {
                        value: '3',
                        label: '信号故障',
                    },
                ]}
                />&nbsp;&nbsp;
                <Select
                // defaultValue="lucy"
                style={{ width: 120,border:'1px solid #1898b4' }}
                placeholder="故障时间"
                options={[
                    {
                        value: '1',
                        label: '系统故障',
                    },
                    {
                        value: '2',
                        label: '操作故障',
                    },
                    {
                        value: '3',
                        label: '信号故障',
                    },
                ]}
                />&nbsp;&nbsp;
                <Button type="primary">查询</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div> 
        </div>
       </div>
    </div>
  )
}

export default ChartModule;