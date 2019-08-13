<template>
  <div class="indicators">
    <table class="table"
           cellspacing="0px">
      <thead v-if="ctRankTrue">
        <td v-for="(item, index) in rankTitle"
            :class="{'qithead': (index===3), 'hcthead': (index===4), 'fjthead': (index===5)}"
            :key="index">{{item}}</td>
      </thead>
      <thead v-else>
        <td v-for="(item, index) in rankTitle"
            :key="index">{{item}}</td>
      </thead>
      <tbody v-if="ctRankTrue">
        <tr v-for="(items, index) in rankData"
            class="ctrankTr"
            :key="index">
          <td v-for="(item, i) in items"
              :key="i"><span v-if="(i > 2)">
                <span class="txt"
                  :style="jyTxtStyle(i, item)">{{item + '%'}}</span><span class="box"
                  :style="jyBoxStyle(i, item)"></span>
                </span><span v-else>{{item}}</span></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(items, index) in rankData"
            :key="index">
          <td v-for="(item, i) in items"
              :key="i">{{item}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['rankTitle', 'rankData', 'ctRankTrue'],
  name: '',
  data () {
    return {
    }
  },
  methods: {
    jyTxtStyle (i, item) {
      let styleObj = {}
      if ((item / 100 * 30 + 7)> 25) {
        item = 25
      } else {
        item = item / 100 * 30 + 7 
      }
      styleObj.bottom = item + 'px'
      if (i === 3) {
        styleObj.color = '#76cc30'
      } else if (i === 4) {
        styleObj.color = '#ffb129'
      } else {
        styleObj.color = '#36baff'
      }
      return styleObj
    },
    jyBoxStyle (i, item) {
      let styleObj = {}
      styleObj.height = item / 100 * 30 + 'px'
      if (i === 3) {
        styleObj["background-color"] = '#76cc30'
      } else if (i === 4) {
        styleObj["background-color"] = '#ffb129'
      } else {
        styleObj["background-color"] = '#36baff'
      }
      return styleObj
    }
  }
}
</script>

<style scoped>
.indicators {
  padding-top: 17px;
  box-sizing: border-box;
}
.table {
  font-size: 12px;
  width: 100%;
  line-height: 32px;
}
thead {
  vertical-align: middle;
  border-color: inherit;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  padding: 0px;
  vertical-align: center;
  border-top: 0px;
}
.table td {
  white-space: nowrap;
}
td {
  display: table-cell;
  vertical-align: inherit;
}
.indicators td:nth-child(n + 2) {
  text-align: center;
}
.table tbody {
  opacity: 0.75;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.table tbody tr:nth-child(odd) {
  background: rgba(255, 255, 255, 0.08);
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.qithead {
  color: #76cc30;
}
.hcthead {
  color: #ffb129;
}
.fjthead {
  color: #36baff;
}
.ctrankTr td {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
span.txt {
  position: absolute;
  left: 0;
  height: 7px;
  width: 100%;
  font-size: 10px;
  line-height: 7px;
}
span.box {
  display: inline-block;
  width: 10px;
  max-height: 20px;
  position: relative;
  bottom: -10px;
  margin-left: -5px;
}
.ctrankTr td {
  height: 36px;
}
</style>
