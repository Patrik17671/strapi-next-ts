import getStripe from "@/lib/getStripe";
import {useSelector, useDispatch} from "react-redux";
import {addToCart, decreaseCart, getTotals, removeFromCart, selectCartItems} from "@/redux/slices/cartItemsSlice";
import React, {useEffect} from "react";
import toast from "react-hot-toast";
import {motion} from 'framer-motion';
import {CartProductType} from "@/interfaces/product";
import {cartItemsAnim, cartItemAnim, popUpAnim, fadeLeftAnim} from "@/lib/animations";

//Props interface
interface Props {
	handleShowCart: (event: React.MouseEvent<HTMLElement>) => void;

}

export default function Cart({handleShowCart}: Props) {

	const cart = useSelector(selectCartItems);
	const dispatch = useDispatch()

	//Update total cart qty
	useEffect(() => {
		dispatch(getTotals(null));
	}, [cart, dispatch])

	//Remove item from cart
	const handleRemoveFromCart = (item: CartProductType) => {
		dispatch(removeFromCart(item));
	}

	//Decrease qty of cart item
	const handleDecrease = (item: CartProductType) => {
		dispatch(decreaseCart(item))
	}

	//Increase qty of cart item
	const handleIncrease = (item: CartProductType) => {
		dispatch(addToCart(item))
	}

	//Payment
	const handleCheckout = async () => {
		localStorage.removeItem("cartItems");
		const stripe = await getStripe();
		const response = await fetch('/api/stripe', {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(cart.cartItems)
		});
		const data = await response.json();
		await stripe!.redirectToCheckout({sessionId: data.id})
	}

	return (
		<motion.div>
			<div className="overlay" onClick={handleShowCart} />
			<motion.div
				className="cart"
				initial={fadeLeftAnim.hidden}
				animate={fadeLeftAnim.show}
				exit={{opacity: 0, x: "50%"}}
				transition={{type: 'tween'}}
			>
				<i onClick={handleShowCart} className="icon-plus close" />
				{cart.cartItems.length < 1 && (
					<motion.div
						initial={popUpAnim.hidden}
						animate={popUpAnim.show}
						transition={{delay: .2}}
						className="cart__empty"
					>
						<i className="icon-cart-plus" />
						<h1>
							Máš prázdny košík <i className="icon-sad" />
						</h1>
					</motion.div>
				)}
				<motion.div
					layout
					variants={cartItemsAnim}
					initial="hidden"
					animate="show"
				>
					{cart.cartItems.length >= 1 &&
					cart.cartItems.map((item: CartProductType) => {
						return (
							<motion.div
								layout
								variants={cartItemAnim}
								className="cart__item"
								key={item.slug}
							>
								<img src={item.images?.data[0]?.attributes?.formats?.small?.url} alt={item.title}/>
								<div className="cart__content">
									<div>
										<h3>{item.title}</h3>
										<h5 className="font-medium">{item.price} €</h5>
										{/*<h5>{item.cartQty} ks</h5>*/}
									</div>
									<span className="cursor-pointer" onClick={() => {
										handleDecrease(item)
										toast.success(`${item.title} počet kusov bol znížený`)
									}}>
										<i className="icon-minus" />
									</span>
									<span className="mx-2">{item.cartQty} ks</span>
									<span className="cursor-pointer" onClick={() => handleIncrease({...item, cartQty: 1})}>
										<i className="icon-plus" />
									</span>
									<button className="btn btn--remove" onClick={() => handleRemoveFromCart(item)}>Vymazať</button>
								</div>
							</motion.div>
						)
					})}
				</motion.div>
				{cart.cartItems.length > 0 && (
					<motion.div layout className="flex justify-between items-center">
						<h3>Dokopy: {cart.cartTotalAmount} €</h3>
						<button className="btn" onClick={handleCheckout}>Objednať</button>
					</motion.div>
				)}
			</motion.div>
		</motion.div>
	)
}