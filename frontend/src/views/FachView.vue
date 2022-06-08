<script>
import { mapActions, mapGetters } from "vuex";
import date from "date-and-time";

export default {
  name: "FachView",
  data() {
    return {
      names: [],
      active: true,
      fach: this.$route.params.fach,
    };
  },
  mounted() {
    this.setMitschriften(this.fach);
    this.setKurs(this.fach);
  },
  methods: {
    ...mapActions(["setMitschriften", "setKurs"]),
    setActive(value) {
      this.active = value;
    },
    logout() {
      localStorage.removeItem("userid");
      this.$router.push("/");
    },
    sorted(topic) {
      return this.mitschriften.filter((el) =>
        this.active
          ? el.topic === topic
          : this.formatDate(new Date(el.created)) === topic
      );
    },
    formatDate(created) {
      return date.format(created, "D.M.Y");
    },
  },
  computed: {
    ...mapGetters(["get"]),
    mitschriften() {
      return this.get("mitschriften");
    },
    kurs() {
      return this.get("kurs");
    },
    topics() {
      let result = [];
      this.mitschriften.forEach((el) => {
        if (this.active) {
          if (!result.includes(el.topic)) {
            result.push(el.topic);
          }
        } else {
          if (!result.includes(this.formatDate(new Date(el.created)))) {
            result.push(this.formatDate(new Date(el.created)));
          }
        }
      });
      return result.sort();
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
        <a href="#" @click.prevent="logout()">Abmelden</a>
      </nav>
      <div>
        <h1>{{ kurs.name }}</h1>
        <div class="sort">
          <button :class="{ active: active }" @click.prevent="setActive(true)">
            Nach Thema sortieren
          </button>
          <button
            :class="{ active: !active }"
            @click.prevent="setActive(false)"
          >
            Nach Datum sortieren
          </button>
        </div>
      </div>
    </header>
    <main>
      <div v-for="(topic, i) of topics" :key="i" class="kategorie">
        <div class="titel">
          <p>{{ topic }}</p>
          <!--          <button v-if="active" class="upload" @click="setActive(false)">-->
          <!--            <img src="../assets/upload.png" />-->
          <!--          </button>-->
        </div>
        <div class="mitschriften">
          <div
            v-for="(mitschrift, y) of sorted(topic)"
            :key="y"
            class="mitschrift"
          >
            <h3>{{ mitschrift.title }}</h3>
            <p>{{ formatDate(new Date(mitschrift.created)) }}</p>
            <div class="buttons">
              <router-link
                :to="$route.path + '/' + mitschrift._id"
                class="small"
              >
                Ansehen
              </router-link>
              <!--              <a class="small">Download</a>-->
            </div>
          </div>
        </div>
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

    .sort {
      display: flex;
      flex-direction: row;

      button {
        background: none;
        border: 0;
        outline: none;
        font-size: 0.7vw;
        padding: 0 0.5vw;
        padding-bottom: 0.5vw;
        margin: 0 0.1vw;
        border-bottom: 0.104vw solid transparent;
        cursor: pointer;

        &:hover {
          color: #ffffffbb;
        }

        &.active {
          border-bottom: 0.104vw solid #464a5b;
        }
      }
    }
  }
}

main {
  background: #171b29;
  padding: 4vw 7.79vw;

  .kategorie {
    .titel {
      border-bottom: 0.104vw solid #464a5b;
      display: flex;
      width: max-content;
      padding: 0.2vw;

      p {
        font: normal normal 600 1.033vw/1.146vw Noto Sans;
        color: #ffffff;
        //margin-right: 0.5vw;
      }

      button {
        width: 1.25vw;
        height: 1.25vw;
        background: #ffffff26;
        outline: 0;
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 50%;
        }
      }
    }

    .mitschriften {
      padding: 1vw;
      display: grid;
      justify-content: space-between;
      align-items: center;
      grid-template-columns: repeat(6, calc((100% - 2.5vw) / 6));
      gap: 0.5vw;

      .mitschrift {
        background: #ffffff1a;
        padding: 0.833vw;
        width: 100%;
        box-sizing: border-box;

        h3 {
          text-align: center;
          font: normal normal 600 1.667vw/2.24vw Noto Sans;
          color: #ffffff;
        }

        p {
          text-align: center;
          font: normal normal 500 0.833vw/1.146vw Noto Sans;
          margin: 0.5vw 0;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
