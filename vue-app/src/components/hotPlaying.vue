<template>
<div id="hotMovie">

</div>
</template>

<script>
export default {
data () {
  return {
    hotMovies:[]
  }
},
methods:{

},
created(response){
  console.log(11111)
  const baseUrl = 'https://api.douban.com/v2/movie/in_theaters'
  const city = '北京'
  const count = 9
  let start = 0
  let hotMoviesParams = JSON.stringify({
    city:'北京',
    count:9,
    start:0,
    apikey:'apikey=0b2bdeda43b5688921839c8ecb20399b'
  })
this.$http({
  type:'get',
  url:`${baseUrl}`,
  data:hotMoviesParams

  }).then(res=>{
  console.log(res)
})
}
}
</script>

<style>

</style>
