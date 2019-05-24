<template>
  <StackLayout>
    <Image :width="120" :height="60" stretch="fill" :src="img" class="item-image"/>
    <Label :text="quantityText" horizontalAlignment="center" row="0" column="2" class="price"/>
    <Label :text="name" horizontalAlignment="center" class="title"/>
    <Label :text="price | formatPrice" textWrap="true" horizontalAlignment="center" class="price"/>
    <Button class="btn" text="Remove" @tap="remove"/>
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
  computed: {
    quantityText() {
      return "Picked " + this.quantity + " items.";
    }
  },
  methods: {
    remove() {
      this.$store.commit("removeFromCart", {
        id: this.id,
        quantity: this.quantity,
        price: this.price
      });
    }
  }
};
</script>


