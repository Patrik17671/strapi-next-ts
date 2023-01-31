import { configureStore } from '@reduxjs/toolkit'
// import cartTotalQtyReducer from "./lib/slices/cartTotalQtySlice";
import cartItemsReducer from "./slices/cartItemsSlice";

export const store = configureStore({
	reducer: {
		cartItems: cartItemsReducer
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch