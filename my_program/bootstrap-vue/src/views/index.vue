<template>
  <div class="container">
    <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>

         <swiper :options="swiperOption" class="swiper">


        <swiper-slide class="slide"><img src="https://images.pexels.com/photos/2973102/pexels-photo-2973102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></swiper-slide>

        <!-- <swiper-slide class="slide"><img src="https://images.pexels.com/photos/2973102/pexels-photo-2973102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></swiper-slide> -->

        <div class="swiper-pagination" slot="pagination"></div>



      </swiper>
 <div class="player">
          <video-player  class="vjs-custom-skin"
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true"
                         @play="onPlayerPlay($event)"
                         @pause="onPlayerPause($event)"
                         @ended="onPlayerEnded($event)"
                         @loadeddata="onPlayerLoadeddata($event)"
                         @waiting="onPlayerWaiting($event)"
                         @playing="onPlayerPlaying($event)"
                         @timeupdate="onPlayerTimeupdate($event)"
                         @canplay="onPlayerCanplay($event)"
                         @canplaythrough="onPlayerCanplaythrough($event)"
                         @ready="playerReadied"
                         @statechanged="playerStateChanged($event)">
          </video-player>

</div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        swiperOption: {
          // loop:true,
          // effect: 'coverflow',
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


        },
         playerOptions: {
          height: '360',
          autoplay: true,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            // mp4
            src: "https://player.vimeo.com/external/371905764.sd.mp4?s=90602b652998477512f08f9d21702e94d23ad79a&profile_id=139&oauth2_token_id=57447761",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
        }
      }
    },  computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }, methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        console.log('example player 1 readied', player)
        player.currentTime(10)
        // console.log('example 01: the player is readied', player)
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
