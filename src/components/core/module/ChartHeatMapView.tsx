import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import '../css/module.less'

interface Props {
  dimension?: string | number,
  mode?: string | number,
  time?: string | number,
  checkedKeys?:string[]
}

const ChartModule: FC<Props> = ({ dimension,mode,time,checkedKeys }) => {
  // const getData = () => {
  //   let data = [];
  //   for(let i=0;i<5;i++){
  //     data.push((Math.random()*(90)+10).toFixed(2))
  //   }
  //   return data
  // }

  // console.log(dimension,mode,time,checkedKeys)

  useEffect(() => {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom, 'dark');
    var option: EChartsOption;
    
    function getVirtualData(year: string) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data: [string, number][] = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }
    
    option = {
      backgroundColor:'rgb(10,53,72)',
      title: {
        top: 30,
        left: 'center',
        text: '设备可靠性每日热力图'
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 100
      },
      calendar: {
        top: 180,
        left: 30,
        right: 30,
        cellSize: ['auto', 20],
        range: '2022',
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: true }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2022')
      }
    };
    
    option && myChart.setOption(option);
  window.onresize = () => {
    myChart.resize();
  };
}, [mode,time,checkedKeys])

  return (
    <div id='main'></div>
  )
}

export default ChartModule
