<template>
  <div class="containers">
    <header>
      <div class="logo"></div>
      <div class="links">
        <ul>
          <li>
            <a href=""></a>
          </li>
        </ul>
      </div>
      <h1>西安旅客动向实时分析</h1>
      <time class="arial"
            ref="timer"></time>
    </header>
    <topnav></topnav>
    <v-loading v-if="vloading"></v-loading>
    <main style="margin-top:77px;">
      <section class="compare">
        <div class="module-title">
          <h3>西安旅客活跃因数</h3>
          <h4 class="arial">Passenger Active Factor</h4>
        </div>
        <div class="city-distribute"
             style="height: 204px; margin-top: 20px; overflow: hidden;">
          <h-charts :options="Hoptions"
                    :styles="{width: 273, hegiht: 204}"></h-charts>
        </div>
        <div class="module-title"
             style="margin-top:50px;">
          <h3>景区实时状况</h3>
          <h4>Real-time status of scenic spots</h4>
        </div>
        <rank-table :rankTitle='jqRankTitle'
                    :rankData='jqRankData'>
        </rank-table>
      </section>
      <section class="summary">
        <ol>
          <li class="indicaor">
            <h5>出境人数</h5>
            <span class="value">
              <strong class="arial">2333</strong>
              <span>人</span>
            </span>
          </li>
          <li class="indicaor">
            <h5>入境人数</h5>
            <span class="value">
              <strong class="arial"
                      style="color: rgb(166, 128, 255);">2323</strong>
              <span>人</span>
            </span>
          </li>
          <li class="indicaor"
              style="width:164px;">
            <h5>景区收益总额</h5>
            <span class="value">
              <strong class="arial">3000</strong>
              <span>万元</span>
            </span>
          </li>
        </ol>
      </section>
      <section class="rank">
        <div class="module-title">
          <h3>
            智能实时动向榜
          </h3>
          <h4 class="arial">Intelligent Real-time Trend Rank</h4>
        </div>
        <div class="rank-table"
             style="padding-top: 34px;">
          <rank-table :rankTitle=ctRankTitle
                      :rankData=ctRankData
                      :ctRankTrue=ctRankTrue>
          </rank-table>
        </div>
      </section>
    </main>
    <baidu-map class="map"
               :center="center"
               :zoom="zoom"
               :mapStyle="setMapStyle"
               :double-click-zoom=false
               :dragging=false
               @ready="handle"></baidu-map>
  </div>
</template>

