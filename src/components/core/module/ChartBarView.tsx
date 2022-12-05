import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import './module.less'

interface Props {
  dimension?: string | number,
  mode?: string | number,
  time?: string | number,
  checkedKeys?:string[]
}

const ChartModule: FC<Props> = ({ dimension,mode,time,checkedKeys }) => {
  const getData = () => {
    let data = [];
    for(let i=0;i<5;i++){
      data.push((Math.random()*(90)+10).toFixed(2))
    }
    return data
  }

  console.log(dimension,mode,time,checkedKeys)

  useEffect(() => {
  var app: any = {};
  type EChartsOption = echarts.EChartsOption;
  
  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom, 'dark');
  var option: EChartsOption;
  
  const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight'
  ] as const;
  
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    // position: {
    //   options: posList.reduce(function (map, pos) {
    //     map[pos] = pos;
    //     return map;
    //   }, {} as Record<string, string>)
    // },
    distance: {
      min: 0,
      max: 100
    }
  };
  
  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      const labelOption: BarLabelOption = {
        rotate: app.config.rotate as BarLabelOption['rotate'],
        align: app.config.align as BarLabelOption['align'],
        verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
        position: app.config.position as BarLabelOption['position'],
        distance: app.config.distance as BarLabelOption['distance']
      };
      myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          }
        ]
      });
    }
  };
  
  type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;
  
  const labelOption: BarLabelOption = {
    show: true,
    position: app.config.position as BarLabelOption['position'],
    distance: app.config.distance as BarLabelOption['distance'],
    align: app.config.align as BarLabelOption['align'],
    verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
    rotate: app.config.rotate as BarLabelOption['rotate'],
    formatter: '{c}%  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };

  const getSeries = () => {
    let series:any[] = [];
    // console.log(11111,checkedKeys)
    if(checkedKeys && checkedKeys.length){
      for(let i = 0 ; i < checkedKeys.length ; i++){
        let item = {
          name: checkedKeys[i],
          type: 'bar',
          barGap: 0,
          label: labelOption,
          showBackground: true,
          emphasis: {
            focus: 'series'
          },
          data: getData()
        }
        series.push(item)
     }
    }
    return series
  }
  
  option = {
    backgroundColor:'#111',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: {
      data: checkedKeys
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: true },
        data: ['设备1', '设备2', '设备3', '设备4', '设备5'],
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel:{
          formatter: '{value} %'
        }
      }
    ],
    series: getSeries(),
  };
  
  // 4. 调用表格数据
  option && myChart.setOption(option,true); //notMerge设置为true解决数据变化图表不刷新问题
  window.onresize = () => {
    myChart.resize();
  };
}, [mode,time,checkedKeys])

  return (
    <div id='main'></div>
  )
}

export default ChartModule
