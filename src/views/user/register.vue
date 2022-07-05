<template>
  <b-container class="hfull">
    <b-row>
      <b-col cols="12" sm="7">
        <h4>image</h4>
      </b-col>
      <b-col cols="12" sm="5">
        <b-card class="mt-2 mb-2">
          <b-form @submit.prevent="UserRegister()">
            <b-form-group
              id="input-group-email"
              label="Full name:"
              label-for="name-input"
            >
              <b-form-input
                id="name-input"
                size="large"
                type="text"
                placeholder="Enter You Full name "
                v-model="form.FullNameI"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-email"
              label="Email address:"
              label-for="email-input"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email-input"
                size="large"
                type="email"
                placeholder="Enter email "
                v-model="form.MailI"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-phone"
              label="phone:"
              label-for="phone-input"
            >
              <b-form-input
                id="input-group-phone"
                size="large"
                type="tel"
                placeholder="Enter phone"
                v-model="form.PhoneI"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-password"
              label="Password:"
              label-for="password-input"
            >
              <b-form-input
                id="input-group-password"
                size="large"
                type="password"
                placeholder="Enter Password"
                v-model="form.PassI"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary" block class="mt-3"
                >Register</b-button
              >
            </b-form-group>
          </b-form>
        </b-card>
        <div class="d-flex flex-column mb-1">
          <!-- <b-button variant="primary" class="my-1"
            >Register With Facebook</b-button
          > -->
          <b-button variant="primary" class="my-1"
            >Register With Google</b-button
          >
          <b-button variant="primary" class="my-1"
            >Register With Linked-in</b-button
          >
          <b-button variant="primary" class="my-1"
            >Register With Github</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        FullNameI: "Ahmad Al-aswad",
        MailI: "blaxk@blaxk.ww",
        PhoneI: "",
        PassI: "a123456",
        Pass2I: "",
      },
    };
  },
  methods: {
    ...mapActions(["Register"]),
    UserRegister: function () {
      this.Register(this.form);
    },
  },
};
</script>

<style>
</style>