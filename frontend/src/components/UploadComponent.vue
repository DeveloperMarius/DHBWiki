<template>
  <div v-show="open" id="popup">
    <div id="content">
      <button class="close" @click="open = false">
        <img alt="Close" src="../assets/close.png" />
      </button>
      <div class="left">
        <h1>Datei hochladen</h1>
        <form id="upload" @submit.prevent="uploadFile()">
          <select v-model="upload.course" name="course">
            <option disabled value="">Bitte auswählen</option>
            <option v-for="(kurs, i) of courses" :key="i" :value="kurs._id">
              {{ kurs.name }}
            </option>
          </select>
          <input
            v-model="upload.topic"
            name="topic"
            placeholder="Thema"
            type="text"
          />
          <input
            v-model="upload.title"
            name="title"
            placeholder="Titel"
            type="text"
          />
          <input v-model="upload.user" name="user" type="hidden" />
          <input
            v-model="upload.description"
            name="description"
            type="hidden"
          />
          <input name="file" type="file" @change="setFile" />
          <button type="submit">Hochladen</button>
        </form>
      </div>
      <div class="right"><img alt="Image" src="../assets/Register.png" /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UploadComponent",
  data() {
    return {
      open: false,
      courses: "",
      upload: {
        course: "",
        topic: "",
        title: "",
        description: "",
        user: localStorage.getItem("userid"),
        file: "",
      },
    };
  },
  methods: {
    setFile(event) {
      if (event.target.files.length) {
        this.upload.file = event.target.files[0];
      } else {
        this.upload.file = false;
      }
    },
    uploadFile() {
      let form = document.getElementById("upload");
      let formData = new FormData(form);
      formData.append("file", this.file);
      axios.post("https://dhbwiki.th1nk.media/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      form.reset();
      this.open = false;
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
