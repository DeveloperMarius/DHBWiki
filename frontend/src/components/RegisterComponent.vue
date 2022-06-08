<template>
  <div v-show="open" id="popup">
    <div id="content">
      <button class="close" @click="open = false">
        <img alt="Close" src="../assets/close.png" />
      </button>
      <div class="left">
        <h1>Registrieren</h1>
        <p>
          Bereits einen Account?

          <a
            href="#"
            @click.prevent="
              open = false;
              $parent.$refs.loginComponent.open = true;
            "
            >Jetzt anmelden!</a
          >
        </p>
        <form id="register" @submit.prevent="register()">
          <input
            v-model="user.firstname"
            placeholder="Vorname"
            required
            type="text"
          />
          <input
            v-model="user.lastname"
            placeholder="Nachname"
            required
            type="text"
          />
          <input
            v-model="user.username"
            placeholder="Username"
            required
            type="text"
          />
          <input
            v-model="user.email"
            placeholder="E-Mail Adresse"
            required
            type="email"
          />
          <input
            v-model="user.password"
            placeholder="Passwort"
            required
            type="password"
          />
          <input
            v-model="password_repeat"
            placeholder="Passwort wiederholen"
            required
            type="password"
          />
          <button type="submit">Registrieren</button>
        </form>
      </div>
      <div class="right"><img alt="Image" src="../assets/Register.png" /></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "RegisterComponent",
  data() {
    return {
      open: false,
      user: {
        firstname: null,
        lastname: null,
        username: null,
        email: "",
        password: "",
      },
      password_repeat: "",
    };
  },
  methods: {
    ...mapActions(["insert"]),
    register() {
      if (this.user.password != this.password_repeat)
        return alert(
          "Registrieren fehlgeschlagen: Passwörter stimmen nicht überein"
        );
      axios
        .post("https://dhbwiki.th1nk.media/api/user", this.user)
        .then((res) => {
          localStorage.setItem("session", res.data.data._id);
          this.$router.push("/kurse");
        })
        .catch((err) => console.error(err));
      document.getElementById("register").reset();
      this.$router.push("/kurse");
    },
  },
};
</script>

<style lang="scss" scoped>
#popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #00000077;
  display: grid;
  place-items: center;
  z-index: 2;

  #content {
    z-index: 20;
    position: relative;
    width: 70vw;
    height: 70vh;
    background: #2e323e;
    box-shadow: 5px 5px 15px #0000001a;
    padding: 3.125vw 4.792vw;
    display: grid;
    grid-template-columns: 50% 50%;
  }

  button.close {
    position: absolute;
    top: 1.5625vw;
    right: 1.5625vw;
    width: 2.5vw;
    height: 2.5vw;
    display: grid;
    place-items: center;
    border-radius: 50%;
    outline: none;
    border: 0;
    background: #4d515b;
    cursor: pointer;
    box-shadow: 0 0 15px 15px #00000020;

    &:hover {
      box-shadow: 0 0 5px 5px #00000020;
    }

    &:focus,
    &:focus-within {
      transition: 0.05s;
      transform: scale(0.9);
    }

    img {
      width: 1.521vw;
      height: 1.521vw;
    }
  }

  .left {
    p {
      margin-top: 0.833vw;
      font: normal normal 600 0.833vw/1.146vw Noto Sans;
    }

    a {
      all: unset;
      color: #632fef;
      cursor: pointer;
      margin-left: 0.521vw;

      &:hover {
        opacity: 0.9;
      }
    }

    form {
      margin-top: 1.604vw;
      display: grid;
      row-gap: 1.042vw;
      width: 70%;
    }
  }

  .right {
    display: grid;
    place-items: center;
  }
}
</style>
