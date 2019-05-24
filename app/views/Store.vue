<template>
  <Page class="page">
    <ActionBar title="WW Store">
      <ActionItem
        @tap="seeItems"
        ios.systemIcon="9"
        ios.position="left"
        text="Shopping Cart"
        android.position="actionBar"
      />
    </ActionBar>
    <GridLayout rows="*, auto, 4*" columns="*">
      <StackLayout row="0" column="0" verticalAlignment="center">
        <Label
          class="welcome"
          :text="welcome"
          textWrap="true"
          horizontalAlignment="center"
          verticalAlignment="center"
        />
        <Label
          class="budget"
          :text="budget"
          textWrap="true"
          horizontalAlignment="center"
          verticalAlignment="center"
        />
      </StackLayout>

      <Label
        text="Choose your items:"
        textWrap="true"
        row="1"
        column="0"
        horizontalAlignment="center"
        verticalAlignment="center"
      />

      <ListView for="product in products" rowspan="3" row="2" column="0">
        <v-template>
          <item
            :img="product.img_url"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :quantity="product.quantity"
            :id="product.id"
          />
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script>
import Item from "~/components/Item.vue";
export default {
  data() {
    return {
      logo: "~/assets/images/logo.png"
    };
  },
  components: {
    Item
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    welcome() {
      return "Welcome, " + this.$store.state.user.name;
    },
    budget() {
      return "You have $" + this.$store.state.user.budget.toFixed(2) + " available";
    }
  },
  methods: {
    seeItems() {
      this.$goto("cart");
    }
  }
};
</script>

<style scoped>
.welcome {
  font-size: 30px;
}
.budget {
  font-size: 15px;
  font-style: italic;
}
</style>
