<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { basicProps } from './props.ts';
  import moment from 'moment';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  function generateRandomNumbers(): number[] {
    const numbers: number[] = [];

    for (let i = 0; i < 330; i++) {
      const random = Math.random() * (25 - 22) + 22;
      const rounded = Math.round(random * 100) / 100; // 保留两位小数
      numbers.push(rounded);
    }

    return numbers;
  }

  var data_in = generateRandomNumbers();
  var oneDay = 24 * 3600 * 1000;
  var fiveMinutes = 300 * 1000;
  var timestr = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString();
  var startTime = +new Date(timestr) - fiveMinutes;
  // var chart = echarts.init(document.getElementById("chart"));
  //把new Date出来的时间格式转换为data123中的日期格式
  function riqigeshi(now) {
    return now.toLocaleDateString() + ' ' + now.getHours() + now.toLocaleTimeString().substr(-6, 6);
  }

  //用来返回data123一样的数据格式
  function chartData(i, data, now) {
    return {
      value: [riqigeshi(now), data[i]],
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
      grid: { x: '5%', y: '5%', x2: '2.4%', y2: '12%' },
      xAxis: {
        type: 'time',
        splitNumber: 24,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} ℃', //给Y轴上的刻度加上单位
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
            result += isNaN(item.value[1]) ? 0 : item.value[1].toFixed(2) + '℃';
          });
          return result;
        },
      },
      series: [
        {
          name: '温度',
          type: 'line',
          showSymbol: false,
          symbolSize: 12,
          data: liuru,
        },
      ],
    });
    setInterval(function () {
      refresh();
    }, 1000);
  });
</script>
