<template>
  <div style="text-align: center">
    <section class="header">
      <div class="site-logo">
        <img alt="site-logo" src="../assets/logo.png" height="150">
      </div>
      <h1 class="mdc-typography--headline4" style="margin-bottom: 32px">VANDENS TRANSPORTO PRIEMONIŲ NUOMA</h1>
    </section>

    <form @submit.prevent="signUp">
      <div id="form-wrapper">
        <div id="first-name" class="mdc-text-field mdc-text-field--box">
          <input v-model="firstName" type="text" class="mdc-text-field__input" required>
          <label class="mdc-floating-label" for="email-input">Vardas</label>
          <div class="mdc-line-ripple"></div>
        </div>

        <div id="last-name" class="mdc-text-field mdc-text-field--box">
          <input v-model="lastName" type="text" class="mdc-text-field__input" required>
          <label class="mdc-floating-label" for="email-input">Pavardė</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <br>
        <div id="email" class="mdc-text-field mdc-text-field--box">
          <input v-model="email" type="email" class="mdc-text-field__input" required email>
          <label class="mdc-floating-label" for="email-input">El. paštas</label>
          <div class="mdc-line-ripple"></div>
        </div>

        <div id="dob" class="mdc-text-field mdc-text-field--box">
          <input v-model="dob" type="date" class="mdc-text-field__input" required>
          <label class="mdc-floating-label" for="email-input">Gimimo data</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <br>
        <div id="account-no" class="mdc-text-field mdc-text-field--box" style="width: 612px">
          <input v-model="accountNo" type="text" class="mdc-text-field__input" required>
          <label class="mdc-floating-label" for="email-input">Sąskaitos nr.</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <br>
        <div id="password" class="mdc-text-field mdc-text-field--box">
          <input
            v-model="password"
            type="password"
            class="mdc-text-field__input"
            required
            minlength="8"
          >
          <label class="mdc-floating-label" for="password-input">Slaptažodis</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <div id="repeat-password" class="mdc-text-field mdc-text-field--box">
          <input
            v-model="repeatPassword"
            type="password"
            class="mdc-text-field__input"
            required
            minlength="8"
          >
          <label class="mdc-floating-label" for="password-input">Pakartokite slapažodį</label>
          <div class="mdc-line-ripple"></div>
        </div>
      </div>
      <div class="button-container">
        <button
          type="submit"
          id="login-btn"
          class="mdc-button mdc-button--raised signup"
        >Registruotis</button>
        <p style="margin-top: 48px">Jau esate užsiregistravę?</p>
        <button
          type="button"
          id="signup-btn"
          class="mdc-button mdc-button--raised login"
          @click="$router.push({ name: 'login' })"
        >Prisijungti</button>
      </div>
    </form>
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";
import firebase from "firebase";

export default {
  name: "SignUp",

  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      dob: "",
      accountNo: "",
      password: "",
      repeatPassword: ""
    };
  },

  mounted() {
    new MDCTextField(document.querySelector("#email"));
    new MDCTextField(document.querySelector("#first-name"));
    new MDCTextField(document.querySelector("#last-name"));
    new MDCTextField(document.querySelector("#dob"));
    new MDCTextField(document.querySelector("#account-no"));
    new MDCTextField(document.querySelector("#password"));
    new MDCTextField(document.querySelector("#repeat-password"));
    new MDCRipple(document.querySelector("#login-btn"));
    new MDCRipple(document.querySelector("#signup-btn"));
  },

  methods: {
    signUp() {
      if (this.password === this.repeatPassword) {
        this.$store.dispatch('signUp', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          accountNo: this.accountNo,
          password: this.password,
          role: "client",
          isActive: true,
        });
      } else {
        this.$store.commit("openSnackbar", {
          message: "Slaptažodžiai nesutampa"
        });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

#form-wrapper {
  width: 800px;
  margin: 0 auto;
  text-align: center;
}

.mdc-text-field {
  display: inline-block;
  width: 300px;
  margin: 20px 6px;
}

.button-container {
  text-align: center;
  width: 612px;
  margin: auto;
}

.button-container button {
  width: 100%;
}
</style>
