<script>
import { mapActions } from "vuex";
import Login from "@/components/LoginComponent.vue";
import Register from "../components/RegisterComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      names: [],
      window: window,
      document: document,
      background: 0,
      sitzenbleiben: 0,
      login: false,
      feedback: {
        email: null,
        text: null,
      },
    };
  },
  mounted() {
    this.names.forEach((name) => this.set(name));
  },
  methods: {
    ...mapActions(["send_feedback"]),
    handleScroll() {
      this.sitzenbleiben =
        this.window.scrollY -
        (document.getElementById("sitzenbleiben").offsetTop /
          this.window.innerHeight) *
          50;
      this.background = (this.window.scrollY / this.window.innerHeight) * 25;
    },
    trigger_feedback() {
      if (!this.feedback.email || !this.feedback.text) return;
      this.send_feedback(this.feedback);
      this.feedback.email = "";
      this.feedback.text = "";
      this.$swal({
        icon: "info",
        title: "Danke für dein Feedback",
        text: "Wir werden deine Nachricht lesen und die schnellstmöglich Antworten.",
      });
    },
  },
  computed: {
    loggedin: () => localStorage.getItem("dhbwiki_jwt"),
  },
  components: {
    Login,
    Register,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<template>
  <div>
    <Login ref="loginComponent"></Login>
    <Register ref="registerComponent"></Register>
    <header :style="'background-position-y:' + background + '%'">
      <nav>
        <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="DHBWikiLogo"
        /></router-link>
        <router-link v-if="loggedin" to="/kurse">Zur Kursübersicht</router-link>
        <a v-else href="#" @click.prevent="$refs.loginComponent.open = true"
          >Anmelden</a
        >
      </nav>
      <div>
        <h1>Deine Lernplattform für digitale Mitschriften</h1>
        <p>Erstelle, editiere und ergänze Mitschriften aus deinem Kurs.</p>
        <a href="#" @click.prevent="$refs.registerComponent.open = true"
          >Jetzt registrieren</a
        >
      </div>
    </header>
    <main>
      <div id="vorteile">
        <h1>Vorteile</h1>
        <div class="line"></div>
        <div class="vorteile">
          <div class="vorteil">
            <img src="../assets/vorteile.png" />
            <h2>Einfaches Lernen.</h2>
            <p>Alle Informationen zu einem Fach gebündelt an einem Ort.</p>
          </div>
          <div class="vorteil">
            <img src="../assets/vorteile.png" />
            <h2>Intuitiv.</h2>
            <p>
              Übersichtliches Design ermöglicht volle Konzentration auf das
              Wesentliche.
            </p>
          </div>
          <div class="vorteil">
            <img src="../assets/vorteile.png" />
            <h2>Was verpasst?</h2>
            <p>
              Kein Problem! Schau dir einfach die Mitschriften deiner
              Kommilitonen an.
            </p>
          </div>
        </div>
      </div>
      <div
        id="sitzenbleiben"
        :style="'background-position-y:' + background + '%'"
      >
        <h1>Sitzenbleiben und Lernängste sind Schnee von gestern</h1>
        <p>Lerne ab jetzt mit deinen Mitstudenten smart statt hard.</p>
        <h1>So funktioniert es</h1>
        <p>
          Mitstudenten werden zu einem Kurs hinzugefügt und jeder lädt seine
          Mitschriften mit wenigen klicks nach den Vorlesungen hoch. Jeder, der
          sich aktiv daran beteiligt hat dadurch Zugriff auf alle Mitschriften,
          um den Lernerfolg maximieren zu können.
        </p>
      </div>
      <div id="feedback">
        <h1>Feedback</h1>
        <p>Deine Meinung ist uns wichig. Schicke uns jetzt dein Feedback!</p>
        <form @submit.prevent="">
          <input
            name="email"
            placeholder="Max@Mustermann.de"
            type="text"
            v-model="feedback.email"
          />
          <textarea
            cols="5"
            name="feedback"
            rows="10"
            v-model="feedback.text"
          ></textarea>
          <a @click.prevent="trigger_feedback()">Abschicken</a>
        </form>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  height: 56.25vw;
  background: url("../assets/HeaderBG.png") no-repeat;
  background-size: 150%;
  background-position-x: center;

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
    padding-bottom: 5vw;

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

#vorteile {
  padding: 4.17vw 7.29vw;

  h1 {
    text-align: center;
    font: normal normal bold 1.67vw/2.19vw Noto Sans;
    margin-bottom: 0.78vw;
  }

  .line {
    margin: 0 auto;
    width: 4.17vw;
    height: 0.1vw;
    background: #303445;
    margin-bottom: 2.6vw;
  }

  .vorteile {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    grid-template-columns: calc(100% / 3);

    .vorteil {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        margin-bottom: 1.56vw;
      }

      h2 {
        text-align: center;
        font: normal normal bold 1.25vw/1.77vw Noto Sans;
        margin-bottom: 1.04vw;
      }

      p {
        width: 70%;
        text-align: center;
        font: normal normal medium 0.83vw/1.35vw Noto Sans;
        color: #9da1b2;
      }
    }
  }
}

#sitzenbleiben {
  background: url("../assets/Sitzenbleiben.png");
  background-size: cover;
  padding: 7.81vw;

  h1 {
    text-align: center;
    font: normal normal bold 1.67vw/2.19vw Noto Sans;
    margin-bottom: 1.5625vw;
  }

  p {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    font: normal normal 500 0.83vw/1.15vw Noto Sans;
    margin-bottom: 1.042vw;
  }
}

#feedback {
  padding: 3.91vw 30.44vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    font: normal normal bold 1.67vw/2.19vw Noto Sans;
    margin-bottom: 0.78vw;
  }

  p {
    text-align: center;
    font: normal normal 600 0.83vw/1.15vw Noto Sans;
    margin-bottom: 1.82vw;
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 1.82vw;
  }
}
</style>
