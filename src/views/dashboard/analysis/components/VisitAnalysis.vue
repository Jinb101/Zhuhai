<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props.ts';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  var data_in = [
    918.32, 902.51, 900.41, 873.43, 885.39, 897.63, 892.44, 879.04, 850.83, 848.52, 844.87, 834.54,
    832.48, 815.48, 811.23, 821.2, 805.1, 794.49, 801.23, 788.8, 769.7, 789.8, 763.46, 758.57,
    773.49, 764.45, 739.66, 757.55, 731.12, 724.06, 732.7, 723.8, 714.91, 723.46, 705.1, 708.9,
    723.75, 703.06, 684.51, 692.63, 683.14, 671.95, 691.97, 684.04, 667.59, 688.56, 659.01, 652.39,
    670.98, 638.1, 655.85, 627.21, 648.82, 631.68, 614.94, 642.69, 626.22, 613.44, 641.15, 613.9,
    601.39, 623.22, 602.94, 589.9, 612.01, 590.85, 591.51, 585.67, 559.47, 557.43, 518.2, 504.63,
    506.67, 512.66, 440.93, 614.94, 642.69, 626.22, 613.44, 641.15, 613.9, 601.39, 623.22, 602.94,
    598.28, 593.18, 625.85, 625.43, 611.52, 660.33, 669.41, 707.86, 729.56, 728.72, 770.35, 800.78,
    791.52, 797.62, 808.94, 625.43, 611.52, 660.33, 669.41, 707.86, 729.56, 728.72, 770.35, 800.78,
    676.64, 598.28, 593.18, 625.85, 625.43, 611.52, 660.33, 669.41, 707.86, 729.56, 728.72, 770.35,
    800.78, 791.52, 797.62, 808.94, 817.76, 797.77, 806.65, 763.81, 771.01, 796.27, 777.58, 776.37,
    821.18, 814.54, 832.37, 853.91, 870.55, 861.75, 888.66, 888.6, 910.95, 934.58, 920.79, 923.61,
    921.88, 1096.03, 1041.94, 951.67, 932.29, 935.73, 941.29, 944.34, 965.24, 928.95, 943.34,
    968.91, 977.17, 941.77, 964.47, 964.86, 926.3, 929.23, 934.07, 974.39, 977.48, 953.9, 929.79,
    948.32, 943.09, 933.89, 948.3, 934.66, 936.59, 958.61, 930.23, 927.04, 966.15, 923.08, 887.6,
    924.59, 909.7, 889.48, 892.51, 906.88, 907.99, 927.54, 902.11, 902.41, 940.2, 937.34, 952.79,
    952.53, 944.37, 952.09, 924.2, 924.65, 939.26, 967.97, 988.18, 1017.07, 1007.07, 1014.48,
    1016.72, 1007.58, 974.98, 1053.01, 1044.22, 1038.93, 1029.5, 1093.14, 1124.3, 1120.13, 1123.74,
    1105.22, 1132.26, 1124.54, 1137.46, 1177.16, 1114.36, 1087.06, 1096.11, 1083.61, 1096.21,
    1069.42, 1090.59, 1081.66, 1095.27, 1105.93, 1098.18, 1102.24, 1115.35, 1127.81, 1139.65,
    1159.92, 1180.29, 1157.27, 1201.08, 1186.57, 1200.8, 1244.75, 1216.21, 1199.9, 1224.75, 1188.85,
    1180.26, 1151.1, 1173.41, 1156.91, 1160.99, 1160.67, 1158.08, 1129.06, 1100.04, 1068.78,
    1102.13, 1079.86, 1029.01, 1032.81, 995.74, 979.22, 924.57, 901.16, 868.52, 964.42, 902.96,
    899.91, 902.52, 926.63, 899.92, 911.75, 879.48, 857.78, 862.7, 868.01, 868.61, 867.72, 831.92,
    841.49, 828.46, 918.32, 902.51, 900.41, 873.43, 885.39, 897.63, 892.44, 879.04, 850.83, 848.52,
    918.32, 902.51, 900.41, 873.43, 885.39, 897.63, 892.44, 879.04, 850.83, 848.52, 844.87, 834.54,
    832.48, 815.48, 811.23, 821.2, 805.1, 794.49, 801.23, 788.8, 769.7, 789.8, 763.46, 758.57,
    773.49, 764.45, 739.66, 757.55, 731.12, 724.06, 732.7, 723.8, 714.91, 723.46, 705.1, 708.9,
    723.75, 703.06, 684.51, 692.63, 683.14,
  ];
  var oneDay = 24 * 3600 * 1000;
  var fiveMinutes = 300 * 1000;
  var timestr = '2016/2/18 00:00:00';
  var startTime = +new Date(timestr) - fiveMinutes;
  // var chart = echarts.init(document.getElementById("chart"));
  //把new Date出来的时间格式转换为data123中的日期格式
  function riqigeshi(now) {
    return now.toLocaleDateString() + ' ' + now.getHours() + now.toLocaleTimeString().substr(-6, 6);
  }

  //用来返回data123一样的数据格式
  function chartData(i, data, now) {
    return {
      value: [riqigeshi(now), data[i] / 1024],
    };
  }

  //把原数据改成data123一样的格式
  function changeData(datain) {
    var liuru = [];
    for (var i = 0; i < 289; i++) {
      startTime = new Date(+startTime + fiveMinutes);
      liuru.push(chartData(i, datain, startTime));
    }
    return liuru;
  }
  var liuru = changeData(data_in);
  let liuruNew = JSON.parse(JSON.stringify(liuru));

  function refresh() {
    // liuru先shift(),再push()
    let liuruShift = liuru.shift();
    let liuruShiftVal = liuruShift.value[1];
    let liuruNewShift = liuruNew.shift();
    let liuruNewShiftVal = liuruNewShift.value[1];
    var newlrtime = riqigeshi(new Date(+new Date(liuruShift.value[0]) + oneDay + fiveMinutes));
    liuru.push({ value: [newlrtime, liuruShiftVal] });
    liuruNew.push({ value: [newlrtime, liuruNewShiftVal - 0.1] });
    // console.log(liuruNew)
    setOptions(
      {
        series: [
          {
            data: liuru,
          },
          {
            data: liuruNew,
          },
          {
            data: liuruNew,
          },
        ],
      },
      false,
    );
  }

  // setInterval(function () {
  //   refresh();
  // }, 1000);

  onMounted(() => {
    setOptions({
      // grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      grid: { x: '3.6%', y: '5%', x2: '2.4%', y2: '12%' },
      xAxis: {
        type: 'time',
        splitNumber: 24,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} G', //给Y轴上的刻度加上单位
        },
      },
      dataZoom: [
        {
          type: 'slider', //数据滑块
          start: 0,
          minSpan: 8, //5min
          // minSpan:16,   //10min
          // minSpan:24,   //15min
          // minSpan:50,   //30min
          dataBackground: {
            lineStyle: {
              color: '#95BC2F',
            },
            areaStyle: {
              color: '#95BC2F',
              opacity: 1,
            },
          },
          // fillerColor:'rgba(255,255,255,.6)'
        },
        {
          type: 'inside', //使鼠标在图表中时滚轮可用
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          var result = params[0].value[0];
          params.forEach(function (item) {
            result += '<br/>';
            result +=
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
              item.color +
              '"></span>';
            result += item.seriesName + '：';
            result += isNaN(item.value[1]) ? 0 : (item.value[1] * 1024).toFixed(2) + 'M';
          });
          return result;
        },
      },
      series: [
        {
          name: '流入',
          type: 'line',
          showSymbol: false,
          symbolSize: 12,
          data: liuru,
        },
        // {
        //   name: 'Precipitation',
        //   type: 'bar',
        //   tooltip: {
        //     valueFormatter: function (value) {
        //       return value + ' ml';
        //     },
        //   },
        //   data: liuru,
        // },
        {
          name: '注册总量',
          type: 'line',
          // smooth: true, //是否平滑曲线显示
          // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbol: 'none',
          // symbolSize: 6,
          lineStyle: {
            normal: {
              // color: '#28ffb3', // 线条颜色
              color: '#0080ff', // 线条颜色
            },
            borderColor: '#f0f',
          },
          // label: {
          //   show: true,
          //   position: 'top',
          //   textStyle: {
          //     color: '#fff',
          //   },
          // },
          // itemStyle: {
          //   normal: {
          //     color: '#28ffb3',
          //   },
          // },
          // tooltip: {
          //   show: false,
          // },
          areaStyle: {
            //区域填充样式
            normal: {
              color: '#adebf155',
              shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
              shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            },
          },
          data: liuru,
        },
      ],
    });
    setInterval(function () {
      refresh();
    }, 1000);
  });
</script>
