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
        <Label v-if="errorMessage.length > 0" color="red">
          <FormattedString>
            <Span :text="errorMessage"/>
          </FormattedString>
        </Label>
        <TextField v-model="name" hint="Put your Name" :maxLength="40"/>
        <TextField v-model="last" hint="Put your Last Name" :maxLength="60"/>
        <TextField v-model="email" hint="Put your E-mail" keyboardType="email"/>
        <TextField v-model="password" hint="Enter your password." secure="true"/>
        <TextField v-model="password_confirmation" hint="Confirm your password." secure="true"/>
        <Button @tap="sendForm" text="Sign Up"/>
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
      name: "",
      last: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  computed: {
    error() {
      return this.$store.state.error_creating;
    },
    serverError(){
      return this.$store.state.error_server;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.errorMessage = "Email already registered.";
      }
    },
    serverError(value){
      if(value){
        this.errorMessage = "Couldn't connect to the server."
      }
    }
  },
  methods: {
    sendForm() {
      if (this.validateForm()) {
        this.$store.dispatch("signUp", {
          name: this.name,
          last_name: this.last,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
      }
    },
    validateForm() {
      if (
        this.isEmpty(this.name) ||
        this.isEmpty(this.last) ||
        this.isEmpty(this.password) ||
        this.isEmpty(this.email) ||
        this.isEmpty(this.password_confirmation)
      ) {
        this.errorMessage = "Blank fields, please fill them all.";
        return false;
      }

      if (!this.isEmailValid()) {
        this.errorMessage = "Email not valid.";
        return false;
      }
      if (!this.minimumSize(this.password, 8)) {
        this.errorMessage = "The password is too short.";
        return false;
      }
      if (!this.passwordMatch()) {
        this.errorMessage = "The password don't match.";
        return false;
      }
      if (!this.validSize(this.name, 40) || !this.validSize(this.last, 60)) {
        this.errorMessage = "Large names.";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    validSize(value, size) {
      return value.length <= size;
    },
    isEmpty(value) {
      return value.length === 0;
    },
    isEmailValid() {
      const re = /\S+@\S+\.\S+/;
      return re.test(this.email);
    },
    passwordMatch() {
      return this.password === this.password_confirmation;
    },
    minimumSize(value, size) {
      return value.length >= size;
    }
  }
};
</script>

