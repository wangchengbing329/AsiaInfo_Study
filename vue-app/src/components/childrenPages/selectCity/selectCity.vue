

/*本页面的名称如过长全部采用首写字母缩写 例如 selectCity-page === SCP */
<template>
  <div id="selectCity-page">
    <div class="SCP-title">世界，一个触碰的距离</div>

    <div class="SCP-search">
      <input type="text" class="search-box" placeholder="搜索全球城市" />
      <div class="search-icon-box">
        <img src="../../../assets/imgs/page-selectCity/search.png" alt class="search-icon" />
      </div>
    </div>

    <div class="SCP-hotCity">
      <div class="SCP-hotCity-title">热门城市</div>

      <div class="SCP-hotCity-box">
        <div class="SCP-geolocation" @click="Geolocation">
          <img
            src="../../../assets/imgs/page-selectCity/scpLocation.png"
            alt
            class="selectGeolocation"
          />
          <div class="hotCity">{{geo_opreator}}</div>
        </div>
        <div
          class="SCP-hotCity-show"
          v-for="(item,key) in hotCity"
          :key="key"
          @click="selectCity(item)"
        >{{item}}</div>
      </div>
      <div class="soft-blank"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotCity: [],
      isGeo: false,
      geo_city: "",
      geo_district: "",
      hasCity:[]
      // geo_opreator:'定位'
    };
  },
  methods: {
    selectCity(item) {
      // console.log(item);
      let city = item
      // console.log(city)
      // let cities = []
      this.hasCity.unshift(city)
      // console.log(this.hasCity)

      // console.log(ci[0])
      // console.log(localStorage.getItem('hasCity'))
      // setTimeout(()=>{
      //     this.$router.replace({name:'Weather'})
      // },1000)


    },
    Geolocation() {
      let url = "https://apis.map.qq.com/ws/location/v1/ip";

      this.$jsonp(url, {
        key: "TC3BZ-2NT3U-WH6VV-BJS3R-6DIMS-P6FF7",
        output: "jsonp"
      }).then(json => {
        console.log(json);
        // this.lat = json.result.location.lat
        // this.lng = json.result.location.lng
        if (json.result.ad_info.district) {
          this.isGeo = true;
          this.geo_district = json.result.ad_info.district;
          // console.log(this.geo_district)
          localStorage.setItem("geo_district", this.geo_district);
        } else {
          // 当定位信息出现错误，无法精确到区，改为显示市区的天气
          this.geo_city = json.result.ad_info.city;
          localStorage.setItem("geo_city", this.geo_city);
        }
        setTimeout(()=>{
          this.$router.replace({name:'Weather'})
        },1000)

        //  return geo_localCity
      });
    }
  },
  mounted() {
    this.$http
      .get(
        "https://search.heweather.net/top?group=cn&key=5eb51416bfcf4437b13f778b9e41e154&number=20"
      )
      .then(res => {
        console.log(res);
        let hotCityList = res.data.HeWeather6[0].basic;
        for (let value of hotCityList) {
          this.hotCity.push(value.location);
        }
      });
  },
  updated() {
    console.log(this.hasCity)
localStorage.setItem('hasCity',[... new Set(this.hasCity)])
console.log(localStorage.getItem('hasCity'))
  },
  computed: {
    geo_opreator() {
      let _city = localStorage.getItem("geo_city");
      let _district = localStorage.getItem("geo_district");
      console.log(_district);
      if (_city === "" && _district === "") {
        return "定位";
      } else if (_district !== "") {
        return _district;
      } else {
        return _city;
      }
    }
  }
};
</script>

<style scoped>
/*本页面的名称如过长全部采用首写字母缩写 例如 selectCity-page === SCP  */
#selectCity-page {
  background: url("https://images.pexels.com/photos/2839755/pexels-photo-2839755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  height: 750px;
  position: absolute;
  width: 100%;
  z-index: -1;
}
.SCP-title {
  color: white;
  font-size: 1.5rem;
  text-align: right;
  /* text-combine-upright: 1; */
  margin-right: 1rem;
  height: 4rem;
  margin-top: 6rem;
}
.SCP-search {
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  color: #abb1c0;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;
  height: 3rem;
}
.search-box {
  font-size: 1.2rem;
  outline: none;
  border: none;
  margin-left: 2rem;
  letter-spacing: 0.1rem;
}
.search-icon-box {
  background-color: #2da1d7;
  width: 5rem;
  text-align: center;
  line-height: 4rem;
}
.search-icon {
  height: 1.5rem;
  width: 1.5rem;
}
.SCP-hotCity {
  margin-top: 3rem;
  background-color: #fff;
  color: #747a87;
  position: absolute;
  z-index: -1;
  width: 100%;
  /* display: flex; */
}
.SCP-hotCity-title {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1rem;
}
.SCP-hotCity-box {
  display: flex;
  justify-content: space-around;

  flex-wrap: wrap;
}
.SCP-geolocation,
.SCP-hotCity-show {
  display: flex;
  border: 1px solid #6c6e73;
  border-radius: 20px;
  width: 25%;
  justify-content: center;
  align-items: center;
  /* flex: 1; */
  height: 2rem;
  margin-top: 1rem;
}
.selectGeolocation {
  height: 1.3rem;
  width: 1.3rem;
}
.soft-blank {
  height: 6rem;
}
</style>
