import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import '../css/module.less'

interface Props {
  major?: string,
  type?:string,
  lineTitle?: string,
  dimension?: string | number,
  mode?: string | number,
  time?: string | number,
  checkedKeys?:string[]
}

const ChartModule: FC<Props> = ({ major,type,lineTitle,dimension,mode,time,checkedKeys }) => {
  const mockData = () => {
    let data = [];
    for(let i=0;i<24;i++){
      data.push((Math.random()*(90)+10).toFixed(2))
    }
    return data
  }

  useEffect(() => {
    type EChartsOption = echarts.EChartsOption;

var chartDom = document.getElementById('main2')!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;
// prettier-ignore
const colors = ['#5470C6', '#EE6666'];

option = {
  darkMode: true,
  color: colors,
  
  // backgroundColor:'rgb(10,53,72)',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '10%'
  },
  // toolbox: {
  //   feature: {
  //     dataView: { show: true, readOnly: false },
  //     restore: { show: true },
  //     saveAsImage: { show: true }
  //   }
  // },
  legend: {
    data: ['电压',  '电流']
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00','20:00','21:00','22:00','23:00']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '电压',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} V'
      }
    },

    {
      type: 'value',
      name: '电流',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} A'
      }
    }
  ],
  series: [
    {
      name: '电压',
      type: 'line',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: '电流',
      type: 'line',
      yAxisIndex: 1,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    }
  ]
};


option && myChart.setOption(option);
  window.onresize = () => {
    myChart.resize();
  };
}, [major,type,mode,time,checkedKeys])

  return (
    <div id='main2'></div>
  )
}

export default ChartModule
