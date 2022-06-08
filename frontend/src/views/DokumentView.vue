<script>
import { mapActions, mapGetters } from "vuex";
import date from "date-and-time";

export default {
  name: "DokumentView",
  mounted() {
    this.setMitschrift(this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["setMitschrift"]),
    setActive(value) {
      this.active = value;
    },
    logout() {
      localStorage.removeItem("dhbwiki_jwt");
      this.$router.push("/");
    },
    formatDate(created) {
      return date.format(created, "D.M.Y");
    },
  },
  computed: {
    ...mapGetters(["get"]),
    mitschrift() {
      return this.get("mitschrift");
    },
  },
};
</script>

<template>
  <div id="kurse">
    <header>
      <nav>
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="DHBWikiLogo"
        /></router-link>
        <div class="informations">
          <p>{{ mitschrift.topic + " - " + mitschrift.title }}</p>
          <small>{{ formatDate(new Date(mitschrift.created)) }}</small>
        </div>
        <a href="#" @click.prevent="logout()">Abmelden</a>
      </nav>
    </header>
    <main>
      <embed
        :src="
          'https://dhbwiki.th1nk.media/api/file/' + mitschrift._id + '/asset'
        "
        :type="mitschrift.file_type"
      />
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  background: #171b29;

  nav {
    padding: 1.56vw 7.29vw;
    height: 4.17vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 8vw;
      cursor: pointer;
    }

    .informations {
      text-align: center;
      margin: 0 auto;
    }
  }
}

main {
  background: #171b29;
  padding: 4vw 7.79vw;
  display: flex;
  justify-content: center;
  align-items: center;

  embed {
    width: 100%;
    min-height: 35vw;
    margin: 0 auto;
  }
}
</style>
