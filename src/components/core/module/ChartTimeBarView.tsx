import * as echarts from 'echarts';
import React, { FC,useEffect } from 'react';
import '../css/module.less'

interface Props {
  xAixsData?:string[],
  dimension?: string | number,
  mode?: string | number,
  time?: string | number,
  checkedKeys?:string[]
}

const ChartModule: FC<Props> = ({ xAixsData,dimension,mode,time,checkedKeys }) => {
  const mockData = () => {
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
  
  var chartDom = document.getElementById('main1')!;
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
      '#58d9f9',
      '#05c091',
      '#8d48e3',
      '#dd79ff',
      '#4992ff',
      '#fddd60',
      '#7cffb2',
      '#ff8a45',
      '#ff6e76',
    ],
    // title: {
    //   text: '年度告警数量',
    //   // subtext: 'Fake Data'
    // },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['年度告警数量']
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '年度告警数量',
        type: 'bar',
        data: [
          20, 49, 70, 23, 25, 76, 135, 162, 32, 20, 64, 33
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
    ]
  };
  // 4. 调用表格数据
  option && myChart.setOption(option,true); //notMerge设置为true解决数据变化图表不刷新问题
  window.onresize = () => {
    myChart.resize();
  };
}, [xAixsData,mode,time,checkedKeys])

  return (
    <div id='main1'></div>
  )
}

export default ChartModule
