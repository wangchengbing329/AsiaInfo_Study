<template>
  <div class="tabBar">

<slot></slot>

  </div>
</template>

<script>

export default {

  data() {
    return {

    };
  },
  methods: {

    }

};
</script>

<style>
.tabBar {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  background-color: #33313b;
  height: 3.2rem;
  right: 0;
  box-shadow: 0 3px .3 4px  white;
}

</style>
