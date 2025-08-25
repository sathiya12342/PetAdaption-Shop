import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0

};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action){
      const newItem = action.payload;
      const itemIndex = state.products.find(item => item.id === newItem.id);
      if (itemIndex) {
        itemIndex.quantity++;
        itemIndex.totalPrice += newItem.price;
    } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        })
    }
    state.totalPrice += newItem.price;
    state.totalQuantity++;
  },
  removeFromCart(state, action) {
    const id = action.payload;
    const findIndex = state.products.find((item) => item.id === id);
    if(findIndex) {
      state.totalPrice -= findIndex.totalPrice;
      state.totalQuantity -= findIndex.quantity;
      state.products = state.products.filter((item) => item.id !== id);
    }
  },
  increaseQuantity(state, action) {
    const id = action.payload;
    const findIndex = state.products.find((item) => item.id === id);
    if(findIndex) {
      findIndex.quantity++;
      findIndex.totalPrice += findIndex.price;
      state.totalPrice += findIndex.price;
      state.totalQuantity++;

    }
  },
    decreaseQuantity(state, action) {
    const id = action.payload;
    const findIndex = state.products.find((item) => item.id === id);
    if(findIndex && findIndex.quantity > 1) {
      findIndex.quantity--;
      findIndex.totalPrice -= findIndex.price;
      state.totalPrice -= findIndex.price;
      state.totalQuantity--;

    }
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = CartSlice.actions;
export default CartSlice.reducer;
