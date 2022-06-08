<template>
  <footer>
    <p>© 2021 DHBWiki. All Rights Reserved.</p>
    <div class="flex">
      <p>Privacy Policy</p>
      <p>Terms of Service</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  height: 4.17vw;
  background: #171b29;
  padding: 0 7.81vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font: normal normal bold 0.68vw/0.99vw Noto Sans;
  }
  .flex {
    display: flex;
    p:first-child {
      margin-right: 3.65vw;
    }
  }
}
</style>
