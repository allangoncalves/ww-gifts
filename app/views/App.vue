<template>
  <Page :actionBarHidden="true" class="page">
    <GridLayout rows="*" columns="*">
      <Image
        src="~/assets/images/first_page_logo.png"
        :width="130"
        :height="300"
        horizontalAlignment="center"
        verticalAlignment="center"
      />
    </GridLayout>
  </Page>
</template>

<script>
export default {
  mounted() {
    this.fetchProducts();

    setTimeout(
      () =>
        this.$goto("signInOrUp", {
          clearHistory: true,
          transition: {
            name: "fade",
            duration: 380,
            curve: "easeIn"
          }
        }),
      3000
    );
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch("fetchProducts");
    }
  }
};
</script>

<style>
ActionBar {
  background-color: #398ece;
  color: #ffffff;
}
.title {
  font-weight: bold;
  text-transform: uppercase;
}
.description {
  font-style: italic;
  text-align: center;
}
.price {
  color: #3390d7;
}
.btn {
  background-color: #3390d7;
  color: #ffffff;
}
.page {
  background-color: #152732;
  color: white;
}
</style>


