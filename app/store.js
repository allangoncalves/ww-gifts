import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const API = axios.create({
  baseURL: "http://wwgifts.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export default new Vuex.Store({
  state: {
    user: {},
    products: [],
    cart: [],
    error_creating: false,
    error_logging: false,
    error_server: false
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, payload) {
      let index = state.cart.map(product => product.id).indexOf(payload.id);
      if (index >= 0) {
        state.cart[index].quantity++;
      } else {
        payload.quantity = 1;
        state.cart.push(payload);
      }
      state.user.budget = state.user.budget - payload.price;
    },
    removeFromCart(state, payload) {
      let index = state.cart.map(product => product.id).indexOf(payload.id);
      state.user.budget += payload.price * payload.quantity;
      state.cart.splice(index, 1);
    },
    decrementFromStock(state, payload) {
      let index = state.products.map(product => product.id).indexOf(payload.id);
      state.products[index].quantity--;
    },
    updateUserInfo(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      API.get("products")
        .then(res => {
          commit("setProducts", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    signUp({ dispatch, state }, payload) {
      API.post("register", payload)
        .then(res => {
          dispatch("login", {
            email: payload.email,
            password: payload.password
          });
          state.error_creating = false;
          state.error_server = false;
        })
        .catch(err => {
          if (err.response) {
            state.error_creating = true;
          }else {
            state.error_server = true;
          }
          console.log(err);
        });
    },
    login({ commit, state }, payload) {
      API.post("login", payload)
        .then(res => {
          state.error_logging = false;
          state.error_server = false;
          let user_info = res.data.user_info;
          commit("updateUserInfo", {
            token: res.data.auth_token,
            id: user_info.id,
            name: user_info.name,
            last_name: user_info.last_name,
            email: user_info.email,
            budget: user_info.budget
          });
          this._vm.$goto("store", { clearHistory: true });
        })
        .catch(err => {
          if (err.response) {
            state.error_logging = true;
          }
          else{
            state.error_server = true;
          }
          console.log(err);
        });
    },
    finalizePurchase({ state }) {
      API.post(
        "update",
        {
          id: state.user.id,
          name: state.user.name,
          last_name: state.user.last_name,
          budget: state.user.budget
        },
        { headers: { Authorization: state.user.token } }
      ).then(() => {
        state.cart = [];
        this._vm.$goto("thanks");
      });
    }
  }
});
