<template>
  <div>
  <b-container class="bv-example-row">
  <b-row>
    <b-col><b-img class="img" src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img></b-col>
    <b-col>
      <b-link href="#1" class="link" to="/">1</b-link>
      <b-link href="#2">2</b-link>
      <b-link href="#3">3</b-link>
    </b-col>
    <b-col>3 of 3</b-col>
  </b-row>
</b-container>
</div>
</template>

<script>
export default {

}
</script>

<style>
.img{
  width: 20px;
  height: 20px;
}
.link{
  color:grey;
   text-decoration: none;
}
/* .router-active{
  color:white;
} */
</style>
