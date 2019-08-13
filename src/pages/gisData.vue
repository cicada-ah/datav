<template>
  <div class="loyout">
    <header class="header">
      <h3>地图数据可视化</h3>
    </header>
    <topnav :type="true"></topnav>
    <v-loading v-if="vloading"></v-loading>
    <div class="wrapper">
      <div class="container-fluid">
        <Row :gutter="8">
          <Col :md="24"
               :lg="6"
               class="xpanel-wrapper-1">
          <div class="xpanel-wrapper xpanel-wrapper-2">
            <div class="xpanel">
              <h-charts class="fill-h"
                        :options="demChangeOp"
                        ref="demChange"></h-charts>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-2">
            <div class="xpanel">
              <h-charts class="fill-h"
                        :options="ageOp"
                        ref="ageSex"></h-charts>
            </div>
          </div>
          </Col>
          <Col :md="24"
               :lg="10"
               class="xpanel-wrapper-1">
          <div class="xpanel-wrapper xpanel-wrapper-3-1">
            <div class="xpanel">
              <div class="fill-h model"
                   ref="hot">
                <baidu-map class="map"
                           :center="'西安市新城区'"
                           :zoom="12"
                           :scroll-wheel-zoom="true"
                           :mapStyle="setMapStyle"
                           @ready="handle">
                  <bml-heatmap :data="heatdata"
                               :max="100"
                               :radius="20">
                  </bml-heatmap>
                </baidu-map>
                <div class="v-model">
                  <div class="model-flex">
                    <div class="jktitle">
                      >>实时流量密度监控
                      <span ref="time"
                            class="time"></span>
                    </div>
                    <div class="flex-title">
                      <span>峰值区域</span>
                      <span>峰值区域流量</span>
                      <span>峰值流量密度</span>
                    </div>
                    <div class="flex-value">
                      <span>新城区</span>
                      <span>1234</span>
                      <span>3人/平方米</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-3">
            <Row :gutter="8"
                 style="height:100%;">
              <Col :md="24"
                   :lg="16"
                   style="height:100%;">
              <div class="xpanel">
                <div class="fill-h"
                     ref="ridingCharts"></div>
              </div>
              </Col>
              <Col :md="24"
                   :lg="8"
                   style="height:100%;">
              <div class="xpanel">
                <div class="fill-h"
                     ref="carouseljq"></div>
              </div>
              </Col>
            </Row>
          </div>
          </col>
          <Col :md="24"
               :lg="8"
               class="xpanel-wrapper-1">
          <div class="xpanel-wrapper xpanel-wrapper-1">
            <div class="xpanel">
              <div class="fill-h"
                   ref="timeLine"></div>
            </div>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <cd-rank></cd-rank>
  </div>
</template>

