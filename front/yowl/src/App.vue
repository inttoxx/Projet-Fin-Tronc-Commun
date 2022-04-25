<template>

  <router-view/>

</template>

<script>

export default ({

})
</script>


<style>
  #app{
    width: 100vw;
    height: 100vh;
  }

  body {
    background: #3b3b3b !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
  }

  .vue-template form {
    align-items: center;
  }

  .navbar-light {
    background-color: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  }

  .vertical-center {
    display: flex;
    text-align: left;
    justify-content: center;
    flex-direction: column;
  }

  .inner-block {
    width: auto;
    margin: auto;
    background: #ffcc57;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }

  .vertical-center h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }

  label {
    font-weight: 500;
  }

</style>