<template>
  <div style="text-align: center">
    <section class="header">
      <div class="site-logo">
        <img
          alt="site-logo"
          src="../assets/logo.png"
          height="150"
        >
      </div>
      <h1 class="mdc-typography--headline4" style="margin-bottom: 64px">VANDENS TRANSPORTO PRIEMONIŲ NUOMA</h1>
    </section>

    <form @submit.prevent="login">
      <div id="email" class="mdc-text-field mdc-text-field--box">
        <input
          v-model="email"
          type="email"
          class="mdc-text-field__input"
          id="email-input"
          required
        >
        <label class="mdc-floating-label" for="email-input">El. paštas</label>
        <div class="mdc-line-ripple"></div>
      </div>
      <div id="password" class="mdc-text-field mdc-text-field--box">
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
    new MDCTextField(document.querySelector("#email"));
    new MDCTextField(document.querySelector("#password"));
    new MDCRipple(document.querySelector("#loginBtn"));
    new MDCRipple(document.querySelector("#signupBtn"));
  },

  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.mdc-text-field {
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
}
</style>
