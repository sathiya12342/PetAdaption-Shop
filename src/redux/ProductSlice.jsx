import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],
  searchTerm: "",
  filteredData: [],
  username: localStorage.getItem("username") || "",
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredData = state.products.filter(product =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    setUsername: (state, action) => {  
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
     clearUsername: (state) => {  
      state.username = "";
      localStorage.removeItem("username");
    },
    
  },
});

export const { setProducts, setSearchTerm, setUsername, clearUsername } = ProductSlice.actions;

export default ProductSlice.reducer;
