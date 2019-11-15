<template>
  <div class="container">
    <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>

         <swiper :options="swiperOption" class="swiper">


        <swiper-slide class="slide"><img src="https://images.pexels.com/photos/2973102/pexels-photo-2973102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></swiper-slide>
        <swiper-slide class="slide"><img src="https://images.pexels.com/photos/2973102/pexels-photo-2973102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></swiper-slide>
        <swiper-slide class="slide"><img src="https://images.pexels.com/photos/2973102/pexels-photo-2973102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></swiper-slide>
        <!-- <swiper-slide class="slide"><img src="https://images.pexels.com/photos/2973102/pexels-photo-2973102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></swiper-slide> -->

        <div class="swiper-pagination" slot="pagination"></div>



      </swiper>



  </div>
</template>

<script>
export default {
    data () {
      return {
        swiperOption: {
          loop:true,
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,

          slidesPerView: 3,
          coverflowEffect: {
            rotate:10,
            stretch:-50,
            depth: 150,
            modifier:1,
            slideShadows : false
          },
          pagination:{
          el:  '.swiper-pagination',

          }


        }
      }
    }
}
</script>

<style>
img{
  width: 300px;
}
.slide{
  width: 300px;
}
.swiper{
  width: 900px;
}
.container{
  display: flex;
}
.swiper-container{
  
}
</style>
