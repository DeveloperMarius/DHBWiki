<template>
  <footer>
    <p>© {{ new Date().getFullYear() }} DHBWiki. All Rights Reserved.</p>
    <div class="flex">
      <router-link to="/privacy">Privacy Policy</router-link>
      <router-link to="/impressum">Impressum</router-link>
    </div>
  </footer>
</template>

<script></script>

<style lang="scss" scoped>
footer {
  height: 4.17vw;
  background: #171b29;
  padding: 0 7.81vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p,
  a {
    font: normal normal bold 0.68vw/0.99vw Noto Sans;
  }
  .flex {
    display: flex;
    a {
      all: unset;
      font: normal normal bold 0.68vw/0.99vw Noto Sans;
      margin-right: 1vw;
      cursor: pointer;
    }
  }
}
</style>
