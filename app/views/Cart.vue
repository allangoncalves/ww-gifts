<template>
  <Page class="page">
    <ActionBar title="Your Cart" class="btn"></ActionBar>
    <GridLayout rows="*, auto, 5*, *" columns="*">
      <Image
        :src="logo"
        stretch="fill"
        :width="200"
        :height="40"
        horizontalAlignment="center"
        row="0"
        column="0"
      />
      <Label
        text="You selected the following items:"
        textWrap="true"
        row="1"
        column="0"
        horizontalAlignment="center"
      />

      <ListView for="product in products" rowspan="3" row="2" column="0">
        <v-template>
          <cart-item
            :img="product.img_url"
            :name="product.name"
            :price="product.price"
            :quantity="product.quantity"
            :id="product.id"
          />
        </v-template>
      </ListView>

      <Button
        class="btn"
        :isEnabled="hasItems"
        text="Purchase All"
        @tap="finish"
        row="3"
        column="0"
      />
    </GridLayout>
  </Page>
</template>

<script>
import CartItem from "~/components/CartItem.vue";
export default {
  components: {
    CartItem
  },
  methods: {
    finish() {
      this.$store.dispatch("finalizePurchase");
    }
  },
  data() {
    return {
      logo: "~/assets/images/logo.png"
    };
  },
  computed: {
    products() {
      return this.$store.state.cart;
    },
    hasItems() {
      return this.$store.state.cart.length > 0;
    }
  }
};
</script>

