<template>
  <div id="select-page">
    <!-- 点编辑之前的页面 -->
    <div class="noEdit" v-if="!isEdit" key=1>
      <!-- 头部 -->
      <div class="select-header">
        <img
          @click="goBackToWeather"
          src="../../../assets/imgs/page-select/cancel.png"
          alt
          class="icon"
        />
        <!-- <svg @click="goBackToWeather" t="1569221989765" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1850" width="64" height="64"><path d="M563.591 535.628l289.17-287.604c13.666-13.636 13.726-35.699 0.12-49.334-13.634-13.756-35.637-13.756-49.303-0.18l-289.2 287.724L227.646 198.66c-13.545-13.575-35.669-13.696-49.304-0.06-13.635 13.574-13.665 35.668-0.06 49.303l286.612 287.545-288.99 287.484c-13.665 13.575-13.726 35.639-0.15 49.334 6.832 6.893 15.742 10.294 24.712 10.294a34.8 34.8 0 0 0 24.621-10.173l289.08-287.545 289.29 290.193c6.833 6.893 15.743 10.295 24.713 10.295 8.91 0 17.819-3.402 24.591-10.174 13.636-13.635 13.666-35.699 0.06-49.334l-289.23-290.194z m0 0" p-id="1851" fill="#ffffff"></path></svg> -->
        <div @click="isEdit = !isEdit" class="select-header-text">编辑</div>
      </div>

      <!-- 内容定位部分 -->
      <div class="select-section-geolocation" @click="geolocation">
        <div class="select-section-geolocation-text">立即定位</div>
        <div class="select-section-geolocation-img">
          <img class="location-img" src="../../../assets/imgs/page-select/location.png" alt />
        </div>
      </div>
      <!-- 内容本地天气显示部分 -->
      <div class="select-section-localWeather">
        <div class="select-section-localWeather-localCity">{{isDetail?district:localCity}}</div>

        <div class="localWeather-detail">
          <div class="localWeather-detail-top">
            <div class="weather-temperature">{{temperature}}&#8451;</div>
            <img src="../../../assets/imgs/weather/sun.png" alt />
          </div>

          <div class="localWeather-detail-bottom">天气早晚提醒</div>
        </div>
      </div>
    </div>

    <!-- 点编辑之后的样子 -->
    <div v-else class="select-another-header" key =2>
      <div class="another-header" @click="isEdit = !isEdit">完成</div>
      <div class="another-header-content">
        <!-- AHC === another-header-content 太长了，换一下 -->
        <div class="AHC-left">

          <div class="cancelCircle"  @click="deleteCity" ref="rotateCancel">
            <transition name="rotateLine" @before-enter="beforeRotate" @enter="rotate" @after-enter="afterRotate" >
            <div v-if="isSure" class="cancelLine"></div>
            <div v-else class="justifyLine"></div>
            </transition>
          </div>

          <div class="AHC-localCity">{{isDetail?district:localCity}}</div>
        </div>


        <div class="AHC-right" v-if="isSure">
          <div class="AHC-right-text">{{isSure?'已':'设'}}为提醒城市</div>
          <div class="icon-select"></div>
        </div>
        <div v-else class="deleteIcon">删除</div>
      </div>

    </div>

    <!-- 最下面添加城市部分 -->
    <div class="addCity" @click="addCity">
      <div class="addCity-img">
        <img src="../../../assets/imgs/page-weather/add.png" alt />
      </div>
      <div class="addCity-text">添加城市</div>
    </div>






  </div>




</template>

