<template>
  <div id="app">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/FooterComponent.vue";

export default {
  components: {
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap");

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #24262b;

  * {
    margin: 0;
    padding: 0;
    font-family: Noto Sans;
    color: #fff;
  }
}

a:not(.logo):not(.settings),
[type="submit"] {
  background: transparent linear-gradient(108deg, #fc0441 0%, #f62da8 100%) 0%
    0% no-repeat padding-box;
  text-decoration: none;
  font: normal normal 600 0.83vw/1.15vw Noto Sans;
  padding: 0.68vw 1.61vw;
  border-radius: 1.25vw;
  outline: 0;
  border: 0;
  cursor: pointer;

  &.small {
    padding: 0.2vw 0.6vw;
    font-weight: 500;
  }
}

input,
textarea,
select {
  background: #ffffff26;
  font: normal normal 600 0.83vw/1.15vw Noto Sans;
  padding: 0.78vw;
  outline: 0;
  border: 0;
}

option {
  background: #2e323e;
}
</style>
