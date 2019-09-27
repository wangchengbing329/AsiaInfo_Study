function geolocation () {
  if(global.navigator.geolocation){
    global.navigator.geolocation.getCurrentPosition(function (position){
      console.log(position)
    })
  }
}
geolocation()
