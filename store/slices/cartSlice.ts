import { ICartProduct, ICartState } from "@/types/cart/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialCart = (): ICartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("guest_cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return { items: [], totalQuantity: 0, totalPrice: 0 };
};

const initialState: ICartState = getInitialCart();


// Yardımcı Fonksiyon: Sayıyı kurumsal e-ticaret standartlarında virgülden sonra 2 basamağa yuvarlar
const formatPrice = (price: number): number => {
  return Number(price.toFixed(2));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (!existingItem) {
        state.items.push({ product, quantity: 1 });
      } else {
        existingItem.quantity++;
      }

      state.totalQuantity++;

      state.totalPrice = formatPrice(state.totalPrice + product.price);

      if (typeof window !== "undefined")
        localStorage.setItem("guest_cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId,
      );

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        // Yuvarlama koruması
        state.totalPrice = formatPrice(
          state.totalPrice + existingItem.product.price,
        );

        if (typeof window !== "undefined")
          localStorage.setItem("guest_cart", JSON.stringify(state));
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId,
      );

      if (existingItem) {
        state.totalQuantity--;
        // Yuvarlama koruması
        state.totalPrice = formatPrice(
          state.totalPrice - existingItem.product.price,
        );

        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId,
          );
        } else {
          existingItem.quantity--;
        }

        if (typeof window !== "undefined")
          localStorage.setItem("guest_cart", JSON.stringify(state));
      }
    },

    deleteItemFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId,
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        // Yuvarlama koruması
        state.totalPrice = formatPrice(
          state.totalPrice - existingItem.product.price * existingItem.quantity,
        );
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );

        if (typeof window !== "undefined")
          localStorage.setItem("guest_cart", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      if (typeof window !== "undefined") localStorage.removeItem("guest_cart");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