<script>
import dataMenu from '@/components/dataMenu.vue'
import cdRank from '@/components/cdRank.vue'
import hCharts from '@/components/charts.vue'
import topnav from '@/components/topnav.vue'
import vLoading from '@/components/vLoading.vue'
import Highcharts from 'highcharts'
import { BmlHeatmap } from 'vue-baidu-map'
import countTo from 'vue-count-to'
import { activeLastPointToolip, delwithRankArr } from '@/utils/utils.js'
import xianJson from '@/utils/geoJson/xian.json'
import rankArr from '@/utils/test.js'
Highcharts.setOptions({
  global: {
    useUTC: false
  }
})
export default {
  name: '',
  data () {
    let _this = this
    return {
      vloading: true,
      rankArr,
      setMapStyle: {
        'styleJson': [
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#031628'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000102'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#0b3d51'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -70
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#857f7f'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#062032'
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#465b6c'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'label',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          }
        ]
      },
      heatdata: [
        { lng: 108.967075, lat: 34.275695, count: 100 },
        { lng: 108.978861, lat: 34.272354, count: 45 },
        { lng: 109.008469, lat: 34.26591, count: 69 },
        { lng: 109.00042, lat: 34.277604, count: 97 },
        { lng: 109.003869, lat: 34.272116, count: 34 },
        { lng: 108.992084, lat: 34.2714, count: 49 },
        { lng: 108.894348, lat: 34.347496, count: 54 },
        { lng: 108.897798, lat: 34.347734, count: 66 },
        { lng: 109.003007, lat: 34.35894, count: 93 },
        { lng: 109.028878, lat: 34.344634, count: 100 },
        { lng: 109.019678, lat: 34.347634, count: 100 },
        { lng: 109.027878, lat: 34.334634, count: 72 },
        { lng: 109.038652, lat: 34.310291, count: 78 },
        { lng: 108.880263, lat: 34.279991, count: 63 },
        { lng: 108.971387, lat: 34.221745, count: 92 },
        { lng: 108.791387, lat: 34.211745, count: 78 },
        { lng: 109.051875, lat: 34.226282, count: 87 },
        { lng: 109.051875, lat: 34.226282, count: 52 },
        { lng: 109.054462, lat: 34.289535, count: 63 },
        { lng: 109.06826, lat: 4.329849, count: 81 },
        { lng: 109.071135, lat: 34.325557, count: 32 },
        { lng: 108.956439, lat: 34.202639, count: 49 }
      ],
      demChangeOp: {
        chart: {
          type: 'areaspline',
          marginRight: 10,
          backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba'),
          events: {
            load: function () {
              var series = this.series[0],
                series1 = this.series[1],
                chart = this;
              // activeLastPointToolip(chart);
              setInterval(function () {
                var x = (new Date()).getTime(), // 当前时间
                  y = Math.ceil((Math.random() + 1) * 10000) + 10000,         // 随机值
                  y1 = Math.ceil((Math.random()) * 10000) + 10000;          // 随机值
                series.addPoint([x, y], true, true);
                series1.addPoint([x, y1], true, true);
                // activeLastPointToolip(chart);
              }, 2000);
            }
          }
        },
        credits: {
          enabled: false
        },
        title: {
          text: '>>旅客出入境',
          align: 'left',
          style: {
            color: '#7abaff',
            fontWeight: 200,
            fontSize: '14px'
          }
        },
        subtitle: {
          text: 'Passenger Entry-Exit',
          align: 'left',
          style: {
            color: '#00bfff',
            fontWeight: 100,
          }
        },
        xAxis: {
          type: 'datetime',
          tickLength: 0,
          labels: {
            style: {
              color: '#b2d2ff'
            }
          }
        },
        yAxis: {
          title: {
            text: null
          },
          tickPixelInterval: 60,
          labels: {
            style: {
              color: '#b2d2ff'
            }
          },
          gridLineColor: 'rbga(0,0,0,0.6)'
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
              Highcharts.numberFormat(this.y, 2);
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: false
            }
          }
        },
        series: [{
          name: '入境人数',
          color: '#30c7d0',
          fillColor: {       // 设置渐变的填充颜色
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#30c7d0'],
              [0.7, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: (function () {
            // 生成随机值
            var data = [],
              time = (new Date()).getTime(),
              i;
            for (i = -9; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.ceil((Math.random() + 1) * 10000) + 10000
              });
            }
            return data;
          }())
        }, {
          name: '出境人数',
          color: 'rgb(248,145,114)',
          fillColor: {       // 设置渐变的填充颜色
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgb(248,145,114)'],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          data: (function () {
            // 生成随机值
            var data = [],
              time = (new Date()).getTime(),
              i;
            for (i = -9; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: Math.ceil((Math.random()) * 10000) + 10000
              });
            }
            return data;
          }())
        }]
      },
      ageOp: {
        chart: {
          marginRight: 10,
          backgroundColor: 'rgba(0,0,0,0)'
        },
        credits: {
          enabled: false
        },
        title: {
          text: '>>年龄/性别占比',
          align: 'left',
          style: {
            color: '#7abaff',
            fontWeight: 200,
            fontSize: '14px'
          }
        },
        subtitle: {
          text: 'Age/gender ratio',
          align: 'left',
          style: {
            color: '#00bfff',
            fontWeight: 100
          }
        },
        xAxis: {
          type: 'value',
          tickLength: 0,
          categories: ['18岁以下', '18-30岁', '30-40岁', '40-60岁', '60岁以上'],
          labels: {
            style: {
              color: '#b2d2ff'
            }
          }
        },
        yAxis: {
          title: {
            text: null
          },
          tickPixelInterval: 60,
          labels: {
            style: {
              color: '#b2d2ff'
            }
          },
          gridLineColor: 'rbga(0,0,0,1)'
        },
        tooltip: {

        },
        labels: {
          items: [{
            html: '性别占比：',
            style: {
              left: '0',
              top: '0',
              fontSize: '13px',
              color: 'pink'
            }
          }]
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: false
            }
          }
        },
        series: [{
          type: 'column',
          name: '年龄',
          color: {       // 设置渐变的填充颜色
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, 'rgb(138,248,125)'],
              [1, 'rgb(14,173,176)']
            ]
          },
          borderWidth: 0,
          data: [2, 3, 1, 4, 2]
        }, {
          type: 'pie',
          name: '性别',
          colors: ['#30c7d0', '#6e5096'],
          center: ["20%", "20%"],
          allowPointSelect: true,
          borderWidth: 0,
          size: 50,
          data: [{
            name: '男',
            dataLabels: {
              distance: 5,
              color: '#30c7d0'
            },
            selected: true,
            y: 13,
          }, {
            name: '女',
            dataLabels: {
              distance: 5,
              color: '#6e5096'
            },
            y: 23,
          }]
        }]
      },
      ciyunOp: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      histroyChartsIn: '',
      ridingChartsIn: '',
      jqechartsIn: ''
    }
  },
  mounted () {
    // this.drawQianxi()
    this.drawCiyun()
    this.getNowTime()
    this.histroyCharts()
    this.ridingCharts()
    const _this = this
    window.onresize = () => {
      this.jqechartsIn.resize()
      this.ridingChartsIn.resize()
      this.histroyChartsIn.resize()
    }
  },
  methods: {
    // drawQianxi () {
    //   let qxChart = this.$echarts.init(this.$refs.carouseljq)
    //   qxChart.setOption(this.ciyunOp)
    // },
    getNowTime () {
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = today.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let hour = today.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minute = today.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }
      let second = today.getSeconds()
      if (second < 10) {
        second = '0' + second
      }
      let time = hour + ':' + minute + ':' + second
      return time
    },
    handle ({ map }) {
      this.drawPolyons(map)
      this.map = map
      this.vloading = false
    },
    covPoint (path) {
      for (let i = 0; i < path.length; i++) {
        path[i] = new BMap.Point(path[i][0], path[i][1])
      }
      return path
    },
    drawPolyons (map) {
      let resObj = delwithRankArr(rankArr)
      let paths = resObj.coordsArr
      let element = paths[0]
      let polygon = this.drawPolyon(map, element)
      map.addOverlay(polygon)

    },
    drawPolyon (map, path) {
      let bpath = this.covPoint(path)
      let polygon = new BMap.Polygon(bpath, { strokeColor: 'green', fillColor: '', strokeWeight: 2, fillOpacity: 0, strokeOpacity: 0.5 })
      return polygon
    },
    drawCiyun () {
      var data = {
        value: [{
          name: '钟楼',
          value: 212
        },
        {
          name: '大唐芙蓉园',
          value: 210
        },
        {
          name: 'XiAn',
          value: 211
        },
        {
          name: '小寨',
          value: 203
        },
        {
          name: 'chd',
          value: 215
        },
        {
          name: 'chd',
          value: 212
        },
        {
          name: '摔碗酒',
          value: 206
        },
        {
          name: '秦岭',
          value: 207
        },
        {
          name: '喜茶hay Tea',
          value: 208
        },
        {
          name: '333',
          value: 212
        },
        {
          name: '333',
          value: 212
        },
        {
          name: '御品轩',
          value: 209
        },
        {
          name: '西安汉城湖景区',
          value: 209
        },
        {
          name: '汉城湖景区',
          value: 204
        }
        ],
        image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTM5NjcxMDg4MjI5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5Njc3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTgwNi4xMjMgMTUzLjU3OWg2NS41MzZ2NzE4LjkxMkg2ODQuMjY3VjU1Mi45Nkw1MzEuNjcgNzEyLjcyNWgtMjAuNDU5TDM1OS42NTkgNTUyLjk2djMxOS41MzFIMTcyLjI0NlYxNTMuNTc5aDY3LjU4NGwyODAuNTk3IDMxMS4zMTcgMjg1LjY5Ni0zMTEuMzE3eiIgcC1pZD0iMTk2NzgiPjwvcGF0aD48L3N2Zz4="
      }
      let maskImage = new Image();
      maskImage.src = data.image
      let jqecharts = this.$echarts.init(this.$refs.carouseljq)
      maskImage.onload = function () {
        jqecharts.setOption({
          backgroundColor: 'transparent',
          tooltip: {
            show: false
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            sizeRange: [20, 30],
            // rotationRange: [0, 0],
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function (v) {
                  let color = ['#27D38A', '#FFCA1C', '#5DD1FA', '#F88E25', '#47A0FF', '#FD6565']
                  let num = Math.floor(Math.random() * (5 + 1));
                  return color[num];
                },
              },
            },
            // right: null,
            // bottom: null,
            width: '100%',
            height: '100%',
            // top: 20,
            data: data.value
          }]
        })
      }
      this.jqechartsIn = jqecharts
    },
    getNowTime () {
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = today.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let hour = today.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minute = today.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }
      let second = today.getSeconds()
      if (second < 10) {
        second = '0' + second
      }
      let time = year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second
      let timerDom = this.$refs.time
      timerDom.innerHTML = time
      setTimeout(this.getNowTime, 1000)
    },
    histroyCharts () {
      function randomNum (minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      }
      let geoCoordMap = {
        '阎良区': [109.22802, 34.662141],
        '鄠邑区': [108.607385, 34.108668],
        "高陵区": [109.088896, 34.535065],
        '临潼区': [109.213986, 34.372065],
        '蓝田县': [109.317634, 34.156189],
        '长安区': [108.941579, 34.157097],
        '未央区': [108.946022, 34.30823],
        '周至县': [108.216465, 34.161532],
        '灞桥区': [109.067261, 34.267453],
        '碑林区': [108.946994, 34.251061],
        '雁塔区': [108.926593, 34.213389]
      }
      let colors = [
        ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
        ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
        ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
      ]
      let colorIndex = 0
      let year = []
      for (let i = 1; i < 8; i++) {
        year.push(this.getDay(-i))
      }
      let mapData = [[], [], [], [], [], [], []]
      /*bar数据数据处理 */
      let categoryData = []
      let barData = []
      let grayBar = [13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000]
      for (let key in geoCoordMap) {
        categoryData.push(key)
        mapData[0].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
        mapData[1].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
        mapData[2].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
        mapData[3].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
        mapData[4].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
        mapData[5].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
        mapData[6].push({ "year": 2014, "name": key, "value": (randomNum(1000, 13000)) })
      }
      for (let i = 0; i < mapData.length; i++) {
        barData.push([])
        for (let j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value)
        }
      }
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      }
      var convertToLineData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem.name];
          var toCoord = [108.941579, 34.157097];//长安区
          if (fromCoord && toCoord) {
            res.push([{
              coord: toCoord,
              value: dataItem.value
            }, {
              coord: fromCoord,
            }]);
          }
        }
        return res;
      }
      this.$echarts.registerMap('xian', xianJson)
      let mapx = this.$echarts.getMap('xian')
      console.log(mapx)
      let optionXaMap = {
        timeline: {
          data: year,
          axisType: 'category',
          autoPlay: true,
          playInterval: 6000,
          left: '1%',
          bottom: '1%',
          width: '55%',
          symbol: 'image://https://gallerybox.echartsjs.com/asset/get/s/data-1544520416921-dDifNqgDb.png',
          label: {
            normal: {
              textStyle: {
                color: '#ddd'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#fff',
              borderColor: '#2998ff',
              borderWidth: 2,
            }
          },
          lineStyle: {
            show: true, //false 不显示轴线
            color: '#2998ff',
          },
          checkpointStyle: {
            borderColor: '#777',
            symbolSize: 30,
            symbol: "image://" + 'https://gallerybox.echartsjs.com/asset/get/s/data-1544520420656-0IBIgG42x.png',
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            itemGap: 10,
            itemSize: 15,
            normal: {
              color: "#2998ff",
              borderColor: "#2998ff"
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa'
            }
          }
        },
        baseOption: {
          animation: true,
          animationDuration: 2000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 2000,
          animationEasingUpdate: 'cubicInOut',
          grid: {
            right: '1%',
            top: '58%',
            bottom: '1%',
            width: '28%'
          },
          tooltip: {
            trigger: 'axis', // hover触发
            axisPointer: {// 指示器
              type: 'shadow',
              shadowSyle: {// 指示器样式
                color: 'rgba(150, 150, 150, 0.1)' // hover背景颜色
              }
            }
          },
          geo: {
            show: true,
            map: 'xian',// 构造函数中通过re...map注入类型
            roam: true,// 是否开启平移
            zoom: 1.5,
            top: '-17%',
            left: '35%',
            center: [109.22802, 34.662141], // 视角中心点
            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: '#389BB7',
                borderWidth: 0
              }
            }
          }
        },
        options: []
      }
      // 向timeline中options添加每日的图表
      for (let n = 0; n < year.length; n++) {
        optionXaMap.options.push({
          backgroundcolor: 'transparent',
          title: [{
            /* text: '地图',
             subtext: '内部数据请勿外传',
             left: 'center',
             textStyle: {
                 color: '#fff'
             }*/
          },
          {
            id: 'statistic',
            text: year[n] + " 日游客流动统计",
            left: '1%',
            top: '75%',
            textStyle: {
              color: '#fff',
              fontSize: 25
            }
          }
          ],
          xAxis: {
            show: false
          },
          yAxis: {
            type: 'category',
            // nameGap: 16, // 坐标轴名称与轴线之间的距离
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: 'white'
              }
            },
            data: categoryData
          },
          series: [{
            // 文字和气泡
            name: 'light',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(mapData[n]),
            symbolSize: function (val) {
              return val[2] / 1000;
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: colors[colorIndex][n]
              }
            }
          },
          {
            // 地图样式
            type: 'map',
            map: 'xian',
            geoIndex: 0,
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true, // 支持平移
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#FFFFFF',
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            data: mapData
          },
          {
            //  气泡涟漪效果,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(mapData[n].sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 20)),
            symbolSize: function (val) {
              return val[2] / 1000;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: colors[colorIndex][n],
                shadowBlur: 10,
                shadowColor: colors[colorIndex][n]
              }
            },
            zlevel: 1
          },
          {
            name: '实体线',
            type: 'lines',
            zlevel: 1,
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              opacity: 0.1,
              normal: {
                color: '#fff',
                width: 1,
                curveness: 0.2
              }
            },
            tooltip: {
              show: false,
            },
            data: convertToLineData(mapData[n])
          },
          // step4 发光线
          {
            name: '发光',
            type: 'lines',
            zlevel: 2,
            // 特效配置
            effect: {
              show: true,
              period: 5, //箭头指向速度，值越小速度越快
              trailLength: 0.7, //特效尾迹长度[0,1]值越大，尾迹越长重
              color: colors[colorIndex][n],
              symbolSize: 3 //图标大小
            },
            tooltip: {
              show: false,
            },
            lineStyle: {
              normal: {
                color: '#fbff82',
                width: 0,
                curveness: 0.2
              }
            },
            data: convertToLineData(mapData[n])
          },
          {
            zlevel: 1.5,
            type: 'bar',
            borderRadius: '50%',
            borderWidth: 0,
            barGap: '-100%',//bar系列重叠
            barWidth: '20%',
            itemStyle: {
              normal: {
                color: 'rgba(102, 102, 102,0.49)'
              },
            },
            z: 1,
            data: grayBar,
          },
          {
            zlevel: 1.5,
            type: 'bar',
            symbol: 'none',
            barGap: '-100%',
            barWidth: '20%',
            itemStyle: {
              normal: {
                color: {
                  type: 'bar',
                  colorStops: [{
                    offset: 0,
                    color: '#39A7FC' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#00FBFF' // 100% 处的颜色
                  }],
                  globalCoord: false, // 缺省为 false

                }
              },
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff', //百分比颜色
                },
                position: 'inside',
                //百分比格式
                formatter: function (data) {
                  return data.value;
                },
              }
            },
            data: barData[n]
          }
          ]
        })
      }

      let histroyCharts = this.$echarts.init(this.$refs.timeLine)
      histroyCharts.setOption(optionXaMap)
      this.histroyChartsIn = histroyCharts
    },
    ridingCharts () {
      let changeDate = ['2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07'];
      let costData = [
        {
          startDate: '2018-06-01',
          endDate: '2018-06-14',
          cost: 900000,
          costState: '已确认',
          count: 88
        }, {
          startDate: '2018-06-14',
          endDate: '2018-06-19',
          cost: 300000,
          costState: '已确认',
          count: 88
        }, {
          startDate: '2018-06-19',
          endDate: '2018-06-31',
          cost: 850000,
          costState: '已确认',
          count: 88
        }, {
          startDate: '2018-07-01',
          endDate: '2018-07-15',
          cost: 800000,
          costState: '已确认',
          count: 88
        }, {
          startDate: '2018-07-16',
          endDate: '2018-07-30',
          cost: 1000000,
          costState: '已确认',
          count: 88
        }, {
          startDate: '2018-08-01',
          endDate: '2018-08-04',
          cost: 1100000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2018-08-05',
          endDate: '2018-08-21',
          costState: '已确认',
          cost: 880000,
          count: 99
        }, {
          startDate: '2018-08-22',
          endDate: '2018-08-30',
          costState: '已确认',
          cost: 120000,
          count: 99
        }, {
          startDate: '2018-09-01',
          endDate: '2018-09-15',
          costState: '已确认',
          cost: 120000,
          count: 99
        }, {
          startDate: '2018-09-16',
          endDate: '2018-09-31',
          costState: '已确认',
          cost: 120000,
          count: 99
        }, {
          startDate: '2018-10-01',
          endDate: '2018-10-31',
          costState: '已确认',
          cost: 120000,
          count: 99
        }, {
          startDate: '2018-11-01',
          endDate: '2018-11-30',
          cost: 300000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2018-12-01',
          endDate: '2018-12-31',
          costState: '已确认',
          cost: 120000,
          count: 99
        }, {
          startDate: '2019-01-01',
          endDate: '2019-01-20',
          cost: 700000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2019-01-21',
          endDate: '2019-02-15',
          cost: 700000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2019-02-16',
          endDate: '2019-02-20',
          cost: 800000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2019-03-01',
          endDate: '2019-03-31',
          cost: 600000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2019-04-01',
          endDate: '2019-04-31',
          cost: 500000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2019-05-01',
          endDate: '2019-05-31',
          cost: 300000,
          costState: '已确认',
          count: 99
        }, {
          startDate: '2019-06-01',
          endDate: '2019-06-15',
          cost: 800000,
          costState: '已确认',
          count: 99
        }
      ];

      function getMinusDays (date1, date2) {
        var date1Str = date1.split('-');
        var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
        var date2Str = date2.split('-');
        var date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var dateTime = 1000 * 60 * 60 * 24;
        var minusDays = Math.floor(((t2 - t1) / dateTime));
        var days = Math.abs(minusDays);
        return days;
      }

      function addDays (date1, count) {
        var date1Str = date1.split('-');
        var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
        date1Obj.setDate(date1Obj.getDate() + count);
        let midDate = date1Obj.getFullYear() + '-' + (date1Obj.getMonth() + 1) + '-' + date1Obj.getDate();
        return midDate;
      }

      let cost = [];

      for (let i = 0; i < costData.length; i++) {
        let midDate = addDays(costData[i].startDate, getMinusDays(costData[i].startDate, costData[i].endDate) / 2);
        cost.push({
          name: costData[i].startDate + ' ~ ' + costData[i].endDate,
          value: [midDate, costData[i].cost]
        });
      }

      let costChange = {
        changeDate: changeDate,
        cost: cost,
        minDate: costData[0].startDate.slice(0, 7) + '-01',
        maxDate: costData[costData.length - 1].endDate.slice(0, 7) + '-31',
        dashLastStart: 2
      };

      let monthCount = costChange.changeDate.length;
      let data = costChange.cost;
      let chartData = {
        xAxisNames: costChange.changeDate,
        seriesData: data,
        axisLabelFormatter: '{value}w',
        name: '停留天数',
        seriesDash: true,
        dashStart: data.length - costChange.dashLastStart,
        minDate: costChange.minDate,
        maxDate: costChange.maxDate,
        scrollLen: Math.ceil(100 - 12 / this.monthCount * 100),
        showScroll: this.monthCount > 12,
        bottom: this.monthCount > 12 ? 50 : 0
      };

      let seriesData = [];
      console.log(chartData.seriesData);
      if (chartData.seriesDash) {
        let len = chartData.seriesData.length;
        let minusArr = [];
        for (let i = 0; i < len; i++) {
          minusArr.push({
            name: '-',
            value: []
          });
        }
        seriesData = [{
          name: chartData.name,
          symbol: 'circle',
          symbolSize: 12,
          type: 'line',
          smooth: false,
          data: (chartData.seriesData.slice(0, chartData.dashStart)).concat(minusArr.slice(0, len - chartData.dashStart))
        },
        {
          name: chartData.name,
          symbol: 'emptyCircle',
          symbolSize: 6,
          type: 'line',
          smooth: false,
          data: (chartData.seriesData.slice(0, chartData.dashStart)).concat(minusArr.slice(0, len - chartData.dashStart))
        },
        {
          name: chartData.name,
          symbol: 'circle',
          symbolSize: 12,
          type: 'line',
          smooth: false,
          itemStyle: {
            normal: {
              color: '#95EBE1',
              lineStyle: {
                width: 2,
                type: 'dashed'
              }
            }
          },
          data: (minusArr.slice(0, chartData.dashStart - 1)).concat(chartData.seriesData.slice(chartData.dashStart - 1, len))
        },
        {
          name: chartData.name,
          symbol: 'circle',
          symbolSize: 6,
          type: 'line',
          smooth: false,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
                type: 'dotted'
              }
            }
          },
          data: (minusArr.slice(0, chartData.dashStart - 1)).concat(chartData.seriesData.slice(chartData.dashStart - 1, len))
        },
        {
          name: chartData.name,
          symbol: 'circle',
          symbolSize: 12,
          type: 'line',
          smooth: false,
          data: (minusArr.slice(0, chartData.dashStart - 1)).concat(chartData.seriesData.slice(chartData.dashStart - 1, chartData.dashStart)).concat(minusArr.slice(0, len - chartData.dashStart))
        },
        {
          name: chartData.name,
          symbol: 'emptyCircle',
          symbolSize: 6,
          type: 'line',
          smooth: false,
          data: (minusArr.slice(0, chartData.dashStart - 1)).concat(chartData.seriesData.slice(chartData.dashStart - 1, chartData.dashStart)).concat(minusArr.slice(0, len - chartData.dashStart))
        }
        ];
      } else {
        seriesData = [{
          name: chartData.name,
          symbol: 'circle',
          symbolSize: 12,
          type: 'line',
          data: chartData.seriesData
        },
        {
          name: chartData.name,
          symbol: 'emptyCircle',
          symbolSize: 6,
          type: 'line',
          data: chartData.seriesData
        }
        ];
      }

      let xAxisNames1 = [];
      for (let i = 0; i < chartData.seriesData.length; i++) {
        xAxisNames1.push('-');
      }
      let ridingCharts = this.$echarts.init(this.$refs.ridingCharts)
      let rdOption = {
        title: {
          text: '>>停留时间分析',
          x: "4%",
          textStyle: {
            color: '#7abaff',
            fontWeight: 200,
            fontSize: '14'
          },
          subtext: 'Analysis of Residence Days',
          subtextStyle: {
            color: '#00bfff',
            fontWeight: 100,
            fontSize: '10',

          },
        },
        color: ["#00BFFF", "#FF00FF", "#1ce322", "#000000", '#EE7942'],
        backgroundColor: 'transparent',
        tooltip: {
          backgroundColor: 'rgba(46, 126, 139, 0.90)',
          padding: [10, 20, 10, 8],
          textStyle: {
            fontSize: 12,
            lineHeight: 24
          },
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed',
              color: '#28BBAB'
            }
          },
          formatter: function (params, ticket, callback) {
            callback;
            var htmlStr = '';
            var valMap = {};
            for (var i = 0; i < params.length; i++) {
              var param = params[i];
              var xName = param.name;
              var seriesName = param.seriesName;
              var value = param.value;
              // var color = param.color;
              if (value.length === 0) {
                continue;
              }
              if (valMap[seriesName] && valMap[seriesName][0] === value[0] && valMap[seriesName][1] === value[1]) {
                continue;
              }
              htmlStr += xName;
              // if (chartData.dashStart && params[0].dataIndex >= chartData.dashStart) {
              //     htmlStr += '预估';
              // }
              htmlStr += '<br/><div>';
              // htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
              htmlStr += seriesName + '：' + value[1] / 200000 + '天';
              htmlStr += '</div>';
              valMap[seriesName] = value;
            }
            return htmlStr;
          }
        },
        grid: {
          left: 40,
          right: 14,
          bottom: 80,
          top: 70
        },
        dataZoom: [{
          show: true,
          type: 'slider',
          filterMode: 'none',
          realtime: false,
          height: 10,
          start: 60,
          end: 100,
          minValueSpan: 3600 * 24 * 1000 * 7,
          handleIcon: 'path://path://M100, 100m -75, 0a75,75 0 1,0 150,0a75,75 0 1,0 -150,0',
          handleSize: '120%',
          handleStyle: {
            color: "#fff",
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 4
          },
          textStyle: {
            color: "transparent"
          },
          borderColor: 'transparent',
          backgroundColor: '#D7F4FF',
          dataBackground: {
            lineStyle: {
              width: 0
            },
            areaStyle: {
              color: 'transparent'
            }
          },
          fillerColor: '#00EBFF',
          labelFormatter: ''
        }, {
          type: "inside",
          show: true,
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
          moveOnMouseMove: true,
          preventDefaultMouseMove: true
        }],
        xAxis: [{
          type: 'time',
          min: chartData.minDate,
          max: chartData.maxDate,
          interval: 3600 * 24 * 1000,
          // minInterval: 3600 * 24 * 1000 * 30,
          // maxInterval: 3600 * 24 * 1000 * 31,
          data: xAxisNames1,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#ADB9C7',
            formatter: function (value) {
              let date = new Date(value);
              let day = date.getDate();
              if (day === 16) {
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month = month <= 9 ? ('0' + month) : month;
                return year + '-' + month;
              } else {
                return '';
              }
            }
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            triggerTooltip: true
          }
        }],
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#ADB9C7',
            formatter: function (value) {
              if (chartData.axisLabelFormatter === '{value}w') {
                return (parseInt(value, 10) / 200000) + ' 天';
              } else {
                return value;
              }
            }
          }
        },
        series: seriesData
      }
      ridingCharts.setOption(rdOption)
      this.ridingChartsIn = ridingCharts
    },
    getDay (day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds);
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = tMonth + 1;
      tDate = tDate;
      return tMonth + "-" + tDate;
    }
  },
  components: {
    dataMenu,
    hCharts,
    cdRank,
    topnav,
    BmlHeatmap,
    countTo,
    vLoading
  }
}
</script>

