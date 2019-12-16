<template>
  <div id='regionShow' ref='regionShow'></div>
</template>

<script>
import * as echarts from 'echarts'
import geoJson from '../assets/china.json'
export default {
  data () {
    return {
      dataList: [],
      mapName: 'china'
    }
  },
  created () {
    this.$http.get('http://localhost:3000/province/proInfo').then(res => {
      console.log(res)
      this.dataList = res.data.list
      this._initMap()
    })
  },
  methods: {
    _initMap () {
      const myChart = echarts.init(this.$refs.regionShow)
      let geoCoorMap = {}
      echarts.registerMap('china', geoJson)
      myChart.showLoading()
      const mapFeatures = echarts.getMap('china').geoJson.features
      myChart.hideLoading()
      mapFeatures.forEach(v => {
        let name = v.properties.name
        geoCoorMap[name] = v.properties.center
      })
      const max = 180
      const min = 9
      const maxSize4Pin = 100
      const minSize4Pin = 20
      const convertData = data => {
        let res = []
        for (let item of data) {
          let geoCoord = geoCoorMap[item.name]
          if (geoCoord) {
            res.push({
              name: item.name,
              value: geoCoord.concat(item.value)
            })
          }
        }
        return res
      }
      const option = {
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDutation: 1,
          textStyle: {
            color: '#000',
            decoration: 'none'
          },
          formatter: params => {
            console.log(params, '----')
            let tipHtml = `<div style="width:280px;height:180px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">'
            '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">''<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">''</i>'
            '<span style="margin-left:10px;color:#fff;font-size:16px;">${params.name}</span>''</div>'
            '<div style="padding:20px">'
            '<p style="color:#fff;font-size:12px;">''<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">''</i>'
            '单位总数：''<span style="color:#11ee7d;margin:0 6px;">'toolTipData.length'</span>''个''</p>'
            '<p style="color:#fff;font-size:12px;">''<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">''</i>'
            '总人数：''<span style="color:#f48225;margin:0 6px;">'toolTipData.length'</span>''个''</p>'
            '<p style="color:#fff;font-size:12px;">''<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">''</i>'
            '总人数：''<span style="color:#f4e925;margin:0 6px;">'toolTipData.length'</span>''个''</p>'
            '<p style="color:#fff;font-size:12px;">''<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">''</i>'
            '总人数：''<span style="color:#25f4f2;margin:0 6px;">'toolTipData.length'</span>''个''</p>'
            '</div>''</div>`
            return tipHtml
          }
        },
        geo: {
          show: true,
          map: 'china',
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#023677',
              borderColor: '#1180c7'
            },
            emphasis: {
              areaColor: '#4499d0'
            }
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: '10%',
          top: 'bottom',
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#04387b', '#467bc0']
          }
        },
        series: [{
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(this.dataList),
          symbolSize: val => val[2] / 10,
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
              color: '#fff'
            }
          }
        },
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75,
          showLegendSymbol: false,
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: this.dataList
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 6
        },
        {
          name: 'Top5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(this.dataList.sort((a, b) => b.value - a.value)).slice(0, 10),
          symbolSize: val => val[2] / 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'left',
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: 'yellow',
              shadowBlur: 10,
              shadowColor: 'yellow'
            }
          },
          zlevel: 1
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang='scss' scoped>
#regionShow {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
