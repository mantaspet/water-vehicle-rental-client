<template>
  <div>
    <section class="header">
      <svg
        class="shrine-logo"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="48px"
        height="48px"
        viewBox="0 0 24 24"
        enable-background="new 0 0 24 24"
        xml:space="preserve"
        fill="#000000"
      >
        <g id="XMLID_2_">
          <g id="XMLID_4_">
            <path
              id="XMLID_5_"
              d="M17,2H7L2,6.62L12,22L22,6.62L17,2z M16.5,3.58l3.16,2.92H16.5V3.58z M7.59,3.5H15v3H4.34L7.59,3.5z     M11.25,18.1L7.94,13h3.31V18.1z M11.25,11.5H6.96L4.69,8h6.56V11.5z M16.5,12.32 M12.75,18.09V8h6.56L12.75,18.09z"
            ></path>
          </g>
          <rect id="XMLID_1_" fill="none" width="24" height="24"></rect>
        </g>
      </svg>
      <h1>PAVADINIMAS</h1>
    </section>

    <form @submit.prevent="login">
      <div class="mdc-text-field mdc-text-field--box email">
        <input
          v-model="email"
          type="text"
          class="mdc-text-field__input"
          id="email-input"
          name="email"
          required
          email
        >
        <label class="mdc-floating-label" for="email-input">El. paštas</label>
        <div class="mdc-line-ripple"></div>
      </div>
      <div class="mdc-text-field mdc-text-field--box password">
        <input
          v-model="password"
          type="password"
          class="mdc-text-field__input"
          id="password-input"
          name="password"
          required
          minlength="8"
        >
        <label class="mdc-floating-label" for="password-input">Slaptažodis</label>
        <div class="mdc-line-ripple"></div>
      </div>
      <div class="button-container">
        <button type="submit" id="loginBtn" class="mdc-button mdc-button--raised">Prisijungti</button>
        <p style="margin-top: 48px">Naujas naudotojas?</p>
        <button
          type="button"
          id="signupBtn"
          class="mdc-button mdc-button--raised signup"
          @click="$router.push({ name: 'signup' })"
        >Registruotis</button>
      </div>
    </form>
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";
import firebase from "firebase";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: ""
    };
  },

  mounted() {
    new MDCTextField(document.querySelector(".email"));
    new MDCTextField(document.querySelector(".password"));
    new MDCRipple(document.querySelector("#loginBtn"));
    new MDCRipple(document.querySelector("#signupBtn"));
  },

  methods: {
    login() {
      this.$store.commit('showProgress');
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.$store.commit('hideProgress');
          this.$router.replace({ name: "home" });
        })
        .catch(err => {
          this.$store.commit('hideProgress');
          this.$store.commit("openSnackbar", {
            message: err.message
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.shrine-logo {
  width: 150px;
  height: 150px;
  padding-top: 80px;
  fill: currentColor;
}

.email,
.password {
  display: block;
  width: 300px;
  margin: 20px auto;
}

.button-container {
  text-align: center;
  width: 300px;
  margin: auto;
}

.button-container button {
  width: 100%;
  margin: 3px;
}
</style>
