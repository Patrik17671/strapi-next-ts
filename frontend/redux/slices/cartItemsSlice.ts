import {createSlice} from '@reduxjs/toolkit'
import toast from "react-hot-toast";
import {RootState} from "@/redux/store";
// import {useSelector} from "react-redux";
// import {cartQtyValue} from "./cartTotalQtySlice";
//
// const qty = useSelector(cartQtyValue);

const initialState = {
	cartItems: typeof window !== 'undefined' ? localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems") || "")
		: [] : [],
	cartTotalQty: 0,
	cartTotalAmount: 0
}

interface ItemType {
	slug: string
}
export const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState,
	reducers: {
		addToCart(state, action){
			const itemIndex = state.cartItems.findIndex(
				(item:ItemType) => item.slug === action.payload.slug
			);
			if(itemIndex >= 0){
				state.cartItems[itemIndex].cartQty += action.payload.cartQty;
				toast.success(`${state.cartItems[itemIndex].title} počet kusov bol navýšený`)
			}else{
				const tempProduct = {...action.payload, cartQty: action.payload.cartQty};
				state.cartItems.push(tempProduct)
				toast.success(`${tempProduct.title} bol pridaný do košíka`)
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart(state, action){
			state.cartItems = state.cartItems.filter(
				(cartItem:ItemType) => cartItem.slug !== action.payload.slug
			);
			toast.success(`Produkt bol odobraný z košíka`)
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
		},
		decreaseCart(state, action){
			const itemIndex = state.cartItems.findIndex(
				(cartItem:ItemType) => cartItem.slug === action.payload.slug
			)
			if(state.cartItems[itemIndex].cartQty > 1){
				state.cartItems[itemIndex].cartQty -= 1
			}else if(state.cartItems[itemIndex].cartQty === 1){
				state.cartItems = state.cartItems.filter(
					(cartItem:ItemType) => cartItem.slug !== action.payload.slug
				);
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
		},
		getTotals(state, action){
			let {total, qty} = state.cartItems.reduce((cartTotal:{total:number,qty:number}, cartItem:{price:number,cartQty:number}) => {
				const {price, cartQty} = cartItem;
				const itemTotal = price * cartQty;
				
				cartTotal.total += itemTotal
				cartTotal.qty += cartQty
				
				return cartTotal
			},{
				total: 0,
				qty: 0
			})
			
			state.cartTotalQty = qty;
			state.cartTotalAmount = total;
		}
	},
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, decreaseCart, getTotals } = cartItemsSlice.actions

export const selectCartItems = (state:RootState) => state.cartItems

export default cartItemsSlice.reducer