<script>
import chinaJson from '@/utils/geoJson/china.json'
import HCharts from '@/components/charts.vue'
import topnav from '@/components/topnav.vue'
import rankTable from '@/components/rankTable.vue'
import vLoading from '@/components/vLoading.vue'
import * as mapv from 'mapv'
export default {
  name: '',
  data () {
    return {
      center: { lng: 108.948024, lat: 34.263161 },
      vloading: true,
      zoom: 5,
      setMapStyle: {        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#031628'
            }
          },
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
              color: '#000102'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#147a92'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#0b3d51'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#08304b'
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              lightness: -70
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.fill',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#857f7f'
            }
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#000000'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry',
            stylers: {
              color: '#022338'
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#062032'
            }
          },
          {
            featureType: 'boundary',
            elementType: 'all',
            stylers: {
              color: '#465b6c'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
              color: '#022338'
            }
          },
          {
            featureType: 'label',
            elementType: 'all',
            stylers: {
              color: '#022338',
              visibility: 'off'
            }
          }
        ]      },
      Hoptions: {
        title: {
          text: null
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
          plotBorderWidth: null,
          plotShadow: false,
          height: 224,
          width: 283,
          marginLeft: -100
        },
        credits: {
          enabled: false
        },
        legend: {
          itemHoverStyle: {
            color: 'rgb(255, 255, 255)'
          },
          itemStyle: {
            color: 'rgba(255, 255, 255, 0.87)',
            fontWeight: 'bold'
          },
          labelFormat: '{name}'
        },
        colors: ['#4BCCEC', 'rgb(166, 128, 255)'],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            innerSize: '75%',
            cursor: 'pointer',
            name: '人数',
            dataLabels: {
              enabled: false
            },
            borderWidth: 0

          }
        },
        series: [{
          type: 'pie',
          showInLegend: true,
          data: [
            ['出境', 2333],
            ['入境', 2323]
          ]
        }]
      },
      jqRankTitle: ['景区六宫格指标项', '均值', '最高值', '景区榜首', '>景区均值量'],
      jqRankData: [['取票排队时间长度', '<1h', '1h43m', '华山', '13'], ['景区舒适度指数', '3(一般)', '5(舒适)', '秦始皇陵', '9'],['平均游玩时间', '1h', '8h', '秦岭野生动物园', '9'],
                ['门票收益额(万元)/小时', '1', '3', '秦始皇兵马俑', '5'], ['流量密度(/m^3)', '0.2', '0.5', '三益于氏民居', '10'],['大众推荐指数', '3', '5', '陕西历史博物馆', '15']],
      ctRankTitle: ['排名top10', '城市', '热度', '汽车', '火车', '飞机'],
      ctRankData: [[1, '河北', '49.4', 8, 54, 38], [2, '天津', '38.3', 1, 27, 72], [3, '山东', '31.4', 7, 53, 40], [4, '山西', '30.0', 0, 52, 48], [5, '辽宁', '29.1', 83, 17, 0], [6, '河南', '26.5', 6, 70, 24], [7, '江苏', '24.5', 63, 37, 0], [8, '上海', '23.0', 68, 32, 0], [9, '广东', '22.5', 6, 80, 14], [10, '内蒙古自治区', '21.2', 8, 67, 25]],
      ctRankTrue: true
    }
  },
  mounted () {
    this.getNowTime()
  },
  methods: {
    handle ({ Bmap, map }) {
      var geojsonOptions = {
        gradient: {
          0: 'rgba(55, 50, 250, 0.4)',
          1: 'rgba(55, 50, 250, 1)'
        },
        max: 354551,
        draw: 'intensity'
      }

      var geojsonDataSet = mapv.geojson.getDataSet(chinaJson)
      var to = '西安'

      var qianxi = new mapv.DataSet([
        {
          from: '河北',
          count: 354551,
          to: to
        },
        {
          from: '天津',
          count: 97323,
          to: to
        },
        {
          from: '山东',
          count: 28664,
          to: to
        },
        {
          from: '山西',
          count: 16650,
          to: to
        },
        {
          from: '辽宁',
          count: 14379,
          to: to
        },
        {
          from: '河南',
          count: 10980,
          to: to
        },
        {
          from: '内蒙古自治区',
          count: 9603,
          to: to
        },
        {
          from: '江苏',
          count: 4536,
          to: to
        },
        {
          from: '上海',
          count: 3556,
          to: to
        },
        {
          from: '广东',
          count: 2600,
          to: to
        }
      ])

      var qianxiData = qianxi.get()

      var lineData = []
      var pointData = []
      var textData = []
      var timeData = []

      var citys = {}

      for (var i = 0; i < qianxiData.length; i++) {
        var fromCenter = mapv.utilCityCenter.getCenterByCityName(
          qianxiData[i].from
        )
        var toCenter = mapv.utilCityCenter.getCenterByCityName(
          qianxiData[i].to
        )
        if (!fromCenter || !toCenter) {
          continue
        }
        citys[qianxiData[i].from] = qianxiData[i].count
        citys[qianxiData[i].to] = 100
        pointData.push({
          geometry: {
            type: 'Point',
            coordinates: [fromCenter.lng, fromCenter.lat]
          }
        })
        pointData.push({
          geometry: {
            type: 'Point',
            coordinates: [toCenter.lng, toCenter.lat]
          }
        })
        textData.push({
          geometry: {
            type: 'Point',
            coordinates: [fromCenter.lng, fromCenter.lat]
          },
          text: qianxiData[i].from
        })
        textData.push({
          geometry: {
            type: 'Point',
            coordinates: [toCenter.lng, toCenter.lat]
          },
          text: qianxiData[i].to
        })

        var curve = mapv.utilCurve.getPoints([fromCenter, toCenter])

        for (let j = 0; j < curve.length; j++) {
          timeData.push({
            geometry: {
              type: 'Point',
              coordinates: curve[j]
            },
            count: 1,
            time: j
          })
        }

        lineData.push({
          geometry: {
            type: 'LineString',
            coordinates: curve
            // coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
          },
          count: 30 * Math.random()
        })
      }

      var data = geojsonDataSet.get({
        filter: function (item) {
          if (!citys[item.name]) {
            return false
          }

          item.count = citys[item.name]
          return true
        }
      })
      geojsonDataSet = new mapv.DataSet(data)
      console.log(geojsonDataSet)
      var mapvLayer = new mapv.baiduMapLayer(
        map,
        geojsonDataSet,
        geojsonOptions
      )

      var textDataSet = new mapv.DataSet(textData)

      var textOptions = {
        draw: 'text',
        font: '14px Arial',
        fillStyle: 'white',
        shadowColor: 'yellow',
        shadowBlue: 10,
        zIndex: 11,
        shadowBlur: 10
      }

      var textMapvLayer = new mapv.baiduMapLayer(
        map,
        textDataSet,
        textOptions
      )

      var lineDataSet = new mapv.DataSet(lineData)

      var lineOptions = {
        strokeStyle: 'rgba(255, 250, 50, 0.8)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        lineWidth: 2,
        zIndex: 100,
        draw: 'simple'
      }

      var lineLayer = new mapv.baiduMapLayer(map, lineDataSet, lineOptions)

      var pointOptions = {
        fillStyle: 'rgba(254,175,3,0.7)',
        shadowColor: 'rgba(55, 50, 250, 0.5)',
        shadowBlur: 10,
        size: 5,
        zIndex: 10,
        draw: 'simple'
      }

      var pointDataSet = new mapv.DataSet(pointData)

      var pointLayer = new mapv.baiduMapLayer(map, pointDataSet, pointOptions)

      var timeDataSet = new mapv.DataSet(timeData)

      var timeOptions = {
        fillStyle: 'rgba(255, 250, 250, 0.5)',
        zIndex: 200,
        size: 2.5,
        animation: {
          type: 'time',
          stepsRange: {
            start: 0,
            end: 50
          },
          trails: 10,
          duration: 2
        },
        draw: 'simple'
      }

      var timeMapvLayer = new mapv.baiduMapLayer(
        map,
        timeDataSet,
        timeOptions
      )
      this.vloading = false
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
      let timerDom = this.$refs.timer
      timerDom.innerHTML = time
      setTimeout(this.getNowTime, 1000)
    }
  },
  components: {
    HCharts,
    rankTable,
    topnav,
    vLoading
  }
}
</script>

