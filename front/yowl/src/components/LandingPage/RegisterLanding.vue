<template>
  <div class="container">
    <div class="row">
      <div class="col-9 order-1">
        <img src="@/assets/LogoGrand.png" class="img-responsive" />
      </div>
      <div class="col-3 order-2">
        <div class="vue-template inner-block">
          <form  @submit.prevent="register">
            <h3>Register</h3>

            <div class="form-group">
              <label>First Name</label>
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="form.firstname"
              />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="form.lastname"
              />
            </div>

            <div class="form-group">
              <label>User Name</label>
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="form.username"
              />
            </div>

            <div class="form-group">
              <label>Your Birthday date</label>
              <input
                type="date"
                class="form-control form-control-lg"
                v-model="form.birthday"
              />
            </div>

            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="form.email"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                v-model="form.password"
              />
            </div>
          </form>
            <button @click="submit" class="btn btn-dark btn-lg btn-block">
              Sign Up
            </button>

            <p class="forgot-password text-right">
              Already registered
              <router-link :to="{ name: 'LandingPage' }">sign in?</router-link>
            </p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterLanding",
  components: {},
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        username: "",
        birthday: null,
        email: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["RegisterLanding",]),
    async submit() {
      console.log("submit");
        let firstname = this.form.firstname;
        let lastname = this.form.lastname;
        let username = this.form.username;
        let birthday = this.form.birthday;
        let email = this.form.email;
        let password = this.form.password;

        await this.$store.dispatch("newUser", {
          firstname,
          lastname,
          birthday,
          email,
          username,
          password
        });

        await this.$router.push({ name: 'LandingPage' })
  }
}
}
</script>

<style scoped>
.col-3 {
  margin-top: 100px;
}

.img-responsive {
  max-width: 100%;
}
</style>
