<template>



  <div id="Weather">
    <!-- 顶部选择城市部分 点击加号切换至选择城市界面 -->

    <div class="select-box">
      <img src="../assets/imgs/page-weather/add.png" alt class="select" @click="goToSelect" />
      <div class="selected-city">{{city[0]}}</div>
    </div>
<!-- 显示天气温度部分 -->
    <div class="temperature">
      <!-- 天气左边部分 -->
      <div class="temperature-left">{{temperature}}</div>
      <div class="temperature-right">
        <div class="temperature-detail">
          <div class="weather-box">O {{weatherType}}</div>
          <div class="feedback">反馈天气 </div>
        </div>
        <div class="index">
          <span class="indexColor" :class="[{excellent:isExcellent},{good:isGood},{normal:isNormal},{bad:isBad}]" > </span>
          <span class="describe">{{describe}}</span>
          <span class="hum">{{hum}}</span>
          </div>
      </div>
    </div>
    <!-- 逐时天气滚动 -->
    <div class="scrollWeather"  >
    <div class="wrapper-info">未来三小时预报:</div>

      <scroll-weather :localCity= city[0] ref="weatherScroll" @setScroll="setScroll"></scroll-weather>
    </div>

<!-- <keep-alive/> -->
  </div>

</template>

<script>
import scrollWeather from '@/components/Components/ScrollWeather';

