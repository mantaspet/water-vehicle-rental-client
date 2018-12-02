<template>
  <v-layout wrap align-center class="text-xs-center">
    <v-flex xs12>
      <img
        alt="site-logo"
        src="../assets/logo.png"
        height="150"
      >
    </v-flex>
    <v-flex xs12>
      <h1 style="margin-bottom: 64px">VANDENS TRANSPORTO PRIEMONIŲ NUOMA</h1>
    </v-flex>

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
  </v-layout>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: ""
    };
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

.button-container {
  text-align: center;
  width: 300px;
  margin: auto;
}

.button-container button {
  width: 100%;
}
</style>
