// 实时数据
export const realTimeData = {
  option: {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['天然气', '压缩空气', '氧气', '氦气', '二氧化碳'],
      color: '#fff',
      fontSize: '.7rem', // 初始字体大小，在 responsive 中会自动缩放
      top: '15%',
    },
    grid: {
      top: '40%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    color: ['#FF4949', '#FFA74D', '#FFEA51', '#4BF0FF', '#44AFF0'],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h'],
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      name: '',
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      min: 0,
      max: 25,
    },
    series: [
      {
        name: '天然气',
        type: 'line',
        smooth: true,
        data: [24, 23, 22, 21, 20, 18, 16, 15, 14, 13, 12, 11],
        symbol: 'none',
      },
      {
        name: '压缩空气',
        type: 'line',
        smooth: true,
        data: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 17, 15],
        symbol: 'none',
      },
      {
        name: '氧气',
        type: 'line',
        smooth: true,
        data: [6, 7, 9, 8, 7, 6, 5, 6, 7, 8, 9, 10, 11, 9, 10],
        symbol: 'none',
      },
      {
        name: '氦气',
        type: 'line',
        smooth: true,
        data: [10, 9, 8, 10, 11, 10, 9, 8, 7, 6, 5, 10, 11, 10],
        symbol: 'none',
      },
      {
        name: '二氧化碳',
        type: 'line',
        smooth: true,
        data: [6, 7, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 7, 6, 5],
        symbol: 'none',
      },
    ],
  },
};
// 天然气
export const naturalGasData = {
  option: {
    // backgroundColor: "#141f56",
    tooltip: {
      show: 'true',
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.4)', // 背景
      padding: [8, 10], //内边距
      // extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
      formatter: function (params) {
        if (params.seriesName != '') {
          return params.name + ' ：  ' + params.value + ' 方';
        }
      },
    },
    grid: {
      borderWidth: 0,
      top: 20,
      bottom: 35,
      left: 40,
      right: 10,
      color: '#fff',
    },
    xAxis: [
      {
        type: 'category',

        axisTick: {
          show: false,
        },

        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        axisLabel: {
          inside: false,
          color: '#bac0c0',
          // fontWeight: 'normal',
          fontSize: '12',
          // formatter:function(val){
          //     return val.split("").join("\n")
          // },
        },
        data: ['2018', '2019', '2020', '2021', '2022'],
      },
      {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: ['2018', '2019', '2020', '2021', '2022'],
      },
    ],
    yAxis: {
      min: 10,
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      axisLabel: {
        color: '#bac0c0',
        // fontWeight: 'normal',
        fontSize: '12',
        formatter: '{value}',
      },
    },
    series: [
      {
        type: 'bar',
        zlevel: 2,
        barWidth: '20%',
        data: [23, 22, 20, 30, 22],
      },
      {
        name: '',
        type: 'bar',
        xAxisIndex: 1,
        zlevel: 1,
        barWidth: '20%',
        data: [23, 22, 20, 30, 22],
      },
    ],
  },
};
// 氧气
export const breathData = {
  option: {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '40%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    color: ['#FF4949'],
    xAxis: [
      {
        type: 'category',

        axisTick: {
          show: false,
        },

        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)',
          },
        },
        axisLabel: {
          inside: false,
          color: '#bac0c0',
          // fontWeight: 'normal',
          fontSize: '12',
          // formatter:function(val){
          //     return val.split("").join("\n")
          // },
        },
        data: ['2018', '2019', '2020', '2021', '2022'],
      },
      {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: ['2018', '2019', '2020', '2021', '2022'],
      },
    ],
    yAxis: {
      name: '',
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      min: 0,
      max: 40,
    },
    series: [
      {
        name: '氧气 ',
        type: 'line',
        smooth: true,
        data: [30, 23, 29, 21, 20],
        symbol: 'none',
      },
    ],
  },
};
// 报警
export const givealarmData = {
  option: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['0', '60%'],
        center: ['50%', '60%'],
        color: ['#e72325', '#98e002', '#2ca3fd'],
        label: {
          // normal: {
          //   formatter: '{b}\n{d}%',
          // },
        },
        data: [
          {
            value: 6,
            name: '检测报警',
          },
          {
            value: 50,
            name: '气压报警',
            selected: true,
          },
        ],
      },
    ],
  },
};