export default {
  components:{
    scrollWeather
  },
  data() {
    return {
      city: [],
      temperature:'',
      weatherType:'',
      hum: '',
      describe:'',
      isExcellent:false,
      isGood:false,
      isNormal:false,
      isBad:false

    };
  },
  methods: {
    goToSelect() {
      return this.$router.push("/weather/select");
    },
    setScroll(scroll){
      this.scroll = scroll
    },
    addCity(cityname){
      this.$http({
        url:'http://localhost:3000/addCity',
        method:'post',
        data:{
          cityId:cityname
        }
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created () {
    // let cities = [];
    // 点击热门城市选择的城市
    let _hasCity = localStorage.getItem('hasCity');
    // 不精确定位的城市
    let _geoCity = localStorage.getItem('geo_city');
    // 精确定位的城市
    let _geoDistrict = localStorage.getItem('geo_district');
    // 搜索的城市
    let _queryCity = localStorage.getItem('queryCity');

    let queryHasCity = this.$route.query.queryHasCity;
    let queryGeo_City = this.$route.query.geo_city;
    let queryGeo_district = this.$route.query.geo_district;
    let queryCity = this.$route.query.queryCity;
      console.log(_queryCity,queryCity)

    // console.log(_hasCity,_geoCity,queryCity,_geoDistrict)

    // if(_hasCity === '' &&  _geoCity === '' && queryCity === '' &&_geoDistrict === ''){
    //   // 默认城市南京
    //   this.city.unshift('南京')
    // }else if(_hasCity == 0 && _geoCity != 0 &&queryCity ==0 &&_geoDistrict ==0){
    //   cities.unshift(_geoCity)
    // } else if(_hasCity !=0 && _geoCity ==0 &&queryCity ==0 &&_geoDistrict ==0){
    //   cities.unshift(_hasCity)
    // }else if(_hasCity ==0 &&  _geoCity ==0 && queryCity !=0 &&_geoDistrict ==0){
    //   cities.unshift(queryCity)
    //   console.log(cities)
    // }else {
    //   cities.unshift(_geoDistrict )

    // }
    if(_geoDistrict == queryGeo_district){

     localStorage.thatCity = _geoDistrict;

    }else if(_hasCity ==queryHasCity){

     localStorage.thatCity = _hasCity;
    }else if(_geoCity == queryGeo_City){

     localStorage.thatCity = _geoCity;
    }else if(queryCity == _queryCity){

     localStorage.setItem('thatCity',_queryCity)
    }
    // console.log(cities)

    for(let i=0;i<this.city.length;i++){
      // let a ;
      if(typeof(this.city[i]) === "undefined"){
       this.city.splice(i,1)
        i--;
      }

    }
    // let _cities = JSON.stringify(cities)
    // localStorage.setItem('cities',_cities)
    // let _city = JSON.parse(localStorage.cities)
    // console.log(_city)
    // if (_city === cities){
    //   this.city = _city
    // }else {
    //   let arr = [...new Set(cities,_city)]
    //   localStorage.cities = arr
    //   this.city = arr
    // }


    // let a = this.$route.query;
    // console.log(a)
      // console.log(localStorage.getItem('hasCity'))
      this.addCity(localStorage.thatCity)
      console.log(localStorage.thatCity)
      // localStorage.removeItem('thatCity')
    this.city.unshift(localStorage.getItem('thatCity'))

  },
  mounted () {
    // console.log(localStorage.cities)
    // console.log(this.city)

    let city = this.city[0]
    this.$http.get(`https://free-api.heweather.net/s6/weather/now?location=${city}&key=5eb51416bfcf4437b13f778b9e41e154`).then(res=>{
      // console.log(res)
      this.temperature = res.data.HeWeather6[0].now.tmp;
      this.weatherType = res.data.HeWeather6[0].now.cond_txt;
      this.hum = res.data.HeWeather6[0].now.hum;
      let hum =  res.data.HeWeather6[0].now.hum;
      if (hum<40){
        this.describe = '差'
        this.isBad = true
      } else if (hum >=40 && hum <=60){
        this.describe = '中'
        this.isNormal = true
      } else if (hum >60 && hum<80){
        this.describe = '良'
        this.isGood = true

      }else {
        this.describe = '优'
        this.isExcellent = true
      }
      })
  },

  computed: {

  }
};
</script>

<style scoped>
#Weather {
  /* position: relative; */
  position: absolute;
  width: 100%;
  color:white;
  height: 100%;
  /* height: 750px; */
  z-index: -1;
  background: url("https://images.pexels.com/photos/2873992/pexels-photo-2873992.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
    no-repeat;
}
.select-box{

  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.select{
  width: 1.5rem;
  height: 1.5rem;
 margin:  0.4rem 0.4rem ;
 /* vertical-align: -0.6rem; */
}
.selected-city{
  font-size:1.3rem;
  letter-spacing: 0.2rem;
}
.temperature{
  display: flex;
  width: 90%;
  height: 7rem;
  margin:3rem auto 0;
}
.temperature-left{
  font-size: 6rem;
  /* width: 30%; */
}
.temperature-right{
  display: flex;
  width: 60%;
}
.temperature-detail{
  /* display: flex; */
 width: 80%;
 /* align-items: center; */
 /* flex-direction: column; */
 margin-left: .5rem;

}
.weather-box{
  font-size: 1.5rem;
 margin-top: 1rem;

}
.feedback{
  background: rgba(147, 183, 220, 0.4);
  width: 5.5rem;
  text-align: center;
  margin-top: 1.3rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 18px 20px 20px 4px;

}
.index{
  height: 2.5rem;
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  background:RGBA(121,162,201,.8);
  border-radius: 4px;




}
.indexColor{
width: .5rem;
height: 1.5rem;
/* background-color: black; */
display: inline-block;
/* margin-top: 0.5rem; */
margin-right: 0.3rem;
border-radius: 20px;
}
.describe{
/* margin-top: 0.3rem; */
margin-right: 0.3rem;
}

.exlellent{
  background-color: #207561;
}
.good{
  background-color: #9cf196;
}
.normal{
  background-color: #93b5b3;
}
.bad{
  background-color: #ca3e47;
}
.scrollWeather{
  margin-top: 1.9rem;
}
.wrapper-info{
  /* margin-left: .5rem; */
  margin-bottom: 0.3rem;
  color:#1b335f;
  font-weight: bold;
}
</style>
