function activeLastPointToolip (chart) {
  let points = chart.series[0].points
  chart.tooltip.refresh(points[points.length - 1])
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[lng, lat]}
 */
function bd_encrypt(gg_lng, gg_lat) {
  var X_PI = Math.PI * 3000.0 / 180.0;
  var x = gg_lng, y = gg_lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng,bd_lat]
}

function delwithRankArr (rankArr) {
  let coordsArr = [],
    nameArr = [],
    indexArr = [],
    numberArr = [],
    speedArr = []

  for (let index = 0; index < rankArr.length; index++) {
    let element = rankArr[index]
    nameArr.push(element.name)
    indexArr.push(element.index)
    numberArr.push(element.number)
    speedArr.push(element.speed)
    let path = element.coords[0][0]
    let iArr = []
    for (let l = 0; l < path.length; l++) {
      let elel = path[l]
      let arr = bd_encrypt(elel.lon, elel.lat)
      iArr.push(arr)
    }
    coordsArr.push(iArr)
  }
  return { coordsArr, nameArr, indexArr, numberArr, speedArr }
}
export { delwithRankArr }
export default activeLastPointToolip
