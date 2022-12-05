import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import './module.less'

interface Props {
  lineTitle?: string,
  dimension?: string | number,
  mode?: string | number,
  time?: string | number,
  checkedKeys?:string[]
}

const ChartModule: FC<Props> = ({ lineTitle,dimension,mode,time,checkedKeys }) => {
  const mockData = () => {
    let data = [];
    for(let i=0;i<24;i++){
      data.push((Math.random()*(90)+10).toFixed(2))
    }
    return data
  }

  useEffect(() => {
    type EChartsOption = echarts.EChartsOption;

var chartDom = document.getElementById('main')!;
var myChart = echarts.init(chartDom);
var option: EChartsOption;
// prettier-ignore
option = {
  backgroundColor:'#111',
  title: {
    top: 20,
    left: 'center',
    text: lineTitle,
    textStyle:{
      color:'#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00','20:00','21:00','22:00','23:00']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} '
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    top: 70,
    pieces: [
      {
        lte: 6,
        color: 'green'
      },
      {
        gt: 6,
        lte: 8,
        color: 'red'
      },
      {
        gt: 8,
        lte: 14,
        color: 'green'
      },
      {
        gt: 14,
        lte: 17,
        color: 'red'
      },
      {
        gt: 17,
        color: 'green'
      }
    ]
  },
  series: [
    {
      name: 'Reliability',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: mockData(),
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: [
          // [
          //   {
          //     name: 'Morning Peak',
          //     xAxis: '07:30'
          //   },
          //   {
          //     xAxis: '10:00'
          //   }
          // ],
          // [
          //   {
          //     name: 'Evening Peak',
          //     xAxis: '17:30'
          //   },
          //   {
          //     xAxis: '21:15'
          //   }
          // ]
        ]
      }
    }
  ]
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