<style scoped>
.loyout {
  background-size: auto 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: "microsoft yahei", arial, sans-serif;
  background-color: #0f1c30;
  background-repeat: no-repeat;
  background-position: center;
  overflow: auto;
  background-size: 100% 100%;
  background-image: url("../assets/bg02.jpg");
}
.loyout::-webkit-scrollbar {
  display: none;
}
.header {
  margin: 0 auto;
  width: 700px;
  height: 5vh;
  background: url("../assets/headerGif.gif") center no-repeat;
  background-size: 80%;
  background-position: center 40%;
  margin-bottom: 3vh;
}
.xpanel-wrapper-1 {
  height: 92vh;
}
.xpanel-wrapper-2 {
  height: 50%;
}
.xpanel-wrapper-3 {
  height: 45%;
}
.xpanel-wrapper-3-1 {
  height: 55%;
}

.xpanel-wrapper-4 {
  height: 25%;
}
.header h3 {
  margin: 0;
  padding: 0;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: #5dc2fe;
}
.wrapper {
  width: 100%;
  height: 85vh;
}

.xpanel {
  padding: 5px;
  height: 100%;
  background: url("../assets/panel.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.clearBoth {
  clear: both;
}
.fill-h {
  height: 100%;
  min-height: 100%;
}
.model {
  position: relative;
}
.v-model {
  z-index: 999;
  position: absolute;
  bottom: 0;
  height: 30%;
  width: 100%;
  background-color: transparent;
}
.v-model:hover {
}
.xpanel-wrapper {
  padding-bottom: 15px;
  box-sizing: border-box;
}
/* Row>div {
    padding-left: 7px;
    padding-right: 8px;
} */
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  height: 100%;
  min-height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
.time {
  color: white;
  font-family: Arial, "Times New Roman", Times, Helvetica, "\5b8b\4f53",
    sans-serif;
}
.flex-title {
  display: flex;
  justify-content: space-between;
}
.flex-value {
  display: flex;
  justify-content: space-between;
}
.model-flex {
  padding: 15px;
}
.carousel {
  height: 274px;
  width: 234px;
}

.ivu-carousel {
  height: 100%;
  width: 100%;
}
</style>
