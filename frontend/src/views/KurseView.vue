<script>
import { mapActions, mapGetters } from "vuex";
import SettingsComponent from "@/components/SettingsComponent.vue";
import Upload from "../components/UploadComponent.vue";

export default {
  name: "KurseView",
  data() {
    return {
      names: ["course", "dates"],
      fach: "",
      thema: "",
    };
  },
  mounted() {
    this.set("course");
    this.setKalender();
  },
  methods: {
    ...mapActions(["set", "setKalender"]),
    logout() {
      localStorage.removeItem("dhbwiki_jwt");
      this.$swal({
        icon: "success",
        title: "Erfolgreich abgemeldet",
        text: "Du wirst jetzt zur Startseite weitergeleitet",
      }).then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    ...mapGetters(["get"]),
    data() {
      let data = [];
      this.names.forEach((name) => {
        data[name] = this.get(name);
      });
      return data;
    },
    kurse() {
      return this.data["course"];
    },
    dates() {
      return this.data["dates"].events;
    },
  },
  components: {
    Upload,
    SettingsComponent,
  },
};
</script>

<template>
  <div id="kurse">
    <Upload ref="uploadComponent" fach-prop="fach" thema-prop="thema"></Upload>
    <settings-component ref="settingsComponent"></settings-component>
    <header>
      <nav>
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="DHBWikiLogo"
        /></router-link>
        <div class="flex">
          <a href="#" @click.prevent="logout()">Abmelden</a>
          <a
            href="#"
            @click.prevent="$refs.settingsComponent.open = true"
            class="settings"
          >
            <img src="@/assets/Settings.png" alt="Settings"
          /></a>
        </div>
      </nav>
      <div>
        <h1>Fächerübersicht</h1>
      </div>
    </header>
    <ul>
      <li><h3>Vorlesungen morgen</h3></li>
      <li v-for="(date, i) of dates" :key="i">
        <span>
          {{ date.dtstart.value | moment("LT") }} -
          {{ date.dtend.value | moment("LT") }}
        </span>
        <div class="dots"></div>
        <span>
          {{ date.summary }}
        </span>
      </li>
    </ul>
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

ul {
  background: #171b29;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style: none;
  h3 {
    margin-bottom: 0.5vw;
    text-align: center;
  }
  li:not(:first-child) {
    width: 30%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2vw;
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
.flex {
  display: flex;
  flex-direction: row;
  img {
    width: 2.5vw;
    margin-left: 1vw;
  }
}
</style>
