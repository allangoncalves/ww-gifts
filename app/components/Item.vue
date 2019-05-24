<template>
  <StackLayout>
    <Image :width="180" :height="100" stretch="fill" :src="img" class="item-image"/>
    <Label :text="name" horizontalAlignment="center" class="title"/>
    <Label :text="description" textWrap="true" horizontalAlignment="center" class="description"/>
    <Label :text="price | formatPrice" textWrap="true" horizontalAlignment="center" class="price"/>
    <Button :isEnabled="buttonStatus" class="btn" text="Add to Cart" @tap="add"/>
  </StackLayout>
</template>

<script>
export default {
  props: {
    img: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    price: {
      required: true,
      type: Number
    },
    quantity: {
      required: true,
      type: Number
    },
    id: {
      required: true,
      type: Number
    }
  },
  methods: {
    add() {
      this.$store.commit("addToCart", {
        id: this.id,
        name: this.name,
        price: this.price,
        quantity: this.quantity,
        img_url: this.img
      });
      this.$store.commit("decrementFromStock", {
        id: this.id,
        name: this.name,
        price: this.price,
        quantity: this.quantity,
        img_url: this.img
      });
    }
  },
  computed: {
    buttonStatus() {
      return !(
        this.quantity === 0 || this.$store.state.user.budget - this.price < 0
      );
    }
  }
};
</script>
