<template>
  <div class="container">
    <div class="row">
      <div class="col-9 order-1">
        <img src="@/assets/LogoGrand.png" class="img-responsive" />
      </div>
      <div class="col-3 order-2">
        <div class="vue-template inner-block">
            <h3>Sign In</h3>
            
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="email"
              />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control form-control-lg"
                v-model="password"
              />
            </div>

            <button type="submit" @click="login" class="btn btn-dark btn-lg btn-block">
              Sign In
            </button>

            <p class="forgot-password text-right">
              Not yet registered? Do you want to
              <router-link :to="{ name: 'register' }">register?</router-link>
            </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
 },
  computed: {
   ...mapState(["currentUser"])
 },
  methods: {
    async login() {
      let email = this.email;
      let password = this.password;

      localStorage.setItem('user', 'loged')
      
      await this.$store.dispatch('login',{ email, password})
      .then(console.log(localStorage.getItem('user')))
      .then(this.$router.push({name: 'HomePage'}));

    }
  },
};
</script>

<style scoped>
.col-3 {
  margin-top: 100px;
}
.img-responsive {
  margin-top: 1%;
  max-width: 100%;
}
.col-3 {
  margin-top: 100px;
}
.img-responsive {
  max-width: 100%;
}
</style>
