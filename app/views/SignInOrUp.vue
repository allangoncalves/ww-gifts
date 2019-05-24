<template>
  <Page class="page">
    <GridLayout rows="2*, 3*" columns="auto" horizontalAlignment="center">
      <Image
        :src="logo"
        stretch="fill"
        :width="250"
        :height="70"
        horizontalAlignment="center"
        row="0"
        column="0"
      />

      <StackLayout row="1" column="0" verticalAlignment="center">
        <Button class="btn" @tap="login" text="Login"/>
        <Button class="btn" @tap="signUp" text="Create Account"/>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      logo: "~/assets/images/logo.png"
    };
  },
  methods: {
    login() {
      this.$goto("login");
    },
    signUp() {
      this.$goto("signUp");
    }
  }
};
</script>

