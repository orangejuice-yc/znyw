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
  let data:any = [];
  const mockData = () => {
    
    const _length:number = checkedKeys?.length || 0;
    for(let i=0;i<_length;i++){
      data.push(
        { value: (Math.random()*(90)+10).toFixed(2), 
          name: checkedKeys && checkedKeys[i]
        }
      )
    }
    console.log(data)
    // return data
  }

  console.log(dimension,mode,chartType,checkedKeys)

  useEffect(() => {
    console.log(mockData())
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
    legend: {
      top: 'bottom'
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     // restore: { show: true },
    //     // saveAsImage: { show: true }
    //   }
    // },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        color:[
          '#ff6e76',
          '#ff8a45',
          '#8d48e3',
          '#dd79ff',
          '#4992ff',
          '#fddd60',
          '#7cffb2',
          '#58d9f9',
          '#05c091',
        ],
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: data
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
