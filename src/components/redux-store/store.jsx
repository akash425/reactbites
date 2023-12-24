import { createSlice, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "react",
  storage,
};

const signUpFormData = {
  signupdata: [],
};

const loginFormData = {
  isloggedIn: false,
  data: {},
};

const cartItems = {
  cart: [],
  totalAmount: 0,
};

const LoginSlice = createSlice({
  name: "login",
  initialState: loginFormData,
  reducers: {
    //function to write which we'll be using
    loginButtonHandlerReducers(state, action) {
      state.isloggedIn = action.payload.status;
      state.data = action.payload.userdata;
    },
  },
});

const SignUpSlice = createSlice({
  name: "signUp",
  initialState: signUpFormData,
  reducers: {
    signupButtonHandlerReducer(state, action) {
      const newSignUp = {
        username: action.payload.username,
        name: action.payload.name,
        password: action.payload.password,
        email: action.payload.email,
      };

      state.signupdata = [...state.signupdata, newSignUp];
    },
  },
});

const cartSlice = createSlice({
  name: "cart Items",
  initialState: cartItems,
  reducers: {
    cartItemsAdded(state, action) {
      const indexOFItem = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItem;

      if (indexOFItem !== -1) {
        //item already in cart
        const temp = state.cart[indexOFItem];
        newItem = {
          ...temp,
          amount: temp.amount + action.payload.amount,
        };
        const updatedItems = [...state.cart];
        updatedItems[indexOFItem] = newItem;
        const newTotalAmount =
          state.totalAmount + action.payload.price * action.payload.amount;
        console.log("updated item made:", updatedItems);
        console.log("updated Amount:", newTotalAmount);
        return {
          cart: updatedItems,
          totalAmount: newTotalAmount,
        };
      } else {
        //new item to add in cart
        const updatedItems = state.cart.concat(action.payload);
        const newTotalAmount =
          state.totalAmount + action.payload.price * action.payload.amount;
        console.log("updated item made:", updatedItems);
        console.log("updated Amount:", newTotalAmount);
        return {
          cart: updatedItems,
          totalAmount: newTotalAmount,
        };
      }
    },
  },
});

const persistedReducerLoginSlice = persistReducer(
  persistConfig,
  LoginSlice.reducer
);
const persistedReducerSignUpSlice = persistReducer(
  persistConfig,
  SignUpSlice.reducer
);
const persistedReducerCartItemSlice = persistReducer(
  persistConfig,
  cartSlice.reducer
);

const store = configureStore({
  reducer: {
    loginStore: persistedReducerLoginSlice,
    signupStore: persistedReducerSignUpSlice,
    cartStore: persistedReducerCartItemSlice,
  },
});

const persistor = persistStore(store);

export const loginReducers = LoginSlice.actions;
export const signUpReducers = SignUpSlice.actions;
export const cartItemReducers = cartSlice.actions;

export default store;
export { persistor };
