

/*本页面的名称如过长全部采用首写字母缩写 例如 selectCity-page === SCP */
<template>
  <div id="selectCity-page">
    <div class="SCP-title">世界，一个触碰的距离</div>

    <div class="SCP-search">
      <input type="text" class="search-box" placeholder="搜索全球城市" v-model="value" @keyup.enter="searchValue" />
      <div class="search-icon-box" @click="searchCity">
        <img src="../../../assets/imgs/page-selectCity/search.png" alt class="search-icon" />
      </div>
    </div>
    <ul class="inputValue" :style="{display:show}" @click="hasSelect">
      <li v-for="(item,key) in showCities" :key = key>{{address(item)}}</li>
    </ul>

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
  // import {City} from '@/api/cities/moogose.js';
  // import mongoose from 'mongoose'
export default {
  data() {
    return {
      hotCity: [],
      isGeo: false,
      geo_city: "",
      geo_district: "",
      hasCity:'',
      showCities:[],
      value:''

      // geo_opreator:'定位'
    };
  },
  methods: {
    selectCity(item) {
      // console.log(item);
      // let city = item
      // console.log(city)
      // let cities = []
      // this.hasCity.unshift(city)
      // console.log(this.hasCity)
      // localStorage.hasCity = this.hasCity
      // console.log(ci[0])
      // console.log(localStorage.getItem('hasCity'))
      this.hasCity = item
      localStorage.setItem('hasCity',this.hasCity)
      setTimeout(()=>{
          this.$router.replace({name:'Weather',
          query:{
            queryHasCity:this.hasCity
          }
          })
      },1000)


    },
    Geolocation() {
      let url = "https://apis.map.qq.com/ws/location/v1/ip";

      this.$jsonp(url, {
        key: "TC3BZ-2NT3U-WH6VV-BJS3R-6DIMS-P6FF7",
        output: "jsonp"
      }).then(json => {
        // console.log(json);
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
          // var city = new City({
          //   name: this.geo_city
          // })
          // news.save()
          localStorage.setItem("geo_city", this.geo_city);
        }

        setTimeout(()=>{
          this.$router.replace({name:'Weather',
          query:{
            geo_district:this.geo_district,
            geo_city:this.geo_city
          }})
        },1000)

        //  return geo_localCity
      });
    },
    searchCity(e) {
      console.log(this.value)
      let city = this.value;
      this.gotoSearch(city)
      // this.value = ''
      // this.address()

    },
    searchValue(e) {
      // console.log(e.target.value)
      let location = e.target.value
      this.gotoSearch(location)
      // console.log(this.value)
      // console.log(e)
      this.value = ''
      // this.address()
    },
    address(item){
      // let  {...item} = {admin_area,location,parent_city,cnty}
      // let addressInfo ;
      // 当知道所属国为中国时，我们需要给地址加上 县、 市、 省 这些内容
      let cnty = item.cnty,
      admin_area =item.admin_area,
      location = item.location,
      parent_city = item.parent_city;
      if(cnty === '中国'){

        // 先判断是搜索的结果是市并不市县
        if(location == parent_city){

        // 需要再判断 省这一级是否是自治区，中国有五个自治区分别是 新疆、西藏、广西、内蒙古、宁夏
          if(admin_area ==='新疆' ||admin_area ==='内蒙古'||admin_area ==='广西'||admin_area ==='宁夏'||admin_area ==='西藏'){

          // 返回不包含县这一级得结果
          return `${location}市、${admin_area}自治区`
          }

          else{
            return `${location}市、${admin_area}省`
          }
        }

        else {
           if(admin_area ==='新疆' ||admin_area ==='内蒙古'||admin_area ==='广西'||admin_area ==='宁夏'||admin_area ==='西藏'){

          // 返回包含县这一级得结果
          return `${location}县、${parent_city}市、${admin_area}自治区`

          }
          else{
          return `${location}县、${parent_city}市、${admin_area}省`

          }
        }
      }

        // 不是中国得就按结果显示出来
      else{

          // 同样需要判断一下给出得外国搜索结果是否是市，并不包含类似于县这一级
          if(location == parent_city){
          return `${location}、${admin_area}`
        } else {
          return `${location}、${parent_city}、${admin_area}`
    }

      }
    },
    gotoSearch(location){
       setTimeout(()=>{
        this.$http.get(`https://search.heweather.net/find?location=${location}&key=5eb51416bfcf4437b13f778b9e41e154`).then(res=>{
          console.log(res)
          let  searchAnswer = res.data.HeWeather6[0].basic
          let infomation =[]
          for (let item of searchAnswer){
            let cityInfo = {}
            let admin_area,location,parent_city,type,cnty;
            admin_area = item.admin_area;
            location = item.location;
            parent_city = item.parent_city;
            type = item.type;
            cnty = item.cnty
            if(item.type === 'city'){
              cityInfo = {
                admin_area,
                location,
                parent_city,
                cnty
              }
            }else {
              continue;
            }
            infomation.push(cityInfo)
          // console.log(cityInfo)
          }
          this.showCities = infomation;
        })
        // this.values.push(e.target.value)
      },300)
    },
    hasSelect(e){
      console.log(e)
      // this.show = false
      // let ul = document.querySelector('.inputValue');
      let search_value = e.target.innerText;
      let hasShowValue = search_value.substring(0,2)
      // console.log(hasShowValue)
      // this.value = ''
      // ul.style.display = 'none'
      // 当选择了城市之后清空数组
      localStorage.setItem('queryCity',hasShowValue)
      this.$router.replace({
        name:'Weather',
        query:{
          queryCity:hasShowValue
        }
      })
      this.showCities = []

    }
  },
  mounted() {
    this.$http
      .get(
        "https://search.heweather.net/top?group=cn&key=5eb51416bfcf4437b13f778b9e41e154&number=20"
      )
      .then(res => {
        // console.log(res);
        let hotCityList = res.data.HeWeather6[0].basic;
        for (let value of hotCityList) {
          this.hotCity.push(value.location);
        }
      });
  },

  computed: {
    geo_opreator() {
      let _city = this.geo_city;
      let _district = this.geo_district;
      // console.log(_district);
      if (_city === "" && _district === "") {
        return "定位";
      } else if (_district !== "") {
        return _district;
      } else {
        return _city;
      }
    },
    show () {
      if(this.showCities.length ===0){
        return 'none'
      }
      else{
        return 'block'
      }
    },

  }
};
</script>

<style scoped>
/*本页面的名称如过长全部采用首写字母缩写 例如 selectCity-page === SCP  */
#selectCity-page {
  background: url("https://images.pexels.com/photos/2839755/pexels-photo-2839755.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  height: 650px;
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
.inputValue{
  /* background-color: #fff; */
  background:rgba(255,255,255,.6);
  font-family: 'Times New Roman', Times, serif;
  width: 75%;
  margin: 1rem auto 0;
  border-radius: 10px;
}
ul li{
  list-style: none;
  /* margin-top: 0.3rem; */
  font-size: 1.2rem;
  border-bottom: 1px solid #6c6e73;
  /* height: 2rem; */
  width: 100%;
  /* margin: .6rem auto 0; */
  line-height: 2.5rem;
  padding: 0;
  margin: 0;
}
</style>
