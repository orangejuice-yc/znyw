import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import './module.less'
const ChartModule = () => {
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
  
  option = {
    backgroundColor:'#111',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    legend: {
      data: ['车站1', '车站2']
    },
    // toolbox: {
    //   show: true,
    //   orient: 'vertical',
    //   left: 'left',
    //   top: 'center',
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar', 'stack'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
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
    series: [
      {
        name: '车站1',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        showBackground: true,
        emphasis: {
          focus: 'series'
        },
        data: [90, 80, 70, 60, 50]
      },
      {
        name: '车站2',
        type: 'bar',
        label: labelOption,
        showBackground: true,
        emphasis: {
          focus: 'series'
        },
        data: [50, 60, 70, 80, 90]
      }
    ]
  };
  // 4. 调用表格数据
  option && myChart.setOption(option);
  
  window.onresize = function() {
    myChart.resize();
  };
}, [])

  return (
    <div id='main'></div>
  )
}

export default ChartModule
