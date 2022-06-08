<script>
import { mapActions, mapGetters } from "vuex";
import Upload from "../components/UploadComponent.vue";

export default {
  name: "KurseView",
  data() {
    return {
      names: ["course"],
      fach: "",
      thema: "",
    };
  },
  mounted() {
    this.names.forEach((name) => this.set(name));
  },
  methods: {
    ...mapActions(["set"]),
    logout() {
      localStorage.removeItem("userid");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["get"]),
    kurse() {
      let data = [];
      this.names.forEach((name) => {
        data[name] = this.get(name);
      });
      return data["course"];
    },
  },
  components: {
    Upload,
  },
};
</script>

<template>
  <div id="kurse">
    <Upload ref="uploadComponent" fach-prop="fach" thema-prop="thema"></Upload>
    <header>
      <nav>
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="DHBWikiLogo"
        /></router-link>
        <a href="#" @click.prevent="logout()">Abmelden</a>
      </nav>
      <div>
        <h1>Fächerübersicht</h1>
      </div>
    </header>
    <main>
      <div v-for="(kurs, i) in kurse" :key="i" class="fach">
        <div
          class="upload"
          @click="
            $refs.uploadComponent.open = true;
            $refs.uploadComponent.upload.course = kurs._id;
            $refs.uploadComponent.courses = kurse;
          "
        >
          <img src="../assets/upload.png" />
        </div>
        <h1>{{ kurs.name }}</h1>
        <router-link :to="'/kurse/' + kurs._id">Mitschriften</router-link>
      </div>
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
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-bottom: 2vw;

    h1 {
      font: normal normal bold 2.92vw/3.33vw Noto Sans;
      width: 40%;
      text-align: center;
      margin-bottom: 1.56vw;
    }

    p {
      font: normal normal 600 0.83vw/1.15vw Noto Sans;
      margin-bottom: 2.6vw;
    }
  }
}

main {
  background: #171b29;
  padding: 4vw 7.79vw;
  padding-bottom: 8vw;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  place-items: center;
  row-gap: 4vw;

  .fach {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .upload {
      display: grid;
      place-items: center;
      background: #ffffff26;
      border-radius: 50%;
      padding: 0.54vw;
      cursor: pointer;
      width: 1.7vw;
      height: 1.7vw;

      img {
        width: 90%;
      }
    }

    h1 {
      font: normal normal bold 1.25vw/1.77vw Noto Sans;
      margin-top: 1.04vw;
      margin-bottom: 1.56vw;
    }
  }
}
</style>
