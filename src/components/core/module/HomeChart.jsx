// React
import React, { useEffect } from 'react';
// import React, { FC,useEffect } from 'react';
// import './App.css';
import './map.css'
import './bootstrap-slider.css'
import hrbmtr from './hrbmtr';

const ChartModule = () => {


  
  useEffect(() => {
// console.log(Slider)
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

    document.getElementById('move_left').addEventListener('click', function (ev) { svgMap.move(300, 0); });
        document.getElementById('move_right').addEventListener('click', function (ev) { svgMap.move(-300, 0); });
        document.getElementById('move_up').addEventListener('click', function (ev) { svgMap.move(0, 300); });
        document.getElementById('move_down').addEventListener('click', function (ev) { svgMap.move(0, -300); });
        //地图放大
        document.getElementById('zoom-in').addEventListener('click', function (ev) {
            map_slider.setValue(svgMap.getZoomLevel() + 1); 
            svgMap.zoomBy(map_slider.getValue());
        });
        //地图缩小
        document.getElementById('zoom-out').addEventListener('click', function (ev) {
            map_slider.setValue(svgMap.getZoomLevel() - 1); 
            svgMap.zoomBy(map_slider.getValue());
        });
  
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

  }, [])

  const clickLine = (line) => {
    // svgMap.showLine(line);
  }
  const SvgMapView = () => {
    return (
      <svg
      id='sw_svg'
      textRendering="geometricPrecision"
      // style={{backgroundColor:'rgb(10,53,72)'}}
      style={{backgroundColor:'#000'}}
    >
      <g id="g1"/>
    </svg>
    );
  };

  return (
    <div id='container'>
      <SvgMapView />
      <div id="map-controls">
          <div id="move-controls">
              <div></div><div id="move_up" className="move_button"></div><div></div>
              <div id="move_left" className="move_button"></div><div></div><div id="move_right" className="move_button"></div>
              <div></div><div id="move_down" className="move_button"></div><div></div>
          </div>
          <div id="zoom-in">+</div>
          <div id="zoom-out">-</div>
          <div id="north">北</div>
          <input id="map-zoom-slider" type="text" data-slider-min="0" data-slider-max="7" data-slider-step="1" data-slider-value="2" data-slider-orientation="vertical"/>
      </div>
      <div id="line-box">
          <div className="line-name" id='line0' style={{backgroundColor:'#00b0f0'}}>1号线</div>
          <div className="line-name" id='line1' style={{backgroundColor:'#f5ed4c'}}>2号线</div> 
          <div className="line-name" id='line2' style={{backgroundColor:'#00b050'}}>3号线</div> 
      </div>
    </div>
  )
}

export default ChartModule;