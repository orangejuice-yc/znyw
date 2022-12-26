import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import '../css/module.less'

interface Props {
  xAixsData?:string[],
  dimension?: string | number,
  mode?: string | number,
  chartType?: string | number,
  checkedKeys?:string[]
}

const ChartModule: FC<Props> = ({ xAixsData,dimension,mode,chartType,checkedKeys }) => {
  const mockData = () => {
    let data = [];
    for(let i=0;i<5;i++){
      data.push((Math.random()*(90)+10).toFixed(2))
    }
    return data
  }

  console.log(dimension,mode,chartType,checkedKeys)

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
          data: mockData()
        }
        series.push(item)
     }
    }
    return series
  }
  option = {
    backgroundColor:'rgb(10,53,72)',
    color:[
      '#ff8a45',
      '#ff6e76',
      '#8d48e3',
      '#dd79ff',
      '#4992ff',
      '#fddd60',
      '#7cffb2',
      '#58d9f9',
      '#05c091',
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: checkedKeys
    },
    series: [
  
      {
        name: '线路及站点告警数量',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [80, 32, 90, 34, 90, 30, 30]
      }
    ]
  };

  
  // 4. 调用表格数据
  option && myChart.setOption(option,true); //notMerge设置为true解决数据变化图表不刷新问题
  window.onresize = () => {
    myChart.resize();
  };
}, [xAixsData,mode,chartType,checkedKeys])

  return (
    <div id='main'></div>
  )
}

export default ChartModule
