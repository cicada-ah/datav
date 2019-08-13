<template>
  <div>
    <h2 class="at0">
      <div class="before"
           ref="before"></div>
      <span v-for="(item, index) in rankItems"
            :key="index"
            @click="onClick(index)"
            :class="{ 'on':index==current}">{{item}}</span>
    </h2>
    <div class="rankContant">
      <div class="right">
        <baidu-map class="map"
                   :center="center"
                   :zoom="zoom"
                   :mapStyle="setMapStyle"
                   :scroll-wheel-zoom=true
                   :dragging=true
                   @ready="handle">
        </baidu-map>
      </div>
      <div class="left">
        <table class="table">
          <thead>
            <tr>
              <th v-for="(item, index) in tableTitle"
                  :key="index">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rankArr"
                :key="index"
                @click="trClick(index)">
              <th>{{item.number}}</th>
              <th>{{item.name}}</th>
              <th>{{item.index}}</th>
              <th>{{item.speed}}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="clearBoth" style="width: 0px; height: 0px; margin: 0px; padding: 0px; border: 0px;"></div>
    </div>

  </div>
</template>

<script>
import rankArr from '@/utils/test.js'
import { delwithRankArr } from '@/utils/utils.js'
export default {
  name: '',
  props: ['rankData'],
  data () {
    return {
      rankArr,
      current: 0,
      map: '',
      rankItems: ['区域热度排名', '商圈热度排名', '行政区热度排名'],
      tableTitle: ['排名', '区域', '动向热度指数', '旅行速度'],
      center: { lng: 108.851408, lat: 34.262586 },
      zoom: 10,
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
    }
  },
  mounted () {
  },
  methods: {
    handle ({  map }) {
      this.drawPolyons( map)
      this.map = map
    },
    onClick (index) {
      this.setH2Left(index)
      this.current = index
      if (this.map) {
        this.$emit('rankClick', index)
      }
      if (index === 0 && this.map) {
        let center = new BMap.Point(108.85140, 34.262586)
        let zoom = 10
        this.map.setViewport({ center, zoom })
      } else if (index === 1 && this.map) {
        let center = new BMap.Point(108.965246, 34.263254)
        let zoom = 12
        this.map.setViewport({ center, zoom })
      } else if (index === 2 && this.map) {
        let center = new BMap.Point(108.948, 34.320232)
        let zoom = 9
        this.map.setViewport({ center, zoom })
      }
    },
    trClick (i) {
      let map = this.map
      let Bmap = this.Bmap
      if (this.map) {
        map.clearOverlays()
        let resObj = delwithRankArr(rankArr)
        let paths = resObj.coordsArr
        let numbers = resObj.numberArr
        let indexs = resObj.indexArr
        let element = paths[i]
        let index = indexs[i]
        let number = numbers[i]
        let curColor = this.getnumberColor(number)
        let polygon = this.drawPolyon( map, element, number, index, curColor)
        map.addOverlay(polygon)
        let path = polygon.getPath()
        map.setViewport(path)
      }
    },
    setH2Left (index) {
      let el = this.$refs.before
      let left = index * 231
      el.style.left = `${left}px`
    },
    drawPolyons ( map) {
      let resObj = delwithRankArr(rankArr)
      let paths = resObj.coordsArr
      let numbers = resObj.numberArr
      let indexs = resObj.indexArr
      for (let i = 0; i < paths.length; i++) {
        let element = paths[i]
        let number = numbers[i]
        let index = indexs[i]
        let curColor = this.getnumberColor(number)
        let polygon = this.drawPolyon( map, element, number, index, curColor)
        map.addOverlay(polygon)
      }
    },
    getnumberColor (number) {
      if (number > 3) {
        number = number % 3
      }
      let color = ['#FF0000', '#FFC125', '#00E5EE', '#0000EE']
      return color[number]
    },
    drawPolyon (map, path, number, index, fillColor) {
      let bpath = this.covPoint( path)
      let polygon = new BMap.Polygon(bpath, { strokeColor: 'blue', fillColor: fillColor, strokeWeight: 2, fillOpacity: 0.8, strokeOpacity: 0.5 })
      let bounds = polygon.getBounds()
      let boundsP = bounds.getCenter()
      let labelOpts = {
        position: boundsP
      }
      let bgcolor = 'blue'
      if (number < 4) {
        bgcolor = 'red'
      }
      let label = new BMap.Label(`<div style="color: white;background-color:${bgcolor};text-align:center;lineHeight : 100%">${number}</div>${index}`, labelOpts)
      map.addOverlay(label)
      return polygon
    },
    inforWindow ( content) {
      let inforwindow = new BMap.InfoWindow(content)
      return inforwindow
    },
    covPoint ( path) {
      for (let i = 0; i < path.length; i++) {
        path[i] = new BMap.Point(path[i][0], path[i][1])
      }
      return path
    },
    remove_overlay (map) {
      map.clearOverlays()
    }
  }
}
</script>

<style scoped>
h2 {
  padding-top: 0;
  font-size: 20px;
  color: rgba(0, 255, 255, 1);
  line-height: 36px;
  position: relative;
  border-bottom: 2px #319ee4 solid;
  padding-bottom: 9px;
  margin-top: 22px;
}
h2 .before {
  content: "";
  width: 165px;
  border: 2px #004a93 solid;
  height: 0;
  left: 0;
  position: absolute;
  bottom: -2px;
  -webkit-transition: all 0.5s cubic-bezier(0, 1.23, 0.68, 1.01);
  -mz-transition: all 0.5s cubic-bezier(0, 1.23, 0.68, 1.01);
  -o-transition: all 0.5s cubic-bezier(0, 1.23, 0.68, 1.01);
  -ms-transition: all 0.5s cubic-bezier(0, 1.23, 0.68, 1.01);
  transition: all 0.5s cubic-bezier(0, 1.23, 0.68, 1.01);
}
h2 span {
  padding-right: 150px;
}
h2 span.on {
  color: white;
}
.rankContant {
  margin-top: 13px;
}
.map {
  min-width: 400px;
  height: 300px;
}
.right {
  float: right;
}
.left {
  float: left;
}
table {
  width: 65%;
  min-width: 800px;
  margin-top: 0;
  border-collapse: collapse;
  border-spacing: 0;
}

.table thead tr:hover {
  background: 0;
}
.table thead tr {
  border: 1px #06c solid;
  height: 42px;
  line-height: 42px;
  cursor: auto;
}
.table thead {
  background: #1f486e;
}
.table {
  font-size: 14px;
  color: white;
  text-align: center;
}
.table tbody tr {
  height: 41px;
  line-height: 41px;
  border-bottom: 1px #013968 solid;
  border-left: 1px #013968 solid;
  border-right: 1px #013968 solid;
}
div.left > table tbody tr:hover {
  background-color: #303361;
}
.clearBoth {
    clear: both;
}
</style>
