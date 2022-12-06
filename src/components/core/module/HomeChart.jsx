import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import axios from 'axios';
import './module.less'
import baseURL from '../../../../config/config.default'

const ChartModule = () => {
  const mockData = () => {
    let data = [];
    for(let i=0;i<5;i++){
      data.push((Math.random()*(90)+10).toFixed(2))
    }
    return data
  }

  // console.log(dimension,mode,time,checkedKeys)

  const config = {headers: {

    'Content-Type': 'application/json;charset=utf-8'
    
    }}

  useEffect(() => {
    // var ROOT_PATH = 'https://echarts.apache.org/examples';
    var app = {};

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, 'dark');
    var option;
    new Promise(function (resolve, reject) {
      // if (typeof BMap !== 'undefined') {
      //   resolve(BMap)
      //   return true
      // }
      // window.onBMapCallback = function () {
      //   resolve(BMap)
      // }
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=syQuMCGH1ATl5Wz98v3AOoHhj7mucIrV&__ec_v__=20190126&callback=onBMapCallback'
      script.onerror = reject
      document.head.appendChild(script)
    })
    axios.get(baseURL + '/data/asset/data/lines-bus.json',config)
    .then(function (data) {
      let hStep = 300 / (data.length - 1);
      let busLines = [].concat.apply(
        [],
        data.map(function (busLine, idx) {
          let prevPt = [];
          let points = [];
          for (let i = 0; i < busLine.length; i += 2) {
            let pt = [busLine[i], busLine[i + 1]];
            if (i > 0) {
              pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
            }
            prevPt = pt;
            points.push([pt[0] / 1e4, pt[1] / 1e4]);
          }
          return {
            coords: points,
            lineStyle: {
              normal: {
                color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
              }
            }
          };
        })
      );
      myChart.setOption(
        (option = {
          bmap: {
            center: [116.46, 39.92],
            zoom: 10,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: 'water',
                  elementType: 'all',
                  stylers: {
                    color: '#031628'
                  }
                },
                {
                  featureType: 'land',
                  elementType: 'geometry',
                  stylers: {
                    color: '#000102'
                  }
                },
                {
                  featureType: 'highway',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'arterial',
                  elementType: 'geometry.stroke',
                  stylers: {
                    color: '#0b3d51'
                  }
                },
                {
                  featureType: 'local',
                  elementType: 'geometry',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'railway',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'railway',
                  elementType: 'geometry.stroke',
                  stylers: {
                    color: '#08304b'
                  }
                },
                {
                  featureType: 'subway',
                  elementType: 'geometry',
                  stylers: {
                    lightness: -70
                  }
                },
                {
                  featureType: 'building',
                  elementType: 'geometry.fill',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.fill',
                  stylers: {
                    color: '#857f7f'
                  }
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.stroke',
                  stylers: {
                    color: '#000000'
                  }
                },
                {
                  featureType: 'building',
                  elementType: 'geometry',
                  stylers: {
                    color: '#022338'
                  }
                },
                {
                  featureType: 'green',
                  elementType: 'geometry',
                  stylers: {
                    color: '#062032'
                  }
                },
                {
                  featureType: 'boundary',
                  elementType: 'all',
                  stylers: {
                    color: '#465b6c'
                  }
                },
                {
                  featureType: 'manmade',
                  elementType: 'all',
                  stylers: {
                    color: '#022338'
                  }
                },
                {
                  featureType: 'label',
                  elementType: 'all',
                  stylers: {
                    visibility: 'off'
                  }
                }
              ]
            }
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'bmap',
              polyline: true,
              data: busLines,
              silent: true,
              lineStyle: {
                // color: '#c23531',
                // color: 'rgb(200, 35, 45)',
                opacity: 0.2,
                width: 1
              },
              progressiveThreshold: 500,
              progressive: 200
            },
            {
              type: 'lines',
              coordinateSystem: 'bmap',
              polyline: true,
              data: busLines,
              lineStyle: {
                width: 0
              },
              effect: {
                constantSpeed: 20,
                show: true,
                trailLength: 0.1,
                symbolSize: 1.5
              },
              zlevel: 1
            }
          ]
        })
      );
    })
    .catch(function (error) {
      console.log(error);
    });

    
    option && myChart.setOption(option);
  window.onresize = () => {
    myChart.resize();
  };
}, [])

  return (
    <div id='main'></div>
  )
}

export default ChartModule