<style lang="stylus" scoped>
font-family = Arial, 'Times New Roman', Times, Helvetica, '\5b8b\4f53', sans-serif
.containers
  position relative
  min-height 100vh
  overflow hidden
  overflow-x hidden
  overflow-y scroll
  padding 2.6666666rem
  &::-webkit-scrollbar
    display none
  header
    position relative
    text-align center
    .links
      box-sizing border-box
      display block
      ul
        margin 0px
        display flex
        list-style none
        position absolute
        right 10px
        top 10px
        font-size 16px
        li
          a
            line-height 1.4
            padding 4px 10px
            font-weight lighter
            background-color rbga(255, 255, 255, 0.05)
            margin 0 6px
            border-radius 3px
            color white
            text-decoration none
            &:hover
              color #4BCCEC
    h1
      font-weight lighter
      font-size 2.66666667rem
      margin 0
      padding-top 0.33333333rem
      padding-bottom 0.666666666667rem
      border-bottom 1px rgba(75, 202, 235, 0.32) solid
      letter-spacing 1px
    time
      width 35rem
      display block
      margin 0 auto
      border-bottom 1px rgb(28, 73, 92) solid
      padding-top 0.5rem
      padding-bottom 0.5rem
      border-top 1px #111317 solid
      position relative
      top -1px
      font-family font-family
      font-size 1.333333333rem
      &:before
        content ''
        width 100%
        height 100%
        position absolute
        left -16px
        top -1px
        transform skew(45deg, 0deg)
        border-left 1px rgb(28, 73, 92) solid
        border-top 1px #111317 solid
      &:after
        content ''
        width 100%
        height 100%
        position absolute
        right -16px
        top -1px
        transform skew(-45deg, 0deg)
        border-right 1px rgb(28, 73, 92) solid
        border-top 1px #111317 solid
  main
    display flex
    justify-content space-between
  .map
    position absolute
    width 100%
    left 0px
    top 0px
    bottom 0px
    right 0px
    z-index -1
    min-height 907px
  section
    flex-grow 1
  .compare
    width 30.3333333rem
    padding-top 8px
    div
      h3
        margin 0px
        font-size 18px
        line-height 22px
        font-weight 300
      h4
        font-family font-family
        font-size 12px
        color #4BCCEC
        line-height 16px
        margin 3px 0 0
  .summary
    margin-top -80px
    width 48rem
    ol
      padding 0
      display flex
      margin-top 43px
      li
        width 112px
        margin 0px 15px
        text-align center
        list-style none
        display list-item
        h5
          font-size 16px
          font-weight lighter
          margin 0px
        span, .value
          line-height 28px
          display inline-block
          padding-top 14px
          strong
            font-size 28px
            color #4BCCEC
            font-weight 300
          .arial
            font-family font-family
          .value
            line-height 28px
  .rank
    padding-top 8px
    flex-grow 1
    .module-title
      text-align right
      h3
        margin 0px
        font-size 18px
        line-height 22px
        font-weight 300
      h4
        font-size 12px
        color #4BCCEC
        line-height 16px
        margin 3px 0 0
        font-family font-family
        font-weight 300
    .rank-table
      padding-top 34px
      box-sizing border-box
</style>
