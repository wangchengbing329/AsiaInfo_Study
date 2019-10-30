<template>
<div class="weatherScroll" ref= "weatherScroll">
  <div class="weatherWrapper">

<div class="weatherBox" v-for="(item,key) in hourWeather" :key = "key">
  <div class="timeHeader">{{item.time}}</div>
  <div class="imgbox">
    <img :src="getImg(item.cond_code,item.hour)" alt="">
  </div>
  <div class="weather">{{item.weather}}</div>
  <div class="temperature">{{item.tmp}}&#8451;</div>
</div>
</div>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    localCity:{
      type:String,
      required:true
    }
  },
  data () {
    return {
      hourWeather:[],
      sr:'',
      ss:''
    }
  },
  methods: {
      getImg(code,hour) {
        let raise = this.sr.substr(0,2);
        let slow = this.ss.substr(0,2);
        // console.log(raise,slow)
        let now = new Date().getHours();
        // let weaType = this.getType(code);
        if(raise <= hour && hour <= slow){
          return require(`@/assets/imgs/weather/weatherIcon/${code}.png`)
        } else {
          if (code === 100 || code ===103||code ===104 ||code === 300||code === 301 ||code === 406|| code === 407){
            return require(`@/assets/imgs/weather/weatherIcon/${code}n.png`)
          }else {
          return require(`@/assets/imgs/weather/weatherIcon/${code}.png`)

          }

        }
      },
      _weatherScroll () {
        // let that = this
        let cliw = this.$refs.weatherScroll.clientWidth;
        this.$refs.weatherScroll.style.width = cliw + 'px'
        this.weatherScroll = new BScroll(this.$refs.weatherScroll,{
          click:true,
          eventPassthrough:'horizontal',
          // stopPropagation:false,
          bounce:true,
          // disableTouch:true,
          // scrollX:true,
          // scrollY:true
        })
        this.$emit('setScroll',this.weatherScroll)
      }


  },
  mounted () {
    this.$nextTick(()=>{
      this._weatherScroll();
    })
  },
  created () {
    let localCity = encodeURIComponent(this.localCity)
    // console.log(typeof (localCity))

    this.$http.get(`https://free-api.heweather.net/s6/weather/hourly?location=${localCity}&key=5eb51416bfcf4437b13f778b9e41e154`)
    .then(res=>{
      // console.log(res.data.HeWeather6[0].hourly);
      let hourData = res.data.HeWeather6[0].hourly;
      let weatherData = [];
      for (let item of hourData){
          let hourObject = {};
          let weather = item.cond_txt;
          let time = item.time.trim().substr(11,5)
          // console.log(str)
          // let img = '';
          let hour = time.substr(0,2)
          let cond_code = item.cond_code;
          let tmp = item.tmp
          hourObject = {
            weather,
            time,
            hour,
            cond_code,
            tmp
          }
          weatherData.push(hourObject)

      }
      this.hourWeather = weatherData;
          // console.log(this.hourWeather)


    });
    this.$http.get(`https://free-api.heweather.net/s6/weather/forecast?location=${localCity}&key=5eb51416bfcf4437b13f778b9e41e154`).then(res=>{
      // console.log(res);
      this.sr = res.data.HeWeather6[0].daily_forecast[0].sr;
      this.ss = res.data.HeWeather6[0].daily_forecast[0].ss;
      // this.getImg()
    })

  }

}
</script>

<style scoped>
.weatherScroll{

  /* align-items: center; */
  /* justify-content: space-around; */
  /* width: 375px; */
  /* height: 100px; */
  width: 100%;
}
.weatherWrapper{
  /* height: 6rem; */
  position: absolute;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  width: 375px;
  justify-content: space-around;
}
.weatherBox{
  /* position: absolute; */
/* width: 90px; */
/* height: 112px; */
/* width: 8rem; */
/* flex:1; */
}
.timeHeader{
text-align: center;
}
.imgbox{
width: 4rem;
height: 4rem;
text-align: center;
}
.imgbox img{
width: 3rem;
height: 3rem;
}
.weather{
  text-align: center;

}
.temperature{
text-align: center;
}

</style>
