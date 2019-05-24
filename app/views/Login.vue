<template>
  <Page>
    <GridLayout rows="2*, 5*" columns="auto" horizontalAlignment="center">
      <Image
        :src="logo"
        stretch="fill"
        :width="200"
        :height="40"
        horizontalAlignment="center"
        row="0"
        column="0"
      />

      <StackLayout row="1" column="0" verticalAlignment="top">
        <Label :v-if="errorMessage.length > 0" color="red" :text="errorMessage" textWrap="true"/>
        <TextField v-model="email" hint="Put your E-mail" keyboardType="email"/>
        <TextField v-model="password" hint="Enter your password." secure="true"/>
        <Button class="btn" @tap="login" text="Login"/>
      </StackLayout>
    </GridLayout>
  </Page>
</template>


<script>
export default {
  data() {
    return {
      logo: "~/assets/images/logo.png",
      errorMessage: "",
      email: "",
      password: ""
    };
  },
  computed: {
    error() {
      return this.$store.state.error_logging;
    },
    serverError(){
      return this.$store.state.error_server;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.errorMessage = "Invalid e-mail or password.";
      }
    },
    serverError(value){
      if(value){
        this.errorMessage = "Couldn't connect to the server."
      }
    }
  },
  methods: {
    login() {
      this.errorMessage = "";
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

