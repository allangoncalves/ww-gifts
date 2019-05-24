import App from "~/views/App";
import SignUp from "~/views/SignUp";
import SignInOrUp from "~/views/SignInOrUp";
import Store from "~/views/Store";
import Login from "~/views/Login";
import Cart from "~/views/Cart";
import Thanks from "~/views/Thanks";

const router = {
  splash: App,
  signUp: SignUp,
  signInOrUp: SignInOrUp,
  store: Store,
  login: Login,
  cart: Cart,
  thanks: Thanks
};

export default router;