<script>
export default {
  data() {
    return {

      temperature: "27",
      isEdit: false,
      isSure: true,
      lat:0,
      lng:0,
      district:'',
      isDetail:false,
       localCity: '',
    };
  },
  methods: {
    goBackToWeather() {
      return this.$router.go(-1);
    },
    edit() {

    },

    geolocation () {
      let url = 'https://apis.map.qq.com/ws/location/v1/ip'

      this.$jsonp(url,{
        key:'TC3BZ-2NT3U-WH6VV-BJS3R-6DIMS-P6FF7',
        output:'jsonp',
      }

      ).then(json=>{
        // console.log(json)
        // this.lat = json.result.location.lat
        // this.lng = json.result.location.lng
        if(json.result.ad_info.district){
          this.isDetail = true
          this.district = json.result.ad_info.district
        }else{
          // 当定位信息出现错误，无法精确到区，改为显示市区的天气
          this.localCity = json.result.ad_info.city

        }


      })
    //  this.$http.get('https://apis.map.qq.com/ws/location/v1/ip?key=TC3BZ-2NT3U-WH6VV-BJS3R-6DIMS-P6FF7').then(res=>{
    //    console.log(res)
    //  })
            },
  deleteCity () {
      this.isSure = !this.isSure

    },
    addCity () {
      this.$router.push('/weather/selectcity')
    },
    //动画
    beforeRotate(el) {
      console.log(el)
       el.style.opacity = 0
    },
    rotate(el) {

    },
    afterRotate(el){

    }
    },


    mounted() {
      this.geolocation()
        },
  computed: {
    // isEdit() {
    //   let edit = this.edit
    //   const editChange = new Promise(edit)
    //   editChange.then((res)=>{
    //     console.log(res)
    //   })
    //   let isSure = this.isSure;
    //   // console.log(isSure);
    //   if (isSure) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  }
};
</script>

<style scoped>
#select-page {
  background: repeating-linear-gradient(#0f3ea3, #63abe6, #a2ddf8);
  height: 650px;
  color: white;
  width: 100%;
}
.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}
.icon {
  height: 1.5rem;
  width: 1.5rem;
  margin: 0 1rem;
}
.select-header-text {
  /* color: white; */
  margin-right: 1rem;
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
}
.select-section-geolocation {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select-section-geolocation-text {
  /* color: white; */
  margin-left: 1rem;
  font-size: 1.3rem;
}
.select-section-geolocation-img {
  background-color: #172a5f;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  text-align: center;
  font-size: 0;
  line-height: 2rem;
  margin-right: 1rem;
}
.location-img {
  height: 1.1rem;
  width: 1.1rem;
  vertical-align: middle;
}
/* 内容本地天气显示部分 */
.select-section-localWeather {
  background-color: rgba(25, 49, 104, 0.2);
  display: flex;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
}
.select-section-localWeather-localCity {
  font-size: 1.2rem;
  margin-left: 1rem;
}
.localWeather-detail {
  width: 30%;
}
.localWeather-detail-top {
  display: flex;
}
.weather-temperature {
  margin: auto 0;
  font-size: 1.2rem;
}
.localWeather-detail-top img {
  height: 2.4rem;
  width: 2.4rem;
  margin-left: 0.6rem;
}
.localWeather-detail-bottom {
  font-size: 0.9rem;
  color: #8b9ab4;
}

/* 添加城市部分 */
.addCity {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
.addCity-img {
  border-radius: 50%;
  background-color: #5c759c;
  height: 1.7rem;
  width: 1.7rem;
  /* margin: auto; */
  text-align: center;
  margin-top: 0.2rem;
}
.addCity-img img {
  height: 1.5rem;
  width: 1.5rem;

  vertical-align: middle;
}
.addCity-text {
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  margin-left: 1rem;
}

.another-header{
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 4rem;
  margin-right: 2rem;
}
.another-header-content{
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

background-color: rgba(24,43,97,.3);

}
.AHC-left{
   display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.5rem;
}
.cancelCircle{
  background-color: red;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;


}
.cancelLine{
  background-color: #fff;

  height: .2rem;
  width: 1.1rem;
}
.justifyLine{
   background-color: #fff;

  height: 1.1rem;
  width: .2rem;
}
.AHC-localCity{
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  margin-left: 1rem;
}
.AHC-right{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}
.icon-select{
  height: 0.2rem;
  width: 1.2rem;
  border-top: .6rem  double #979a9c;
  border-bottom:0.2rem solid #979a9c;
}
.AHC-right-text{
  margin-right: 1rem;
  border-radius: 4px;
  background-color: #4195ea;
  height: 2rem;
  width: 7rem;
  text-align: center;
  line-height: 2rem;
}
.deleteIcon{

background-color: red;
border-radius: 4px;
text-align: center;
height: 2.2rem;
width: 4rem;
margin-right: 1rem;
line-height: 2rem;
}
.rotateLine-enter-active,.rotateLine-leave-to{
  transform: rotateZ(180deg);
}

</style>
